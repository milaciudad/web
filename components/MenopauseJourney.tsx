import React, { useState } from 'react';
import { AnimateOnScroll } from './UIComponents';
import type { NavigationTarget } from '../types';

interface MenopauseJourneyProps {
    navigate: (target: NavigationTarget) => void;
}

const TheFlightForwardStorySection: React.FC = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-extrabold font-montserrat gradient-text">
                    <span className="block text-3xl md:text-4xl">EL VUELO HACIA ADELANTE</span>
                    <span className="block text-4xl md:text-5xl mt-2">MI VIAJE CON LA MENOPAUSIA</span>
                </h2>
            </div>

            <div className="my-10 max-w-3xl mx-auto">
                <div className="py-8 px-6 bg-cyan-50/50 border-l-4 border-cyan-500 rounded-r-lg shadow-sm">
                    <p className="text-xl md:text-2xl font-lora italic text-cyan-800 text-center leading-relaxed">
                        "Desde que el mundo es mundo, las hormonas femeninas evolucionan hasta alcanzar su declive. Las mujeres tenemos el <strong>deber y el derecho</strong> de aprender, asumir y transitar esta etapa natural de la vida de la mejor manera posible.
                        <br/><br/>
                        Lo verdaderamente curioso es que, en pleno siglo XXI, aún se pretenda vivirla en silencio, como algo que hay que aguantar y ocultar."
                    </p>
                    <p className="text-right text-base font-semibold text-cyan-800 mt-4 pr-4">- Mila Ciudad</p>
                </div>
            </div>


            <div className="mt-12 max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-6 text-justify">
                <h3 className="text-3xl font-bold font-lora text-cyan-700 text-center">Mi Experiencia Real: El Terremoto Interior</h3>
                <p>Cumplir 50 fue un hito. No solo por lo que representa en el calendario, sino porque marcó el inicio de una etapa que <strong>me enfrentó a mí misma</strong> de una forma que nunca imaginé.</p>
                <p>Siempre he sido una persona que se ha cuidado: he mantenido una alimentación equilibrada, he hecho ejercicio con regularidad, alejé de mi vida el tabaco y el alcohol, y dejé de trasnochar hace muchos años. Ya en la perimenopausia empecé a notar los primeros síntomas: cambios en el sueño, ansiedad leve, cierta fatiga. En ese momento logré compensarlos con magnesio y otros pequeños ajustes, y pensé que sería algo puntual. Pero cuando <strong>se retiró definitivamente mi ciclo menstrual, todo cambió.</strong></p>
                <p>Los síntomas físicos se intensificaron: <strong>sofocos, sudoración nocturna, dolores musculares y articulares, insomnio, jaqueca, libido desaparecida, fatiga constante,</strong> sueño interrumpido que me dejaba agotada durante el día, picores en los oídos, intolerancias alimentarias, <strong>niebla mental, miedos infundados, irritabilidad,</strong> mareos frecuentes y palpitaciones que me asustaban sin razón aparente. Perdí la capacidad de concentración: no podía estar ni diez minutos frente al ordenador ni realizar tareas que exigieran atención.</p>
                
                <div className="my-10">
                    <div className="py-8 px-6 bg-cyan-50/50 border-l-4 border-cyan-500 rounded-r-lg shadow-sm">
                        <p className="text-xl md:text-2xl font-lora italic text-cyan-800 text-center leading-relaxed">
                            "Pero lo más difícil fue <strong>lo que no se ve.</strong> La <strong>crisis existencial</strong> que se instaló dentro de mí, silenciosa pero devastadora. Empecé a cuestionarlo todo: quién era, qué sentido tenía mi vida, qué quedaba de mí. El <strong>sobrepensamiento se volvió constante,</strong> agotador. Mi mente no paraba, analizaba cada gesto, cada palabra, cada decisión, como si todo tuviera un peso desmesurado."
                        </p>
                    </div>
                </div>

                <p>Y mientras tanto, <strong>me sentía invisible.</strong> Como si mi entorno no me viera, como si lo que me pasaba no existiera para los demás. Nadie preguntaba, nadie entendía. Me esforzaba por disimular, por ocultar lo que estaba viviendo, por miedo al juicio, al “qué dirán”. <strong>La incomprensión dolía más que los síntomas.</strong></p>
                <p>Las responsabilidades seguían ahí: en casa, en el trabajo, las guardias, una mudanza... Yo cumplía, pero <strong>por dentro me desmoronaba.</strong> Era un <strong>vivir sin vivir en mí,</strong> atrapada en un cuerpo que no reconocía y en una mente que no me daba tregua.</p>
                
                <h3 className="text-2xl font-bold font-lora pt-4 text-cyan-700 text-center">No Soy un Caso Aislado: La Soledad Compartida</h3>
                <p>Lo que me pasó lo veo cada día en consulta. Mujeres con mapas de síntomas distintos, pero todas comparten algo: una <strong>soledad profunda</strong> causada por la falta de información y comprensión. Una <strong>batalla silenciosa</strong> librada en casa, en el trabajo y contra nosotras mismas.</p>

                <h3 className="text-2xl font-bold font-lora pt-4 text-cyan-700 text-center">El Cambio de Mirada: La Gran Revelación</h3>
                <p>En medio de ese caos personal y profesional entendí algo central: <strong>la menopausia no es una enfermedad que haya que curar.</strong> Es una de las <strong>transiciones más importantes</strong> en la vida de una mujer, y la estamos atravesando a oscuras y en silencio. Esa comprensión lo cambió todo. Si bien es verdad que tenemos que empezar por hablar con nuestro médico de cabecera para descartar carencias, sobre todo vitaminas D y B12, hierro y calcio, y saber cómo están nuestras hormonas tiroideas, colesterol, cifras de glucosa y tensión arterial.</p>
                
                <div className="my-10">
                    <div className="py-8 px-6 bg-cyan-50/50 border-l-4 border-cyan-500 rounded-r-lg shadow-sm">
                        <p className="text-xl md:text-2xl font-lora italic text-cyan-800 text-center leading-relaxed">
                            "La menopausia no es una enfermedad que haya que curar. Es una de las <strong>transiciones más importantes</strong> en la vida de una mujer, y la estamos atravesando <strong>a oscuras y en silencio.</strong>"
                        </p>
                    </div>
                </div>

                <h3 className="text-2xl font-bold font-lora pt-4 text-cyan-700 text-center">Mi Decisión Profesional: Construir un Puente</h3>
                <p>Decidí <strong>tomar las riendas de mi vida</strong> y construir un puente entre mi profesión y mi nueva realidad. Estudié, leí, escuché. Lo hice primero para ayudarme a mí misma, para entender lo que me estaba ocurriendo y recomponerme desde dentro. En ese proceso, descubrí que <strong>no estaba sola,</strong> que muchas mujeres atravesamos esta etapa en silencio, sin recursos ni acompañamiento.</p>
                <p>Por eso me formé como <strong>coach especializada en menopausia,</strong> para tender ese puente que tantas necesitamos: un espacio donde la <strong>evidencia científica y la vivencia personal se encuentren,</strong> se escuchen y se validen. Un lugar donde podamos dejar de sentirnos invisibles y empezar a reconocernos con fuerza, claridad y dignidad.</p>
                
                <h3 className="text-2xl font-bold font-lora pt-4 text-cyan-700 text-center">Dónde Estoy Hoy: Aceptación y Propósito</h3>
                <p>Hoy sigo transitando esta etapa, pero lo hago desde otro lugar: <strong>más consciente, más encauzada.</strong> Trabajo en mis propios proyectos, exploro y pongo en valor mis talentos, liberada de la culpa y aceptando que esto es un <strong>proceso natural, no una falla.</strong></p>
                <p>Mantengo rutinas que me sostienen y, sobre todo, escucho a muchas mujeres que, como yo, <strong>reclamamos ser tenidas en cuenta.</strong> Pedimos que se reconozca nuestra valía, nuestra experiencia, y también nuestro derecho a estar mal cuando las hormonas cambian y el cuerpo se transforma.</p>
                
                <div className="my-10">
                    <div className="py-8 px-6 bg-cyan-50/50 border-l-4 border-cyan-500 rounded-r-lg shadow-sm">
                        <p className="text-xl md:text-2xl font-lora italic text-cyan-800 text-center leading-relaxed">
                            "Estamos vivas. Estaremos sin ciclos menstruales más de treinta años, y ese tiempo <strong>merece ser vivido con atención, apoyo y respeto.</strong> No queremos seguir en silencio: <strong>queremos ser vistas, comprendidas y acompañadas.</strong>"
                        </p>
                    </div>
                </div>

                <p>Escucho y acompaño desde <strong>MILACIUDAD+,</strong> un espacio donde compartir, validar experiencias y ofrecer herramientas prácticas para transitar la menopausia con dignidad y sentido.</p>

                <div className="text-center pt-8">
                    <a href="https://calendar.app.google/e66VNHbHuun6zVz38" target="_blank" rel="noopener noreferrer" className="inline-block bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 shadow-lg">
                        Quiero mi sesión gratuita
                    </a>
                </div>
            </div>
        </section>
    );
};


