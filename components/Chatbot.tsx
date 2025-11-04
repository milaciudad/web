import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ChatbotProps {
    closeChat: () => void;
}

type Message = {
    text: string;
    sender: 'user' | 'bot';
};

const Chatbot: React.FC<ChatbotProps> = ({ closeChat }) => {
    const [messages, setMessages] = useState<Message[]>(() => {
        try {
            const savedMessages = sessionStorage.getItem('chatHistory');
            return savedMessages 
                ? JSON.parse(savedMessages) 
                : [{ text: 'Hola! Soy el asistente virtual de Mila Ciudad. ¿En qué puedo ayudarte hoy sobre salud y bienestar?', sender: 'bot' }];
        } catch (error) {
            console.error('Failed to parse chat history from sessionStorage', error);
            return [{ text: 'Hola! Soy el asistente virtual de Mila Ciudad. ¿En qué puedo ayudarte hoy sobre salud y bienestar?', sender: 'bot' }];
        }
    });

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const conversationStarters = [
        "¿Qué es la perimenopausia?",
        "Consejos para dormir mejor",
        "¿Cómo puedo gestionar el estrés?",
        "¿Ofreces coaching personalizado?"
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]); // Add isLoading to dependencies

    useEffect(() => {
        try {
            sessionStorage.setItem('chatHistory', JSON.stringify(messages));
        } catch (error) {
            console.error('Failed to save chat history to sessionStorage', error);
        }
    }, [messages]);

    const sendMessage = async (text: string) => {
        const userMessage: Message = { text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: text,
                config: {
                    systemInstruction: `Eres un asistente virtual para el sitio web de Mila Ciudad, coach de salud y bienestar.
                    Tu propósito es ayudar a los usuarios con preguntas sobre salud activa, menopausia y bienestar general, reflejando la filosofía de Mila: "No te doblegues".
                    - Sé empática, positiva y alentadora.
                    - Ofrece información general y consejos de estilo de vida.
                    - NO proporciones consejo médico específico. Si te piden consejo médico, recomienda SIEMPRE consultar a un profesional de la salud.
                    - Cuando sea apropiado, menciona que Mila Ciudad te acompaña en esta transición con su método "MILACIUDAD+". Habla siempre en tercera persona sobre Mila (ella te acompaña, no "te acompañamos"). Puedes sugerir que exploren la sección "Mi Método" para más detalles.
                    - Mantén las respuestas relativamente concisas y fáciles de entender.
                    - Puedes usar formato simple como listas con asteriscos (*) o negritas (**texto**) para mejorar la legibilidad.`
                }
            });
            const botMessage: Message = { text: response.text, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage: Message = { text: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.', sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading) return;
        setInputValue('');
        sendMessage(trimmedInput);
    };

    const handleStarterClick = (question: string) => {
        if (isLoading) return;
        sendMessage(question);
    };

    const renderMessageText = (text: string) => {
        // 1. Sanitize input to prevent XSS by escaping HTML special characters.
        const escapeHtml = (unsafe: string) => {
            return unsafe
                 .replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
        };

        // 2. Process simple inline markdown first on the whole block
        let processedText = escapeHtml(text)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/(\b(https?:\/\/[^\s<>"']+)|(www\.[^\s<>"']+))/g, (url) => {
                const href = url.startsWith('www.') ? `http://${url}` : url;
                return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-cyan-600 underline hover:text-cyan-800">${url}</a>`;
            });

        // 3. Process block-level elements like lists and paragraphs line by line
        const lines = processedText.split('\n');
        let html = '';
        let listDepth = 0;

        for (const line of lines) {
            const listItemMatch = line.match(/^(\s*)[\*\-] (.+)/);

            if (listItemMatch) {
                const indent = listItemMatch[1].length;
                const newDepth = Math.floor(indent / 2) + 1; // 2 spaces per indentation level
                const content = listItemMatch[2];

                while (newDepth < listDepth) {
                    html += '</ul>';
                    listDepth--;
                }
                while (newDepth > listDepth) {
                    html += '<ul class="list-disc list-inside my-1 pl-4">';
                    listDepth++;
                }

                html += `<li>${content}</li>`;
            } else {
                // Not a list item, close all open lists
                while (listDepth > 0) {
                    html += '</ul>';
                    listDepth--;
                }
                // Add non-empty lines as paragraphs
                if (line.trim()) {
                    html += `<p class="my-1">${line}</p>`;
                }
            }
        }

        // Close any remaining open lists at the end
        while (listDepth > 0) {
            html += '</ul>';
            listDepth--;
        }

        return { __html: html };
    };

    return (
        <div className="fixed bottom-8 right-8 w-[calc(100%-4rem)] max-w-md h-[70vh] max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col font-inter z-50">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-cyan-600 text-white rounded-t-xl">
                <h3 className="font-bold text-lg">Asistente Virtual</h3>
                <button onClick={closeChat} className="text-white hover:text-cyan-200" aria-label="Cerrar chat">
                    <i className="fas fa-times text-xl"></i>
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.sender === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={renderMessageText(msg.text)} />
                        </div>
                    </div>
                ))}

                {/* Conversation Starters */}
                {messages.length === 1 && !isLoading && (
                    <div className="my-4 animate-fade-in">
                        <p className="text-sm text-gray-500 text-center mb-2">O prueba con una de estas preguntas:</p>
                        <div className="grid grid-cols-2 gap-2">
                            {conversationStarters.map((q, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => handleStarterClick(q)} 
                                    className="p-2 border border-gray-300 rounded-lg text-sm text-center text-cyan-700 bg-white hover:bg-cyan-50 transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="flex justify-start mb-3">
                        <div className="rounded-lg px-4 py-3 bg-gray-200 text-gray-800">
                            <div className="flex items-center space-x-2">
                                <span className="sr-only">Escribiendo...</span>
                                <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Escribe tu pregunta..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white text-gray-900"
                        aria-label="Escribe tu pregunta"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 disabled:bg-gray-400">
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chatbot;