const MissionSection: React.FC = () => {
    return (
        <section className="py-16 md:py-24">
             <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed text-justify space-y-4">
                <div className="mt-12 pt-8 border-t">
                    <h3 className="text-3xl font-bold font-montserrat text-cyan-700 text-center">Mi Misión: Acompañarte a Florecer</h3>
                    <p className="mt-4 text-lg text-center text-gray-600">Mi propuesta se basa en darte lo que yo necesité y no encontrei:</p>
                    
                    <div className="grid md:grid-cols-3 gap-8 mt-10">
                        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500 text-center">
                            <i className="fas fa-hands-helping text-4xl text-cyan-500 mb-4"></i>
                            <h4 className="font-bold font-montserrat text-xl text-gray-700">Acompañamiento Real</h4>
                            <p className="text-sm mt-2 text-gray-600">Un plan de navegación claro y un apoyo cercano para que <strong>nunca te sientas sola</strong> en esta transición.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500 text-center">
                            <i className="fas fa-lightbulb text-4xl text-cyan-500 mb-4"></i>
                            <h4 className="font-bold font-montserrat text-xl text-gray-700">Una Nueva Perspectiva</h4>
                            <p className="text-sm mt-2 text-gray-600">Ver esta etapa no como un final, sino como el comienzo de tu versión <strong>más sabia y auténtica.</strong></p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500 text-center">
                            <i className="fas fa-rocket text-4xl text-cyan-500 mb-4"></i>
                            <h4 className="font-bold font-montserrat text-xl text-gray-700">Transformación Guiada</h4>
                            <p className="text-sm mt-2 text-gray-600">Juntas convertiremos la incertidumbre en claridad y las limitaciones en una nueva y <strong>poderosa libertad.</strong></p>
                        </div>
                    </div>

                    <div className="mt-12 bg-cyan-50/50 p-8 rounded-xl border border-cyan-100">
                        <h4 className="text-2xl font-bold font-lora text-cyan-700 text-center">Cómo te Acompaño: Sin Presiones ni Moldes</h4>
                        <p className="mt-4 text-center max-w-2xl mx-auto">Ofrezco un acompañamiento auténtico, <strong>libre de exigencias</strong> para encajar en cánones de belleza impuestos. Aquí no hay recetas para parecer como otros ni necesidad de disfrazar lo que sientes. Te acompaño desde la escucha, la información y la práctica, para que recuperes tu poder <strong>sin comparaciones.</strong></p>
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-10">
                        <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-cyan-500 flex flex-col">
                            <h4 className="text-2xl font-bold font-lora text-cyan-700">¿Qué te invito a hacer?</h4>
                            <ul className="space-y-3 mt-4 flex-grow">
                                <li className="flex items-start"><i className="fas fa-check-circle text-cyan-500 mt-1 mr-3"></i><span>Explora tus talentos y dones, <strong>atrévete a ponerlos en marcha.</strong></span></li>
                                <li className="flex items-start"><i className="fas fa-check-circle text-cyan-500 mt-1 mr-3"></i><span><strong>Reinventa tu proyecto de vida</strong> desde tus prioridades, no desde lo que se espera de ti.</span></li>
                                <li className="flex items-start"><i className="fas fa-check-circle text-cyan-500 mt-1 mr-3"></i><span>No importa en qué momento te encuentres: el momento para empezar <strong>es hoy.</strong></span></li>
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-cyan-500 flex flex-col">
                            <h4 className="text-2xl font-bold font-lora text-cyan-700">Lo que ganarás</h4>
                            <ul className="space-y-3 mt-4 flex-grow">
                                <li className="flex items-start"><i className="fas fa-check-circle text-cyan-500 mt-1 mr-3"></i><span>Más <strong>claridad</strong> sobre lo que necesitas y por qué.</span></li>
                                <li className="flex items-start"><i className="fas fa-check-circle text-cyan-500 mt-1 mr-3"></i><span>Herramientas para <strong>cuidar tu salud</strong> física y emocional.</span></li>
                                <li className="flex items-start"><i className="fas fa-check-circle text-cyan-500 mt-1 mr-3"></i><span>Un <strong>plan práctico</strong> para avanzar con seguridad y sin culpa.</span></li>
                                <li className="flex items-start"><i className="fas fa-check-circle text-cyan-500 mt-1 mr-3"></i><span>Recuperarás la <strong>libertad de decidir</strong> cómo quieres vivir esta etapa.</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </section>
    );
};


const HistorySection: React.FC = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
                <div className="inline-block relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-cyan-200"></div>
                    <h2 className="text-5xl font-bold font-montserrat text-cyan-700">Mi Historia</h2>
                </div>
                <p className="mt-6 text-lg italic text-gray-600">"Lo que es para ti, <strong>ni aunque te quites;</strong> y lo que no, <strong>ni aunque te pongas.</strong>"</p>

                <div className="my-8">
                    <img 
                        src="https://images.squidge.org/images/2025/10/19/MILA-CIUDAD-MI-HISTORIA.png" 
                        alt="Mi Historia - Mila Ciudad" 
                        className="w-full max-w-md mx-auto bg-white p-4 border rounded-lg shadow-xl" 
                    />
                </div>

                <div className="mt-8 bg-white p-8 md:p-12 rounded-xl shadow-lg border text-gray-700 leading-relaxed text-justify space-y-4">
                    <p>Nací en la histórica ciudad de Toledo y actualmente resido en Talavera de la Reina. Como enfermera, he aprendido a cuidar tanto del cuerpo como del alma, pero mi <strong>vocación creativa</strong> siempre me ha llevado a <strong>explorar diferentes mundos.</strong> Me formé en interpretación musical y decoración de interiores, y durante más de 13 años me sumergí en la magia de transformar espacios.</p>
                    
                    <h3 className="text-2xl font-bold font-lora pt-4 text-cyan-700">Reflexiones desde el Corazón</h3>
                    <p>Estoy felizmente casada con mi compañero de vida, cuya paciencia y sabiduría me han enseñado las lecciones más valiosas de la vida. Además, soy una madre orgullosa del talentoso autor del <strong>blog <em>Mi país a través de mis ojos</em> y del libro <a href="https://www.amazon.es/Ser-inteligente-delito-Pigmali%C3%B3n-narrativa/dp/8415916698/ref=sr_1_3?dib=eyJ2IjoiMSJ9.DOOa7jkU9y5PdflPO4xqyg.ryQNn9gRmOXOfxUcHnAR-6OF6W6v3KexZitFq1tTcJU&dib_tag=se&qid=1762075455&refinements=p_27%3A%C3%81lvaro+Cabo+Ciudad&s=books&sr=1-3" target="_blank" rel="noopener noreferrer" className="text-cyan-600 underline">Ser inteligente no es un delito</a> (<a href="https://www.covertalavera.com/alvaro-cabo-una-trayectoria-que-incita-a-los-mas-jovenes/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 underline">Álvaro Cabo Ciudad</a>)</strong>, el cual publicará a los 11 años. Esto nos llevó a replantearnos la vida para apoyarlo en su aventura como escritor y conferenciante alrededor del mundo.</p>
                    <p>Ahora que él ha emprendido su propio camino, he decidido alzar mi voz al mundo con este proyecto y aventurarme en la escritura de mi primera novela, que espero vea la luz muy pronto. Todos estos propósitos reflejan mi frase guía: "<strong>En una vida hay muchas vidas</strong>", un recordatorio de que cada etapa trae consigo la oportunidad de <strong>reinventarse.</strong></p>
                    <p>En este momento de mi vida, y seguramente debido a mi profesión, tengo absolutamente claro que la <strong>salud es el bien más preciado</strong> que tenemos como seres humanos. Ningún bien material puede reemplazar nuestro bienestar físico. Nadie en su sano juicio renunciaría a una pierna, un brazo o la vista a cambio de todo el oro del mundo. He vivido y visto lo suficiente para comprender que, a veces, es necesario dejar ir ciertos bienes o situaciones que ya no forman parte de nuestra vida. Casi a diario confirmo lo vulnerables que podemos llegar a ser y lo efímera que es la existencia, lo que me ha enseñado a valorar los momentos y a <strong>vivir con propósito y plenitud,</strong> porque nunca sabemos cuánto tiempo tendremos.</p>
                    <p>Soy católica practicante y, desde mi experiencia, puedo afirmar que no existe terapia psicológica más accesible y efectiva que hablar con Dios. Esa <strong>conexión espiritual</strong> ha sido mi mayor fuente de paz y fortaleza en los momentos más desafiantes de mi vida.</p>
                    <p>A medida que he ido madurando, conociéndome y aceptándome, he decidido valorar únicamente la <strong>autenticidad y las conexiones profundas,</strong> rechazando lo superficial, las reuniones masivas y las relaciones tóxicas. Aunque en algunos momentos la soledad me acompaña, prefiero mil veces eso a perder mi tiempo y energía en banalidades. Valoro profundamente el humor inteligente de las personas y admiro a hombres y mujeres históricos que vivieron con propósito y firmeza, encontrando en ellos una inspiración constante. Me gusta leer, escuchar reflexiones de gente cultivada y con criterio y me apasiona perderme por lugares donde puedo respirar aire limpio, sin estridencias ni superficialidades. Disfruto de la serenidad que ofrece la naturaleza, donde el tiempo parece detenerse y puedo <strong>conectar conmigo misma</strong> y con lo esencial de la vida.</p>
                </div>
            </div>
        </section>
    )
};

const BookSection: React.FC = () => {
    const [copySuccess, setCopySuccess] = useState('');

    const amazonReviews = [
      { author: 'Alma Velázquez', rating: 5, comment: 'Como pediatra, he compartido guardias, risas, urgencias y muchas familias atendidas junto a Mila. Y puedo decir con total tranquilidad que leer “Rescatando Padres” es casi como tenerla al lado en una consulta: <strong>clara, empática, resolutiva y siempre con una mirada serena,</strong> incluso en medio del caos. Este libro no solo ofrece primeros auxilios o consejos útiles para padres; transmite su forma única de cuidar, de explicar sin tecnicismos, de escuchar sin juicio. Mila consigue que las familias se sientan acompañadas y, sobre todo, capaces. Para mí, que conozco su humanidad y su profesionalidad, este libro es exactamente lo que esperas de alguien que se dedica con el alma a los niños y sus familias. <strong>Un regalo necesario en cualquier hogar con peques.</strong>', verified: true },
      { author: 'Ángel Villarroel', rating: 5, comment: 'Como médico de urgencias, “Rescatando Padres” ha superado mis expectativas. Es un manual integral, una herramienta emocional y un recurso práctico. Su Guía de Primeros Auxilios Pediátricos es <strong>clara, actualizada y justifica por sí sola la compra.</strong> Combina lo físico con lo psicosocial de forma magistral. Se nota que está escrito desde la experiencia clínica y el amor de madre. No solo transmite conocimientos, sino confianza y calma. A partir de ahora, este es el libro que recomendaré a padres, abuelos y educadores. Felicito a Mila Ciudad por esta <strong>obra tan completa, humana y necesaria.</strong>', verified: true },
      { author: 'Ester', rating: 5, comment: '<strong>"Criar con calma es posible"</strong> por fin un verdadero manual de crianza respetuosa y emocionalmente inteligente. Rescatando Padres me acompaña en momentos de duda, estrés y agotamiento, ofreciéndome herramientas prácticas, consejos empáticos y hasta primeros auxilios pediátricos. Como madre primeriza, encontré en estas páginas una guía clara y reconfortante para criar con amor, paciencia y seguridad. Recomiendo este libro a todos los que buscan una crianza consciente, basada en el respeto y la conexión emocional. <strong>Una lectura imprescindible en cualquier biblioteca familiar.</strong>', verified: true }
    ];

    const bookUrl = "https://amzn.to/4qCo1xt";
    const bookTitle = "Rescatando Padres de Mila Ciudad";
    const shareText = `¡Te recomiendo este libro! "${bookTitle}". Una guía esencial para padres, abuelos y educadores.`;
    
    const encodedUrl = encodeURIComponent(bookUrl);
    const encodedShareText = encodeURIComponent(shareText);
    const encodedTitle = encodeURIComponent(bookTitle);

    const handleCopy = () => {
        navigator.clipboard.writeText(bookUrl).then(() => {
            setCopySuccess('¡Enlace copiado!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Error');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
        <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
                <i key={i} className={`fa-solid fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
            ))}
        </div>
    );

    return (
        <section className="py-16 md:py-24 bg-cyan-50/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-montserrat leading-tight">
                        <span className="block bg-gradient-to-r from-cyan-600 via-cyan-700 to-blue-500 bg-clip-text text-transparent animate-gradient-text">
                            SOY LA AUTORA DEL LIBRO
                        </span>
                        <span className="block mt-1 bg-gradient-to-r from-cyan-600 via-cyan-700 to-blue-500 bg-clip-text text-transparent animate-gradient-text">
                            <strong>RESCATANDO PADRES</strong>
                        </span>
                    </h2>
                    <div className="mt-6 w-24 h-1 bg-cyan-200 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-gray-700 order-2 md:order-1">
                        <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-cyan-700 leading-tight">CONSIGUE LA GUÍA ESENCIAL PARA AFRONTAR CON CALMA TODOS LOS DESAFÍOS DE LA CRIANZA</h3>
                        <p className="mt-6 text-justify">Como madre y enfermera especializada en cuidados pediátricos, entiendo la crianza moderna: un mar de información que genera <strong>ansiedad y preocupación.</strong></p>
                        <p className="mt-4 font-semibold text-justify">Mi libro ofrece:</p>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-start"><i className="fa-solid fa-book-open-reader text-cyan-500 mt-1 mr-3"></i><div><strong>Conocimiento Práctico:</strong> Protocolos claros, sin confusión.</div></li>
                            <li className="flex items-start"><i className="fa-solid fa-shield-heart text-cyan-500 mt-1 mr-3"></i><div><strong>Seguridad:</strong> Herramientas para actuar con eficacia, sobre todo en emergencias.</div></li>
                            <li className="flex items-start"><i className="fa-solid fa-heart text-cyan-500 mt-1 mr-3"></i><div><strong>Crianza Disfrutada:</strong> Menos estrés, más conexión.</div></li>
                        </ul>
                        <p className="mt-4 text-justify">Es para padres, abuelos y educadores. Descubrirán temas cruciais: primeros días, alimentación, urgencias (con una vital <strong>Guía de Primeros Auxilios</strong>), cuidados, seguridad, adaptación escolar, desarrollo, emociones y vida familiar. La Guía de Primeros Auxilios es clave para <strong>transformar pánico en acción.</strong></p>
                        <p className="mt-4 text-justify">Regalar "Rescatando Padres" es dar seguridad y calma. Mi doble experiencia, profesional y maternal, crea una guía rigurosa y humana. Nació de una vivencia personal: salvar a una niña. Me recordó la importancia de <strong>estar preparados.</strong></p>
                        <p className="mt-6 font-bold text-xl text-cyan-700 text-center"><strong>Invierte en calma, invierte en seguridad.</strong> Es tu compañero de confianza.</p>
                    </div>

                    <div className="flex flex-col items-center order-1 md:order-2">
                        <img src="https://images.squidge.org/images/2025/11/01/Diseno-sin-titulo-_6_-_1_-Photoroom.webp" alt="Libro Rescatando Padres" className="max-w-xs md:max-w-sm w-full" />
                        <a href={bookUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-cyan-600 text-white font-bold py-3 px-10 rounded-full hover:bg-cyan-700 transition-colors shadow-lg">
                            CONSÍGUELO EN AMAZON
                        </a>

                        <div className="mt-12 text-center w-full max-w-sm">
                            <h4 className="font-bold font-montserrat text-gray-700">¡Comparte este libro!</h4>
                            <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
                                <a href={`https://wa.me/?text=${encodedShareText}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-green-600 transition-colors" aria-label="Compartir en WhatsApp">
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition-colors" aria-label="Compartir en Facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedShareText}`} target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-sky-600 transition-colors" aria-label="Compartir en Twitter">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href={`mailto:?subject=${encodedTitle}&body=${encodedShareText}%0D%0A%0D%0A${bookUrl}`} className="bg-gray-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-gray-600 transition-colors" aria-label="Compartir por correo electrónico">
                                    <i className="fas fa-envelope"></i>
                                </a>
                                <button onClick={handleCopy} className="bg-cyan-600 text-white h-10 px-4 rounded-full flex items-center justify-center text-sm hover:bg-cyan-700 transition-colors">
                                    <i className="fas fa-link mr-2"></i> {copySuccess || 'Copiar'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-24">
                    <h3 className="text-3xl font-bold font-montserrat text-center text-cyan-700 mb-12">Opiniones de los lectores</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {amazonReviews.map((review, index) => (
                            <div key={index}>
                                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500 flex flex-col h-full">
                                    <StarRating rating={review.rating} />
                                    <p className="text-gray-600 italic my-4 flex-grow" dangerouslySetInnerHTML={{ __html: `"${review.comment}"` }}></p>
                                    <div>
                                        <p className="font-semibold text-gray-700">{review.author}</p>
                                        {review.verified && <p className="text-sm text-green-600">Compra verificada</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </section>
    );
};

export const MenopauseJourney: React.FC<MenopauseJourneyProps> = ({ navigate }) => {
    return (
        <div className="bg-white text-gray-700 font-lora">
            <div className="container mx-auto px-6">
                
                {/* Intro Section */}
                <section className="py-16 md:py-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat gradient-text">
                        <span className="block">EN UNA VIDA HAY MUCHAS VIDAS</span>
                        <span className="block text-3xl md:text-4xl mt-2">Mi viaje</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">De la Ciencia de Cuidar a la Sabiduría de Acompañar. Descubre como tus talentos pueden guiarte en la menopausia.</p>
                </section>
                
                <section className="pb-16 md:pb-24">
                     <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <div className="flex justify-center items-center w-full" >
                           <img 
                                src="https://images.squidge.org/images/2025/10/15/milaciudadeeba031bf447f273.png"
                                alt="Mila Ciudad sonriendo" 
                                className="bg-white p-4 shadow-xl border rounded-sm w-full max-w-sm md:max-w-none"
                            />
                        </div>
                        <div>
                           <h2 className="text-3xl font-bold font-montserrat text-cyan-700">LA CIENCIA DE CUIDAR</h2>
                           <p className="mt-4 text-xl italic">"Enfermera especialista en Familiar y Comunitaria, mi vocación es el <strong>bienestar del cuerpo y el alma.</strong>"</p>
                        </div>
                    </div>
                </section>

                {/* Talents Section */}
                <section className="py-16 md:py-24 bg-gray-50/50 rounded-xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-cyan-700">SALUD, PALABRAS Y MELODÍAS</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="h-full">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center h-full">
                                <img src="https://images.squidge.org/images/2025/11/01/Diseno-sin-titulo-_6_-_1_-Photoroom.webp" alt="Libro Rescatando Padres" className="w-40 h-auto mb-4"/>
                                <h3 className="text-xl font-bold font-montserrat text-gray-700">AUTORA DE "RESCATANDO PADRES"</h3>
                                <p className="mt-2 text-gray-600 text-sm flex-grow">Mi experiencia en cuidados infantiles me llevó a escribir una <strong>guía para apoyar a los padres</strong> en esta etapa tan importante.</p>
                                <button onClick={() => window.open('https://rescatandopadres.milaciudad.com/', '_blank')} className="mt-4 bg-cyan-600 text-white font-bold py-2 px-6 rounded-full hover:bg-cyan-700 transition-colors text-sm">DESCUBRIR EL LIBRO</button>
                            </div>
                        </div>
                        <div className="h-full">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center h-full">
                                <img src="https://images.squidge.org/images/2025/11/01/mila-ciudad-yotube.md.webp" alt="Canal de YouTube de Mila Ciudad" className="w-full h-48 object-cover mb-4 rounded-lg"/>
                                <h3 className="text-xl font-bold font-montserrat text-gray-700">La voz como bálsamo</h3>
                                <p className="mt-2 text-gray-600 text-sm flex-grow"><strong>"CANCIONES DE MI VIDA."</strong> un refugio sonoro para <strong>dar voz a mi alma</strong> y conectar con la tuya.</p>
                                <button onClick={() => window.open('https://www.youtube.com/@MilaCiudadCovers', '_blank')} className="mt-4 bg-cyan-600 text-white font-bold py-2 px-6 rounded-full hover:bg-cyan-700 transition-colors text-sm">ESCUCHA EN YOUTUBE</button>
                            </div>
                        </div>
                        <div className="h-full">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center h-full">
                                <img src="https://images.squidge.org/images/2025/11/02/Mila-Ciudad-12-1.md.png" alt="Blog de Mila Ciudad" className="w-full h-48 object-cover mb-4 rounded-lg"/>
                                <h3 className="text-xl font-bold font-montserrat text-gray-700">No te Doblegues</h3>
                                <p className="mt-2 text-gray-600 text-sm flex-grow">Mi afán por <strong>afrontar la realidad con valentía</strong> y compartir esa fortaleza inquebrantable con quienes me leen y escuchan.</p>
                                <button onClick={() => navigate('blog')} className="mt-4 bg-cyan-600 text-white font-bold py-2 px-6 rounded-full hover:bg-cyan-700 transition-colors text-sm">EXPLORA MI BLOG</button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <TheFlightForwardStorySection />

                <MissionSection />

                <HistorySection />

                <BookSection />

            </div>
        </div>
    );
};