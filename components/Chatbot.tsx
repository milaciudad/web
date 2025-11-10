import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ChatbotProps {
    closeChat: () => void;
}

type Message = {
    text: string;
    sender: 'user' | 'bot';
};

const blogArticles = `
--- INICIO DEL CONTENIDO DEL BLOG ---

**Título del Artículo: ¿Soy candidata a la Terapia Hormonal?**
**Resumen:** Para mujeres sintomáticas sin factores de riesgo adicionales, los beneficios de la Terapia Hormonal superan los riesgos. Descubre los criterios de elegibilidad basados en la evidencia científica.
**Contenido:**
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Introducción: Tomando Decisiones Informadas sobre la THM</h3>
            <p>Hace dos décadas, la publicación de grandes estudios como el Women's Health Initiative cambió drásticamente la percepción sobre la Terapia Hormonal de la Menopausia (THM). Esto resultó en una disminución significativa de su uso, incluso en casos donde podría ser beneficiosa. Sin embargo, investigaciones posteriores y guías internacionales han demostrado que para mujeres sintomáticas sin factores de riesgo adicionales, los beneficios de la THM superan claramente los riesgos.</p>
            <p class="mt-4">En España, la situación es especialmente crítica: solo el 5.3% de las mujeres sintomáticas menopáusicas utilizan algún tipo de THM, una cifra que disminuye significativamente en aquellas con condiciones médicas comorbilidades. Esta brecha entre la evidencia científica y la práctica clínica motivó a la Asociación Española para el Estudio de la Menopausia (AEEM) a crear un documento de criterios de elegibilidad adaptado al contexto español.</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">¿Qué son los Criterios de Elegibilidad para la THM?</h3>
            <p>Los criterios de elegibilidad clasifican las diferentes condiciones médicas en cuatro categorías:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Categoría 1:</strong> Sin restricciones en el uso de THM</li>
                <li><strong>Categoría 2:</strong> Las ventajas superan a los riesgos</li>
                <li><strong>Categoría 3:</strong> Los riesgos generalmente superan a los beneficios</li>
                <li><strong>Categoría 4:</strong> No se debe usar THM</li>
            </ul>
            <p class="mt-4">Este sistema, similar al utilizado por la Organización Mundial de la Salud para anticonceptivos, proporciona recomendaciones claras y basadas en evidencia para facilitar la toma de decisiones tanto en profesionales sanitarios como en pacientes.</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Seguridad de la THM según la Edad</h3>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Mujeres menores de 50 años</h4>
            <p>Para mujeres con menopausia prematura (menor de 40 años) o temprana (40-44 años), la THM es generalmente segura. De hecho, estas mujeres tienen un riesgo cardiovascular mayor asociado a la edad temprana de la menopausia, y la THM puede tener un efecto protector.</p>
            <p><strong>Recomendación:</strong> Categoría 1 (sin restricciones)</p>

            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Mujeres de 50-59 años</h4>
            <p>Este es el grupo donde la THM demuestra mayor seguridad cardiovascular. Los estudios muestran que no hay diferencias significativas en riesgo cardiovascular con el uso de THM combinada o estrógenos solos comparado con placebo.</p>
            <p><strong>Recomendación:</strong> Categoría 1 o 2 según duración y tipo de THM</p>

            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Mujeres de 60-69 años</h4>
            <p>A esta edad, es fundamental evaluar el riesgo cardiovascular individual usando herramientas validadas como Framingham o SCORE. La recomendación varía entre Categoría 2 (para continuación de THM) y Categoría 3 (para inicio nuevo).</p>
            <p><strong>Consideración clave:</strong> La diferencia entre "iniciar" versus "continuar" la THM es crucial. Comenzar después de los 60 años conlleva riesgos mayores que continuar con un tratamiento ya establecido.</p>

            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Mujeres mayores de 70 años</h4>
            <p>En este grupo etario, los beneficios de la THM generalmente son menores que los riesgos, especialmente si se inicia nuevamente.</p>
            <p><strong>Recomendación:</strong> Categoría 3 (para inicio nuevo)</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Importancia del Timing: La Hipótesis del "Momento Crítico"</h3>
            <p>La investigación reciente subraya un concepto crucial: el momento de inicio importa más que la edad en sí. La THM iniciada dentro de los 10 años posteriores a la menopausia o antes de los 60 años tiene un perfil de seguridad significativamente mejor que cuando se inicia de forma tardía.</p>
            <p class="mt-4">Esto es especialmente relevante porque antes de los 60 años, la arteriosclerosis aún no se ha desarrollado, maximizando los beneficios preventivos de la THM.</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Riesgo Trombótico: Una Consideración Importante</h3>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Antecedentes de Trombosis Venosa</h4>
            <p>Para mujeres con historia personal de trombosis venosa profunda (TVP) o embolia pulmonar (EP):</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>THM oral: <strong>Categoría 4 (contraindicada)</strong></li>
                <li>THM transdérmica: <strong>Categoría 3 (requiere consideración individualizada)</strong></li>
            </ul>
            <p><strong>Recomendación:</strong> La vía transdérmica tiene un perfil más favorable porque evita el "efecto de primer paso" hepático, reduciendo la estimulación de factores de coagulación.</p>

            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Trombofilia Asintomática</h4>
            <p>Es especialmente importante destacar que las mujeres con trombofilia pueden desarrollar complicaciones trombóticas serias:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>THM oral combinada: <strong>Categoría 4 (aumenta el riesgo hasta 25 veces)</strong></li>
                <li>THM transdérmica: <strong>Categoría 2 (segura para la mayoría de mutaciones)</strong></li>
            </ul>

            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Migrañas: Un Riesgo Específico</h4>
            <p>Las migrañas, especialmente las migrañas con aura, tienen relación con mayor riesgo de accidente cerebrovascular:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Migraña sin aura: <strong>Categoría 2 (THM segura)</strong></li>
                <li>Migraña con aura: <strong>Categoría 3 (requiere evaluación cuidadosa)</strong></li>
                <li>Cefalea tensional: <strong>Categoría 1 (la THM puede incluso mejorar síntomas)</strong></li>
            </ul>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Cáncer de Mama: Desmitificando el Riesgo</h3>
            <p>Una de las preocupaciones más comunes sobre la THM es el riesgo de cáncer de mama. La evidencia actual muestra un panorama más matizado:</p>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Por Edad y Duración</h4>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Mujeres 50-59 años con THM combinada: <strong>Categoría 2 (pequeño aumento de riesgo, pero superado por beneficios)</strong></li>
                <li>Estrógenos solos: <strong>Categoría 1-2 (riesgo generalmente más bajo)</strong></li>
                <li>Tibolona: <strong>Categoría 1 (perfil más favorable)</strong></li>
            </ul>
            
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Puntos Clave sobre Cáncer de Mama</h4>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>El riesgo es generalmente pequeño en relación al riesgo absoluto de cáncer de mama en la población general.</li>
                <li>La duración del tratamiento influye: Mayor tiempo de uso = mayor riesgo relativo.</li>
                <li>La vía de administración importa: La THM transdérmica tiene un perfil diferente a la oral.</li>
                <li>Estradiol + progesterona natural: Datos preliminares sugieren un perfil más seguro.</li>
            </ul>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Síndrome Metabólico y Obesidad</h3>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">THM en Mujeres con Obesidad</h4>
            <p>La obesidad es un factor de riesgo para trombosis venosa:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>IMC 25-30 kg/m²: THM transdérmica es Categoría 1 (segura); oral es Categoría 2.</li>
                <li>IMC >30 kg/m²: THM transdérmica sigue siendo Categoría 2; oral es Categoría 3.</li>
            </ul>
            <p><strong>Recomendación práctica:</strong> En mujeres obesas, preferir siempre la vía transdérmica sobre la oral.</p>

            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Beneficios Metabólicos</h4>
            <p>Contrariamente a creencias antiguas, la THM transdérmica:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Mejora el control glucémico en mujeres con diabetes.</li>
                <li>No aumenta el peso.</li>
                <li>Mejora perfiles lipídicos.</li>
                <li>Reduce la resistencia a la insulina.</li>
            </ul>
            
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Vía de Administración: ¿Oral o Transdérmica?</h3>
            <p>Una conclusión importante de estos criterios es que la vía de administración determina significativamente el perfil de riesgo-beneficio:</p>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">THM Oral</h4>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Mayor estimulación de factores de coagulación</li>
                <li>Mayor metabolismo hepático</li>
                <li>Riesgo trombótico más elevado</li>
                <li>Recomendada en mujeres sin factores de riesgo trombótico</li>
            </ul>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">THM Transdérmica</h4>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Evita el efecto de primer paso hepático</li>
                <li>Riesgo trombótico más bajo</li>
                <li>Preferida en mujeres con: Obesidad, Trombofilia asintomática, Historia de migrañas, Factores de riesgo trombótico</li>
            </ul>
            
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Beneficios de la THM Ampliamente Documentados</h3>
            <p>Más allá del control de síntomas menopaúsicos, la THM iniciada tempranamente proporciona:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Reducción de mortalidad global (especialmente cuando se inicia antes de los 60 años)</li>
                <li>Protección cardiovascular (en iniciación temprana)</li>
                <li>Prevención de osteoporosis y fracturas</li>
                <li>Preservación de función cognitiva</li>
                <li>Mejora de calidad de vida</li>
                <li>Mejor control glucémico en mujeres con diabetes</li>
                <li>Mejora en síntomas depresivos y ansiedad</li>
            </ul>
            
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Conclusiones: Un Enfoque Individualizado</h3>
            <p>Los criterios de elegibilidad para la THM representan un cambio paradigmático en la medicina menopáusica: desde un enfoque "una talla para todas" hacia una evaluación personalizada basada en evidencia.</p>
            <p><strong>Mensajes Clave:</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>La THM es segura para la mayoría de mujeres sintomáticas sin factores de riesgo.</li>
                <li>El momento importa: Iniciar antes de los 60 años o dentro de 10 años de la menopausia maximiza beneficios.</li>
                <li>La vía de administración determina riesgos: Transdérmica es más segura en presencia de factores trombóticos.</li>
                <li>El riesgo de cáncer de mama es pequeño comparado con beneficios en mujeres apropiadamente seleccionadas.</li>
                <li>Requiere individualización: No existe una recomendación universal; cada mujer merece una evaluación particular.</li>
            </ul>

---

**Título del Artículo: Los Análisis y Pruebas Que Necesitas Antes de Empezar Terapia Hormonal**
**Resumen:** Antes de empezar terapia hormonal, tu médico necesita una serie de pruebas para asegurar que es la opción correcta y segura para ti. Descubre qué análisis y exploraciones son necesarios.
**Contenido:**
            <p>Okay, así que tu médico y tú ya habéis hablado sobre la posibilidad de usar terapia hormonal. Pero antes de empezar, surge la pregunta inevitable: ¿Qué pruebas me van a hacer? ¿Cuántas inyecciones? ¿Cuánta sangre? ¿Voy a gastar una fortuna?</p>
            <p class="mt-4">Buena noticia: no es tan aterrador como suena. Y sí, tiene sentido.</p>
            
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">¿Por Qué Tanta Prueba Antes de Empezar?</h3>
            <p>Aquí está el trato: la terapia hormonal es segura para la mayoría, pero "mayoría" no significa "todas". Tu médico necesita asegurarse de que:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Realmente estás en menopausia (no es depresión, no es tiroides, no es simplemente estrés).</li>
                <li>Tu corazón está bien (porque la edad y los estrógenos tienen relación).</li>
                <li>Tu sangre coagula normalmente (porque algunas hormonas pueden aumentar ligeramente el riesgo de coágulos).</li>
                <li>No hay sorpresas escondidas (cosas como diabetes silenciosa o problemas de tiroides que confunden los síntomas).</li>
                <li>Tus mamas están sanas (porque necesitas una imagen de referencia antes de empezar).</li>
            </ul>
            <p class="mt-4">Es como hacer un check-in completo antes de un viaje importante. Quieres estar segura de que todo funciona.</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">La Conversación Inicial: Tu Historia</h3>
            <p>Lo primero que pasará es que tu médico te hará MUCHAS preguntas. No porque sea chismosa, sino porque tu historia es la pista más importante.</p>
            
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Lo Que Te Preguntará</h4>
            <p><strong>Sobre tu menopausia:</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>¿Cuándo fue tu última regla?</li>
                <li>¿Cómo empezó? ¿De repente o gradual?</li>
                <li>¿Qué síntomas tienes? ¿Qué tan intensos son?</li>
                <li>¿Cada cuánto? ¿Te despiertan a las 3 de la mañana?</li>
                <li>¿Ha afectado tu trabajo, tu sueño, tu vida sexual?</li>
            </ul>
            <p class="mt-4"><strong>Sobre tu salud pasada y presente:</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>¿Has tenido coágulos en las venas (TVP)? ¿O embolia pulmonar?</li>
                <li>¿Infarto o ictus alguna vez?</li>
                <li>¿Cáncer de algo? (especialmente mama)</li>
                <li>¿Sufres migrañas? ¿Con aura (esas luces que ves) o sin?</li>
                <li>¿Obesidad? ¿Diabetes?</li>
                <li>¿Presión alta?</li>
            </ul>
             <p class="mt-4"><strong>Sobre tu familia:</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>¿Tu mamá, hermana, tía tuvieron cáncer de mama?</li>
                <li>¿Coágulos en alguien?</li>
                <li>¿Problemas del corazón en la familia?</li>
            </ul>
             <p class="mt-4"><strong>Sobre medicamentos y hábitos:</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>¿Qué medicinas tomas?</li>
                <li>¿Fumas?</li>
                <li>¿Cuánto alcohol bebes?</li>
                <li>¿Haces ejercicio?</li>
            </ul>
            <p class="mt-4">¿Por qué importa todo esto? Porque cada respuesta ajusta el "mapa de riesgo" que tu médico está armando. No es invasivo; es prevención.</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Las Pruebas de Laboratorio: La Analítica</h3>
            <p>Aquí es donde sacan sangre. Sí, una sola extracción, pero van a mirar varias cosas en esa muestra. Piénsalo como un "análisis completo de bienestar."</p>
            
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Los Análisis Hormonales (Para Confirmar que es Menopausia)</h4>
            <p><strong>FSH (Hormona Folículo Estimulante)</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Es como el "gritador" de tu cuerpo: grita para que tus ovarios produzcan estrógeno.</li>
                <li>En menopausia, grita cada vez más fuerte porque los ovarios no escuchan.</li>
                <li>Valores normales en menopausia: >30-40 mUI/ml (cuanto más alto, más seguro el diagnóstico).</li>
                <li><strong>¿Por qué se hace?</strong> Para confirmar que realmente estás en menopausia.</li>
            </ul>
            <p class="mt-4"><strong>Estradiol</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                 <li>Es el estrógeno "estrella"—el que más importa.</li>
                <li>En menopausia cae a niveles muy bajos.</li>
                <li>Valores normales en menopausia: <30 pg/ml.</li>
                <li><strong>¿Por qué se hace?</strong> Para confirmar que efectivamente hay deficiencia de estrógeno.</li>
            </ul>
            <p class="mt-4"><strong>TSH (Hormona del Tiroides)</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                 <li>Aquí es donde descubrimos si el culpable es tu tiroides, no tu menopausia.</li>
                 <li>Muchas mujeres en menopausia desarrollan hipotiroidismo.</li>
                 <li>Ambos causan cansancio, depresión, cambios de peso, sequedad.</li>
                 <li>Valores normales: 0.2-4.7 mUI/ml.</li>
                 <li><strong>¿Por qué se hace?</strong> Porque si el problema es tu tiroides, la terapia hormonal no va a resolver nada.</li>
            </ul>

            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">El Panel Metabólico: "¿Cómo está tu salud general?"</h4>
             <p class="mt-4"><strong>Glucemia en Ayunas</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                 <li>¿Tienes diabetes que no sabes?</li>
                 <li>Valores normales: <100 mg/dL.</li>
                 <li><strong>¿Por qué importa?</strong> Porque la THM interactúa con el azúcar en sangre.</li>
            </ul>
            <p class="mt-4"><strong>Perfil Lipídico Completo</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                 <li>Colesterol total, HDL ("colesterol bueno"), LDL ("colesterol malo"), triglicéridos.</li>
                 <li><strong>¿Por qué importa?</strong> Porque son predictores de riesgo cardiovascular.</li>
            </ul>
            <p class="mt-4"><strong>Función Hepática (AST, ALT, bilirrubina)</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                 <li>El hígado es como la "fábrica" de tu cuerpo que procesa hormonas.</li>
                 <li><strong>¿Por qué importa?</strong> Porque si tu hígado no funciona bien, no puede procesar la THM correctamente.</li>
            </ul>
            <p class="mt-4"><strong>Función Renal (Creatinina, Urea)</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                 <li>Los riñones son los "limpiadores" del cuerpo.</li>
                 <li><strong>¿Por qué importa?</strong> Si no funcionan bien, las toxinas se acumulan.</li>
            </ul>

            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">La Coagulación: "¿Tu Sangre Coagula Normalmente?"</h4>
            <p class="mt-4"><strong>Prueba Básica de Coagulación (Tiempo de protrombina, TTPA)</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                 <li>Verifica que los mecanismos de coagulación estén funcionando.</li>
                 <li><strong>¿Por qué importa?</strong> Porque la THM oral puede aumentar el riesgo de coágulos.</li>
            </ul>
            <p class="mt-4"><strong>Estudio de Trombofilia (si hay factores de riesgo)</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                 <li>Busca mutaciones genéticas que hacen la sangre "pegajosa".</li>
                 <li><strong>¿Cuándo se hace?</strong> Solo si ya has tenido un coágulo, tu familia tiene historia, eres obesa o fumas mucho.</li>
            </ul>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Las Pruebas "En Persona": La Exploración Física</h3>
            <p>Después de la sangre, viene la evaluación clínica. Aquí tu médico te toca, examina, escucha.</p>
            
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">El Electrocardiograma (ECG)</h4>
            <p>Si tienes más de 60 años O tienes factores de riesgo cardiovascular, probablemente necesites este. Es indoloro y tarda 5 minutos. Se hace para asegurarse de que tu corazón está funcionando bien.</p>
            
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">La Presión Arterial</h4>
            <p>Se mide varios días. La hipertensión no impide la THM, pero necesita estar controlada.</p>
            
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">La Exploración Ginecológica</h4>
            <p>Es importante para establecer una "línea de base" y descartar problemas. Incluye inspección visual, palpación y una citología cervical si no está actualizada.</p>

            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">La Ecografía Transvaginal</h4>
            <p>Se realiza si hay sangrado anormal. Busca el grosor del endometrio, quistes o masas en ovarios y fibromas.</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Las Pruebas de Mamas: "¿Están Tus Mamas Sanas?"</h3>
            <p>Es importante porque la THM puede afectar la densidad mamaria, así que necesitas una imagen de "antes".</p>
            
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Exploración Clínica y Mamografía</h4>
            <p>Se palparán tus mamas buscando nódulos o cambios y se realizará una mamografía si tienes 50+ años y no tienes una reciente. Esto crea una imagen de referencia crítica para detectar cualquier cambio futuro.</p>

            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">La Densitometría Ósea (DEXA)</h4>
            <p>No siempre es obligatoria, pero se recomienda si eres delgada, tienes antecedentes familiares de osteoporosis o fuiste menopáusica precoz. Mide la densidad ósea para diagnosticar osteoporosis y establecer una línea de base.</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">El Resumen de Pruebas Por Escenarios</h3>
            <p>El conjunto de pruebas variará según tu edad y factores de riesgo, pero en general, una mujer sana de 45-55 años necesitará la historia clínica, una analítica completa, exploración ginecológica y mamografía. Las mujeres con más edad o factores de riesgo pueden necesitar pruebas adicionales como un ECG o estudios de coagulación.</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">El Timing: ¿Cuánto Tarda Todo Esto?</h3>
            <p>Siendo realistas, el proceso completo desde la primera consulta hasta tener todo listo para empezar la THM puede llevar <strong>entre 2 y 4 semanas.</strong> ¡Paciencia, vale la pena!</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Después de Empezar: Las Revisiones</h3>
            <p>Una vez que empiezas, los controles son mucho más simples. Una revisión a los 3 meses para ajustar la dosis y luego un control anual que incluye exploración, mamografía según protocolo y analítica.</p>
            
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Conclusión: No Es Tan Malo Como Suena</h3>
            <p>Sí, hay varias pruebas. Sí, requiere tiempo. Pero piénsalo así: estás invirtiendo 2-4 semanas ahora para asegurarte de que los próximos 10+ años de tu vida van a ser <strong>MUCHO mejores.</strong></p>
            <p class="mt-4">Dormir toda la noche sin sofocos. Recuperar tu libido. Dejar de tener cambios de humor. Eso vale cada gota de sangre que te extraigan. Así que respira hondo, agenda esa cita, y toma el primer paso. Tu versión mejorada de ti misma te estará esperando del otro lado.</p>
            <p class="mt-4"><em>Recuerda: Esta información se basa en las recomendaciones de la Asociación Española para el Estudio de la Menopausia (AEEM) y protocolos de buena práctica clínica. Si tienes preguntas específicas sobre tu caso, siempre consulta con tu médico o especialista en menopausia.</em></p>

---

**Título del Artículo: Más Allá del Cardio: Por Qué el Entrenamiento de Fuerza es Clave para la Mujer +50**
**Resumen:** Levantar pesas no es para culturistas. Es una de las herramientas más poderosas que tienes para combatir los efectos del envejecimiento y la caída hormonal.
**Contenido:**
            <p>Cuando pensamos en ejercicio para mujeres en la mediana edad, la imagen que suele venir a la mente es la de caminar, correr o hacer clases de aeróbic. Y aunque el ejercicio cardiovascular es importante, hay un tipo de entrenamiento que se vuelve absolutamente crucial en la menopausia y que a menudo se pasa por alto: <strong>el entrenamiento de fuerza.</strong></p>
            <p class="mt-4">Levantar pesas (o usar bandas elásticas, o tu propio peso corporal) no es para culturistas. Es una de las herramientas más poderosas que tienes para <strong>combatir los efectos del envejecimiento y la caída hormonal.</strong></p>
            
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Tu Póliza de Seguros Contra la Osteoporosis</h3>
            <p>La caída de estrógenos acelera la pérdida de densidad ósea, poniéndonos en un riesgo mucho mayor de sufrir <strong>osteoporosis y fracturas.</strong> El cardio tiene poco impacto en esto. Sin embargo, el entrenamiento de fuerza crea tensión en los huesos. Esta tensión es una señal que le dice a tu cuerpo: "¡Necesito ser más fuerte aquí!". Como respuesta, las células óseas (osteoblastos) se activan para construir más hueso. Es, literalmente, como <strong>invertir en la estructura de tu esqueleto para el futuro.</strong></p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">El Interruptor de tu Metabolismo</h3>
            <p>La <strong>pérdida de masa muscular (sarcopenia)</strong> es una de las principales razones por las que nuestro metabolismo se ralentiza. El músculo es un tejido metabólicamente activo; <strong>quema calorías las 24 horas del día.</strong> El entrenamiento de fuerza es el único tipo de ejercicio que puede detener e incluso revertir la sarcopenia. Al construir músculo, estás <strong>aumentando la velocidad de tu motor metabólico,</strong> lo que te ayuda a gestionar el peso y a mejorar tu sensibilidad a la insulina.</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Más Allá de lo Físico: Fuerza Mental y Confianza</h3>
            <p>Los beneficios no son solo para tu cuerpo. El acto de levantar algo pesado y darte cuenta de que puedes, de que cada semana eres un poco más fuerte, tiene un <strong>impacto psicológico inmenso.</strong> Aumenta tu confianza, te hace sentir capaz y poderosa en un momento en que muchas mujeres se sienten vulnerables. Es una demostración tangible de tu propia fortaleza que se traslada a todas las demás áreas de tu vida.</p>

            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">¿Cómo Empezar si Nunca lo Has Hecho?</h3>
            <p>La idea de entrar en una sala de pesas puede ser intimidante, pero no tiene por qué serlo.</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Empieza en casa:</strong> Puedes comenzar con ejercicios de peso corporal como sentadillas, zancadas, flexiones en la pared y planchas. Unas bandas elásticas de resistencia son una inversión económica y muy versátil.</li>
                <li><strong>Busca un profesional:</strong> Considera contratar a un entrenador personal, aunque solo sea para unas pocas sesiones. Te enseñará la técnica correcta para evitar lesiones y te dará un programa adaptado a ti.</li>
                <li><strong>Céntrate en los grandes movimientos:</strong> No necesitas máquinas complicadas. Concéntrate en movimientos compuestos que trabajan varios grupos musculares a la vez: sentadillas, peso muerto, remos, press de hombros.</li>
                <li><strong>La clave es la sobrecarga progresiva:</strong> Para que el músculo crezca, necesitas retarlo. Esto significa que, con el tiempo, debes intentar aumentar el peso, hacer más repeticiones o reducir el descanso. Siempre de forma gradual.</li>
                <li><strong>Frecuencia y descanso:</strong> Con 2 o 3 sesiones de fuerza a la semana que no sean en días consecutivos es más que suficiente para ver resultados. El descanso es igual de importante que el entrenamiento, ya que es cuando el músculo se repara y crece.</li>
            </ul>
            <p class="mt-4">El entrenamiento de fuerza en la menopausia no es una opción, es una necesidad. Es la forma más eficaz de invertir en tu <strong>autonomía, tu independencia y tu calidad de vida</strong> para las próximas décadas. No se trata de tener un cuerpo de revista, se trata de tener un cuerpo funcional, resistente y capaz de llevarte a donde quieras ir. <strong>Se trata de no doblegarte.</strong></p>

---

**Título del Artículo: La Microbiota en la Menopausia: Tu Aliada Invisible en esta Transformación**
**Resumen:** Descubre el secreto que vive dentro de ti y que puede cambiar completamente cómo vives esta etapa. Entender tu microbiota te da el poder de calmar el fuego interior y recuperar el equilibrio.
**Contenido:**
            <p>Querida mujer en menopausia,</p>
            <p class="mt-4">Sé que estás atravesando uno de los períodos más desafiantes de tu vida. Los sofocos te despiertan en la madrugada, tu cuerpo cambia sin tu consentimiento, tu mente a veces se siente nublada, y te preguntas si alguna vez te sentirás como antes. Te entiendo. Pero lo que quiero compartirte hoy es un secreto que puede cambiar completamente cómo vives esta etapa: <strong>tu microbiota.</strong></p>
            <p class="mt-4">No, no es complicado. Es algo hermoso y lleno de esperanza.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">El Secreto que Vive Dentro de Ti</h3>
            <p>Dentro de tu cuerpo viven billones de pequeños microorganismos—bacterias, hongos, virus—que forman un ecosistema complejo y fascinante. Durante todos tus años fértiles, estos seres microscópicos trabajaron en armonía contigo, protegidos y nutridos por los estrógenos que producía tu cuerpo. Eran como un <strong>jardín bien cuidado,</strong> donde cada planta sabía exactamente dónde estaba y qué hacer.</p>
            <p class="mt-4">Pero la menopausia llega, y ese jardín comienza a transformarse.</p>
            <p class="mt-4">Los estrógenos disminuyen, y de repente, las bacterias que protegían tu salud no tienen las señales que las mantenían en equilibrio. Este cambio no es malo—es natural, es parte de la evolución de tu vida—pero sí es un cambio profundo que afecta casi todo en ti. Y aquí está lo importante: <strong>entender esto te da poder.</strong></p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">El Estroboloma: Tu Guardián Hormonal</h3>
            <p>Hay un concepto hermoso que quiero que conozcas: el <strong>estroboloma</strong>. Es el nombre científico para el conjunto de bacterias intestinales especiales que tienen un superpoder: pueden metabolizar tus estrógenos. Imagina que son guardianes vigilantes que mantienen el equilibrio hormonal de tu cuerpo.</p>
            <p class="mt-4">Durante la menopausia, estas bacterias guardianas comienzan a disminuir. Tu intestino pierde diversidad—es como si un coro hermoso donde cantaban muchas voces diferentes ahora solo quedara con algunos cantantes. Las bacterias que producen sustancias anti-inflamatorias se reducen, mientras que otras que generan más inflamación empiezan a aumentar.</p>
            <p class="mt-4">¿Y cuál es el resultado? Que tu cuerpo lucha más para mantener el equilibrio. Los síntomas que experimentas—esos sofocos que te despiertan sudorosa, esa fatiga inexplicabile, esos cambios de humor que te sorprenden—muchos de ellos están conectados directamente con este desequilibrio bacteriano.</p>
            <p class="mt-4">Pero aquí viene lo hermoso: si alimentas bien a estas bacterias guardianas, ellas luchan contigo. Te ayudan a mantener tus hormonas más estables. <strong>Reducen la inflamación. Calman ese fuego interior que sientes.</strong></p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Tu Salud Vaginal: Las Guardianas del Templo Íntimo</h3>
            <p>Durante todos tus años fértiles, tuviste unos aliados especiales viviendo en tu vagina: los <strong>lactobacilos.</strong> Eran como guardianas protectoras, manteniéndote segura, manteniéndote en equilibrio. Gracias a los estrógenos, tenían todo lo que necesitaban para prosperar y protegerte.</p>
            <p class="mt-4">Con la menopausia, estas guardianas comienzan a disminuir. Hasta cien veces menos que antes. Y cuando se van, todo cambia.</p>
            <p class="mt-4">La sequedad vaginal que experimentas no es capricho de tu cuerpo—es el resultado directo de que esas guardianas ya no están ahí en la cantidad que lo hacían. El pH vaginal cambia, se vuelve menos ácido, lo que significa que otras bacterias menos amables pueden entrar más fácilmente. <strong>Las infecciones urinarias, la sensación de incomodidad, esa irritación constante</strong> que quizás experimentas—todo está conectado.</p>
            <p class="mt-4">Pero nuevamente, esta no es una sentencia. Es una invitación a cuidar lo que está cambiando.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">La Inflamación Silenciosa: Por Qué Te Sientes Tan Diferente</h3>
            <p>Existe algo que nadie muchas veces te explica: durante la menopausia, tu cuerpo entra en un estado de <strong>inflamación crónica de bajo grado</strong>. Es como si tuviera un fuego pequeño pero persistente ardiendo en su interior. Este fuego está alimentado por los cambios en tu microbiota.</p>
            <p class="mt-4">Cuando tu intestino cambia, la barrera que lo protege se vuelve más permeable. Las bacterias y sus toxinas pueden traspasar, activando tu sistema inmune de una manera que mantiene ese fuego encendido constantemente. Y ese fuego tiene consecuencias: <strong>afecta tu estado de ánimo, tu energía, tu claridad mental, tu peso, incluso tu salud ósea a largo plazo.</strong></p>
            <p class="mt-4">Es como si tu cuerpo estuviera constantemente en alerta roja. Claro que te sientes cansada. Claro que tu humor fluctúa. Claro que ganas peso sin hacer mucho. Tu cuerpo está trabajando horas extra para lidiar con este estado de inflamación.</p>
            <p class="mt-4">Pero una microbiota saludable es como apagar ese fuego. Gradualmente, tu cuerpo se calma. La inflamación baja. Y contigo, baja la intensidad de tantos síntomas que creías que tenías que tolerar.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Las Señales que tu Cuerpo te Envía</h3>
            <p>Tu cuerpo es sabio. Constantemente te habla. A veces, estos son los mensajes que podrías estar recibiendo de una microbiota desequilibrada:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Tu vientre se distende, especialmente después de comer. Te sientes <strong>hinchada, incómoda,</strong> aunque no hayas comido mucho.</li>
                <li>Los <strong>gases y la digestión lenta</strong> son tus compañeros constantes.</li>
                <li>Experimentas ciclos de <strong>estreñimiento seguidos de diarrea.</strong></li>
                <li>Te sientes <strong>profundamente cansada,</strong> aunque hayas dormido "suficiente".</li>
                <li><strong>Ganas peso</strong> sin entender por qué, especialmente alrededor del abdomen.</li>
                <li>Tu humor cambia drásticamente de un momento al otro. Sientes <strong>ansiedad o tristeza</strong> sin razón aparente.</li>
                <li>Tienes <strong>infecciones urinarias o vaginales recurrentes,</strong> como si no pudieran dejar de volver.</li>
                <li>Tu vagina se siente completamente <strong>seca, incómoda,</strong> y el acto sexual se convierte en algo que evitas.</li>
            </ul>
            <p class="mt-4">Si reconoces varios de estos, tu cuerpo te está pidiendo ayuda. Y la buena noticia es que puedes darla.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Tus Herramientas: Cómo Restaurar tu Microbiota</h3>
            <p>Voy a compartirte estrategias que van a cambiar cómo te sientes. Estas no son restricciones o sacrificios. Son <strong>actos de amor hacia tu cuerpo.</strong></p>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Come como si estuvieras alimentando un jardín</h4>
            <p>Tu microbiota es un jardín, y los alimentos que eliges son el agua y los nutrientes que lo hacen florecer. <strong>Cuanta más variedad de plantas comas, más diversa será tu microbiota.</strong> Apunta a 30 alimentos vegetales diferentes por semana. Suena mucho, pero es sorprendentemente fácil cuando lo vuelves un juego: frutas de diferentes colores, verduras que nunca has probado, legumbres variadas, semillas y nueces.</p>
            <p class="mt-4">Cada color representa diferentes nutrientes. Las verduras de hoja verde oscuro alimentan bacterias diferentes que el rojo intenso de los tomates o las remolachas. El púrpura de las moras tiene un poder especial. <strong>Vuelve tu plato un arcoíris,</strong> y estarás alimentando a miles de millones de tus amigas microscópicas.</p>
            <p class="mt-4">La <strong>fibra</strong> es el corazón de todo esto. Cuando comes fibra, tus bacterias la fermentan y producen algo mágico llamado ácidos grasos de cadena corta, especialmente el <strong>butirato.</strong> Este butirato es como un bálsamo curativo para tu intestino. <strong>Reduce la inflamación desde adentro,</strong> sella ese intestino permeable, y es como si apagara el fuego lentamente.</p>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Invita los fermentados a tu mesa</h4>
            <p>Los alimentos fermentados son como traer refuerzos al campo de batalla. Literalmente, llevan bacterias vivas y beneficiosas directamente a tu intestino.</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Un <strong>yogur natural sin azúcar</strong>—el verdadero, no esos productos azucarados que pretenden ser yogur. Si puedes, elige yogur de cabra, que es más fácil de digerir.</li>
                <li>El <strong>kéfir,</strong> que es como el hermano más potente del yogur. Tiene muchas más cepas bacterianas.</li>
                <li>El <strong>chucrut</strong> hecho en casa, crudo, no pasteurizado. Puede parecer que huele raro, pero es un elixir vivo.</li>
                <li>El <strong>miso</strong> sin pasteurizar, que puedes añadir a sopas o caldos.</li>
                <li>Incluso la <strong>kombucha</strong> casera, en cantidades razonables.</li>
            </ul>
            <p class="mt-4">Estos alimentos son mensajes de amor que envías a tu microbiota.</p>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Ten cuidado con lo que dejas ir</h4>
            <p>Así como hay alimentos que alimentan lo bueno, hay alimentos que alimentan lo no tan bueno. No tienes que eliminar nada para siempre, pero sé consciente:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>El <strong>azúcar refinada</strong> es como echar gasolina al fuego inflamatorio. Alimenta directamente las bacterias problemáticas.</li>
                <li>Los <strong>edulcorantes artificiales</strong> parecen una solución, pero alteran tu microbiota de maneras que aún estamos descubriendo.</li>
                <li>Los <strong>ultraprocesados</strong> te alejan del jardín diverso que necesitas.</li>
                <li>El <strong>alcohol en exceso</strong> daña las paredes de tu intestino.</li>
                <li>Las <strong>grasas trans y los aceites refinados</strong> promueven inflamación.</li>
                <li>Las <strong>carnes procesadas</strong> no son amigas de tu microbiota.</li>
            </ul>
            <p class="mt-4">No es sobre culpa. Es sobre elección consciente. Cada vez que eliges una verdura sobre un ultraprocesado, estás eligiendo sanidad. Estás diciendo sí a ti misma.</p>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Los Probióticos: Refuerzos Especiales</h4>
            <p>Hay momentos en la transición menopáusica donde tu cuerpo necesita un empujón extra. Los <strong>probióticos</strong>—bacterias beneficiosas en forma de suplemento—pueden ser ese apoyo.</p>
            <p class="mt-4">Busca probióticos que contengan cepas específicas como <em>Levilactobacillus brevis</em>, <em>Lactiplantibacillus plantarum</em> y <em>Pediococcus acidilactici</em>, que tienen la capacidad especial de ayudarte a reutilizar tus propios estrógenos. Estos son guardianes del estroboloma.</p>
            <p class="mt-4">Para la salud vaginal específicamente, los lactobacilos vaginales como <em>Lactobacillus rhamnosus</em> y <em>Lactobacillus crispatus</em> pueden cambiar el juego. Algunos vienen en presentaciones vaginales que trabajan directamente donde más las necesitas.</p>
            <p class="mt-4">Elige probióticos de calidad, no los más baratos. Busca que especifiquen el número de <strong>UFC</strong> (unidades formadoras de colonias), que idealmente sea entre 10 a 50 mil millones. Y que sean en cápsulas, no en polvo, para que sobrevivan el viaje por tu estómago.</p>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Calma tu Mente, Calma tu Cuerpo</h4>
            <p>Tu estrés y tu microbiota tienen una relación bidireccional íntima. El cortisol elevado alimenta la disbiosis, y la disbiosis alimenta el estrés. Es un ciclo.</p>
            <p class="mt-4">Pero aquí tienes un superpoder: <strong>cuando calmas tu mente, estás sanando tu microbiota.</strong></p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Diez minutos de meditación</strong> cada mañana. No tiene que ser perfecta. Solo siéntate, respira, observa.</li>
                <li>Una <strong>caminata lenta en la naturaleza.</strong> No es ejercicio competitivo; es conexión.</li>
                <li><strong>Técnicas de respiración profunda.</strong> La respiración de caja es especial: inhala contando hasta 4, retén contando hasta 4, exhala contando hasta 4, retén nuevamente. Hazlo cinco veces y verás cómo tu sistema nervioso se calma.</li>
                <li>Un <strong>sueño consistente de 7 a 8 horas.</strong> Este es el momento en que tu cuerpo repara, regenera, y sana tu microbiota. No es lujo; es medicina.</li>
            </ul>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Actos Simples de Protección</h4>
            <p>Pequeños cambios cotidianos pueden hacer una gran diferencia:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Deja los <strong>antibióticos</strong> para cuando realmente los necesites. Sé que esto suena obvio, pero muchas veces tomamos antibióticos para infecciones virales o por prescripción automática. Pregunta siempre si realmente los necesitas. Destruyen años de equilibrio microbiano.</li>
                <li>Sé <strong>gentil con tu vagina.</strong> No la sobre-limpies. La vagina es autolimpiante. Solo agua tibia. Nada más. La higiene excesiva mata a tus amigas guardianas.</li>
                <li><strong>Deja de fumar,</strong> si lo haces. El tabaco afecta negativamente tu microbiota.</li>
                <li><strong>Muévete todos los días,</strong> aunque sea poco. La inactividad favorece la disbiosis.</li>
                <li><strong>Reduce el alcohol,</strong> especialmente si notabas que después de beber te sientes peor.</li>
            </ul>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">La Magia de la Relación Bidireccional</h3>
            <p>Aquí está lo que quiero que realmente entiendas: la relación entre tu menopausia y tu microbiota funciona en ambas direcciones.</p>
            <p class="mt-4">Sí, la menopausia altera tu microbiota. Eso es una realidad biológica.</p>
            <p class="mt-4">Pero también es verdad que <strong>una microbiota saludable puede mitigar significativamente los síntomas menopáusicos.</strong> Una microbiota sana reduce la inflamación, mejora el equilibrio hormonal, apoya tu salud vaginal, fortalece tus huesos, regula tu peso, clarifica tu mente, y estabiliza tu humor.</p>
            <p class="mt-4">En otras palabras, <strong>tienes poder</strong>. Cada elección que haces tiene peso. Cada alimento que pones en tu plato es un voto por tu bienestar. Cada noche que duermes bien es una noche que tus bacterias guardianas trabajan para ti. Cada momento de calma que cultivas es medicina.</p>
            <p class="mt-4"><strong>No eres víctima de la menopausia. Eres una mujer en transformación que puede trabajar con su cuerpo, no contra él.</strong></p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Más Allá de la Menopausia</h3>
            <p>Lo que también quiero que sepas es que invertir en tu microbiota ahora no solo te ayuda hoy. Esta etapa que estás viviendo es el cimiento para las décadas por venir.</p>
            <p class="mt-4">Cuando entres en la posmenopausia, una microbiota saludable seguirá siendo tu aliada. <strong>Protegerá tus huesos, mantendrá tu corazón fuerte, apoyará tu función cognitiva,</strong> y seguirá inflamando menos tu cuerpo.</p>
            <p class="mt-4">La microbiota saludable es inversión en tu vejez vibrante.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Un Mensaje de Esperanza</h3>
            <p>Sé que la menopausia puede sentirse como una traición de tu cuerpo. Como si algo que siempre funcionó de cierta manera ahora estuviera trabajando en tu contra.</p>
            <p class="mt-4">Pero no lo está.</p>
            <p class="mt-4">Tu cuerpo está transformándose, sí. Está entrando en una nueva fase. Y con esta nueva fase vienen oportunidades que quizás no ves en este momento.</p>
            <p class="mt-4">Cuando entiendes lo que está sucediendo—cuando entiendes que tu microbiota es tu aliada, no tu enemiga—la menopausia se convierte en algo diferente. Se convierte en una <strong>invitación a cuidarte de maneras que quizás no lo habías hecho antes.</strong> A escuchar tu cuerpo. A honrar lo que está sucediendo.</p>
            <p class="mt-4">Eres más fuerte de lo que crees. Tu cuerpo es más sabio de lo que imaginas. Y tus microorganismos invisibles están esperando que les permitas apoyarte.</p>
            <p class="mt-4">Hazlo. Alimenta tu jardín. Calma tu mente. Escucha tu cuerpo. Y descubre cómo una microbiota saludable puede transformar no solo estos años, sino todo lo que viene después.</p>
            <p class="mt-4"><strong>Tú mereces sentirte bien. Tú mereces esta transformación.</strong></p>

---

**Título del Artículo: Guía de Infusiones Terapéuticas: Remedios Naturales para cada Necesidad**
**Resumen:** Desde calmar la ansiedad hasta mejorar el sueño o ayudar en la menopausia, las infusiones son aliadas poderosas. Descubre qué planta es la ideal para ti en esta guía completa.
**Contenido:**
            <p>Las infusiones han sido desde siempre un remedio natural para calmar cuerpo y mente. En esta guía, exploramos las <strong>mejores infusiones terapéuticas para cada necesidad,</strong> desde la ansiedad hasta el insomnio, ofreciéndote una alternativa suave y efectiva para cuidar de tu bienestar.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Infusiones para Adelgazar</h3>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Té Verde:</strong> Acelera el metabolismo, rico en antioxidantes (EGCG).</li>
                <li><strong>Cola de Caballo:</strong> Potente diurético, ayuda a eliminar líquidos retenidos.</li>
                <li><strong>Fucus:</strong> Alga rica en yodo que estimula el metabolismo tiroideo.</li>
                <li><strong>Yerba Mate:</strong> Aumenta la energía y reduce el apetito de forma natural.</li>
            </ul>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Infusiones con Efecto Diurético</h3>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Diente de León:</strong> Depurativo y diurético, apoya la función hepática.</li>
                <li><strong>Ortiga Verde:</strong> Rica en minerales, ayuda a eliminar toxinas y líquidos.</li>
                <li><strong>Abedul:</strong> Favorece la eliminación de líquidos sin perder sales minerales.</li>
                <li><strong>Té de Java:</strong> Conocido por su acción sobre la eliminación de urea y ácido úrico.</li>
            </ul>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Infusiones para Dormir Mejor</h3>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Manzanilla:</strong> Contiene apigenina, un sedante suave que calma la ansiedad.</li>
                <li><strong>Valeriana:</strong> Actúa sobre el sistema nervioso, ideal para el insomnio.</li>
                <li><strong>Tila:</strong> Relajante y antiespasmódica, perfecta antes de acostarse.</li>
                <li><strong>Melisa (Toronjil):</strong> Calma los nervios y alivia el estrés que impide dormir.</li>
                <li><strong>Pasiflora:</strong> Induce un sueño reparador sin sensación de aturdimiento.</li>
            </ul>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Infusiones para Aliviar el Dolor</h3>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Harpagofito:</strong> Antiinflamatorio natural, muy eficaz para el dolor articular.</li>
                <li><strong>Sauce Blanco:</strong> Contiene salicina, el precursor natural de la aspirina.</li>
                <li><strong>Jengibre:</strong> Alivia dolores musculares, menstruales y de garganta.</li>
                <li><strong>Cúrcuma:</strong> Potente antiinflamatorio general para todo el cuerpo.</li>
            </ul>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Infusiones para la Menopausia</h3>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Salvia:</strong> Ayuda a regular los sofocos y la sudoración excesiva.</li>
                <li><strong>Trébol Rojo:</strong> Rico en isoflavonas, fitoestrógenos que alivian síntomas.</li>
                <li><strong>Dong Quai:</strong> Conocido como el "ginseng femenino", equilibra las hormonas.</li>
                <li><strong>Cimicífuga:</strong> Eficaz para los cambios de humor, sofocos e insomnio.</li>
            </ul>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Infusiones para la Ansiedad</h3>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Lavanda:</strong> Su aroma y propiedades calman el sistema nervioso.</li>
                <li><strong>Melisa (Toronjil):</strong> Reduce el estrés, la tensión y el nerviosismo.</li>
                <li><strong>Pasiflora:</strong> Alivia la inquietud y la ansiedad generalizada.</li>
                <li><strong>Ashwagandha:</strong> Hierba adaptógena que modula la respuesta del cuerpo al estrés.</li>
            </ul>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Infusiones para Afecciones Respiratorias</h3>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Tomillo:</strong> Antiséptico y expectorante, alivia la tos y el catarro.</li>
                <li><strong>Eucalipto:</strong> Descongestionante y balsámico para las vías respiratorias.</li>
                <li><strong>Malvavisco:</strong> Suaviza y protege la garganta irritada por la tos seca.</li>
                <li><strong>Llantén:</strong> Antiinflamatorio y expectorante, útil en bronquitis y asma.</li>
            </ul>
            <h2 class="text-2xl font-bold font-montserrat mt-8 mb-4">Consejos para Preparar la Infusión Perfecta</h2>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Modo de Uso</h4>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Agua:</strong> Usa agua a punto de hervir (aprox. 90-95°C), <strong>no hirviendo a borbotones</strong> para no quemar las hojas.</li>
                <li><strong>Cantidad:</strong> Generalmente, una cucharadita de planta seca por taza (250 ml).</li>
                <li><strong>Tiempo:</strong> Deja infusionar de <strong>5 a 10 minutos con la taza tapada</strong> para no perder los aceites esenciales.</li>
            </ul>
            <h4 class="text-xl font-bold mt-4 mb-2 font-lora">Consejos Generales</h4>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Calidad:</strong> Utiliza plantas de origen ecológico o de herbolarios de confianza.</li>
                <li><strong>Interacciones:</strong> Si tomas medicación, estás embarazada o tienes una condición médica, <strong>consulta siempre con un profesional de la salud.</strong></li>
                <li><strong>Consistencia:</strong> Los efectos de las plantas suelen ser suaves y requieren constancia.</li>
            </ul>

---

**Título del Artículo: No Estoy Perdiendo la Memoria: Entendiendo el Cerebro en la Menopausia**
**Resumen:** ¿Sientes que olvidas las cosas con más frecuencia? La "niebla mental" es real, pero no significa que estés perdiendo tus capacidades. Descubre qué le ocurre a tu cerebro.
**Contenido:**
            <p>Una de las quejas más comunes y angustiantes durante la perimenopausia y la menopausia es la sensación de tener "niebla mental". De repente, olvidas por qué entraste a una habitación, no encuentras la palabra exacta que buscas o te cuesta concentrarte en una tarea que antes hacías sin esfuerzo. Lo primero que quiero que sepas es: <strong>no te estás volviendo loca y no estás perdiendo la memoria de forma irreversible.</strong></p>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">¿Qué es la Niebla Mental?</h2>
            <p>La <strong>niebla mental</strong> es un término coloquial para describir un conjunto de síntomas cognitivos que incluyen:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>Dificultad para <strong>concentrarse.</strong></li>
                <li><strong>Olvidos</strong> y lapsos de memoria a corto plazo.</li>
                <li>Menor <strong>agilidad mental.</strong></li>
                <li>Sensación de <strong>confusión</strong> o "lentitud" para procesar información.</li>
            </ul>
            <p class="mt-4">Estos síntomas pueden ser increíblemente frustrantes y afectar a tu confianza en el trabajo, en tus relaciones y en tu día a día. Muchas mujeres sienten miedo, pensando que es el inicio de un deterioro cognitivo grave. Pero en la mayoría de los casos, está <strong>directamente relacionado con los cambios hormonales</strong> de esta etapa.</p>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">El Rol del Estrógeno en tu Cerebro</h2>
            <p>El estrógeno no solo regula tu ciclo menstrual; es una <strong>hormona clave para la función cerebral.</strong> Actúa como un neuroprotector y ayuda a regular neurotransmisores como la serotonina, la dopamina y la acetilcolina, que son cruciales para el estado de ánimo, la motivación y la memoria.</p>
            <p class="mt-4">Cuando los niveles de estrógeno fluctúan y disminuyen durante la menopausia, el cerebro tiene que <strong>adaptarse a funcionar con menos cantidad</strong> de esta hormona. Este proceso de "recalibración" puede causar temporalmente los síntomas de la niebla mental. Es como si tu cerebro estuviera actualizando su sistema operativo, y durante la actualización, algunas funciones van un poco más lentas.</p>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">Estrategias para Disipar la Niebla</h2>
            <p>La buena noticia es que hay muchas cosas que puedes hacer para apoyar a tu cerebro durante esta transición y mejorar tu claridad mental:</p>
            <ol class="list-decimal list-inside space-y-2 mt-2">
                <li><strong>Prioriza el Sueño:</strong> La falta de sueño es una de las principales causas de la niebla mental. Intenta establecer una rutina de sueño regular y crea un ambiente relajante en tu dormitorio.</li>
                <li><strong>Nutrición para el Cerebro:</strong> Incorpora alimentos ricos en <strong>Omega-3</strong> (pescado azul, nueces, chía), <strong>antioxidantes</strong> (frutos rojos, verduras de hoja verde) y <strong>fitoestrógenos</strong> (soja, lino).</li>
                <li><strong>Muévete:</strong> El ejercicio regular, especialmente el entrenamiento de fuerza y el ejercicio cardiovascular, aumenta el flujo sanguíneo al cerebro y promueve la neurogénesis (creación de nuevas neuronas).</li>
                <li><strong>Gestiona el Estrés:</strong> El cortisol, la hormona del estrés, es tóxico para el cerebro. Prácticas como la meditación, el yoga, la respiración profunda o pasar tiempo en la naturaleza pueden marcar una gran diferencia.</li>
                <li><strong>Ejercita tu Mente:</strong> Mantén tu cerebro activo. Aprende algo nuevo, lee, haz crucigramas o sudokus. El desafío mental ayuda a crear nuevas conexiones neuronales.</li>
            </ol>
            <p class="mt-4">Recuerda, <strong>esta fase es temporal.</strong> Tu cerebro es increíblemente plástico y tiene la capacidad de adaptarse. Sé paciente y amable contigo misma. Lo que sientes es real, pero no define tu futuro. Con las herramientas adecuadas, puedes navegar esta etapa y salir de ella sintiéndote más clara y enfocada que nunca.</p>

---

**Título del Artículo: El Sueño Perdido: Estrategias de una Enfermera para Volver a Dormir**
**Resumen:** Despertarte en mitad de la noche empapada en sudor o dar vueltas en la cama sin poder conciliar el sueño es agotador. Aquí te comparto estrategias prácticas para recuperar tu descanso.
**Contenido:**
            <p>El insomnio y los sudores nocturnos son dos de los síntomas más disruptivos de la menopausia. No solo afectan a tu noche, sino que <strong>te roban la energía, la paciencia y la claridad mental</strong> del día siguiente. Como enfermera, sé lo crucial que es el sueño para la salud integral. Como mujer que ha pasado por ello, sé lo desesperante que puede ser no poder descansar.</p>
            <p class="mt-4">Pero no estás condenada a pasar noches en vela. Hay <strong>estrategias efectivas</strong> que puedes implementar para mejorar significativamente la calidad de tu sueño.</p>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">¿Por Qué Dormimos Peor en la Menopausia?</h2>
            <p>La <strong>caída del estrógeno y la progesterona</strong> es la principal culpable. La progesterona tiene un efecto sedante y calmante, por lo que su disminución dificulta la conciliación del sueño. El estrógeno ayuda a regular la temperatura corporal, por lo que su descenso provoca los temidos sofocos y sudores nocturnos que te despiertan bruscamente.</p>
            <p class="mt-4">Además, el aumento del <strong>cortisol (la hormona del estrés)</strong> y la mayor prevalencia de ansiedad en esta etapa también juegan un papel importante en mantenernos en estado de alerta cuando deberíamos estar relajadas.</p>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">Mi Plan de Acción para un Sueño Reparador</h2>
            <p>Aquí tienes un enfoque integral, basado en la ciencia y la experiencia, para que empieces a dormir mejor desde hoy mismo:</p>
            <h3 class="text-xl font-bold mt-4 mb-2 font-lora">1. Prepara tu Santuario del Sueño</h3>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Frío y Oscuro:</strong> Mantén tu habitación fresca (idealmente entre 18-20°C) y completamente a oscuras. Usa un antifaz si es necesario.</li>
                <li><strong>Ropa de Cama Transpirable:</strong> Opta por fibras naturales como el algodón o el lino. Ten una muda de pijama y una toalla cerca por si tienes un sudor nocturno.</li>
                <li><strong>Cero Pantallas:</strong> La luz azul de móviles, tablets y televisores inhibe la producción de melatonina, la hormona del sueño. <strong>Apaga todos los dispositivos al menos una hora antes de acostarte.</strong></li>
            </ul>
            <h3 class="text-xl font-bold mt-4 mb-2 font-lora">2. Crea un Ritual Relajante</h3>
            <p>Tu cuerpo necesita señales para entender que es hora de desconectar. Crea una rutina que te relaje 30-60 minutos antes de dormir:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Infusión Calmante:</strong> Una manzanilla, tila o melisa puede ser muy reconfortante.</li>
                <li><strong>Baño Templado:</strong> Un baño con sales de Epsom puede relajar los músculos y bajar la temperatura corporal al salir, induciendo el sueño.</li>
                <li><strong>Lectura Ligera:</strong> Lee un libro de papel, nada de pantallas.</li>
                <li><strong>Meditación o Respiración:</strong> Aplicaciones como Calm o Headspace tienen meditaciones guiadas para dormir. O simplemente practica la <strong>respiración 4-7-8</strong> (inhala 4s, sostén 7s, exhala 8s).</li>
            </ul>
            <h3 class="text-xl font-bold mt-4 mb-2 font-lora">3. Cuida tus Hábitos Diurnos</h3>
            <p>Lo que haces durante el día tiene un impacto directo en tu noche:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Luz Solar Matutina:</strong> Exponerte a la luz del sol por la mañana ayuda a regular tu ritmo circadiano.</li>
                <li><strong>Ejercicio, pero no Tarde:</strong> La actividad física es clave, pero evita el ejercicio intenso en las 3 horas previas a acostarte.</li>
                <li><strong>Ojo con la Cafeína y el Alcohol:</strong> Evita la cafeína después del mediodía. El alcohol puede ayudarte a dormirte, pero fragmenta el sueño y empeora los sofocos.</li>
                <li><strong>Cena Ligera:</strong> Evita comidas pesadas y picantes por la noche.</li>
            </ul>
            <p class="mt-4">Implementar estos cambios requiere constancia, pero los resultados merecen la pena. Si a pesar de todo, tu sueño no mejora, es fundamental que <strong>hables con tu médico</strong> para descartar otras condiciones como la apnea del sueño y valorar otras opciones terapéuticas.</p>

---

**Título del Artículo: Cuando el Miedo Paraliza: Cómo Recuperar tu Valía en la Menopausia**
**Resumen:** De repente, un día, el miedo se instala. Un miedo que no entiendes, que parece irracional. Si te sientes así, quiero que sepas algo muy importante: no estás sola y no te estás volviendo loca.
**Contenido:**
            <p>De repente, un día, el miedo se instala. Un miedo que no entiendes, que parece irracional. Miedo a conducir por la autovía, miedo a una reunión de trabajo que antes dominabas, miedo a que algo malo le pase a tus seres queridos. Si te sientes así, quiero que sepas algo muy importante: <strong>no estás sola y no te estás volviendo loca.</strong></p>
            <p class="mt-4">La menopausia es una etapa de una vulnerabilidad emocional inmensa, y la <strong>ansiedad y el miedo</strong> son dos de sus compañeros más frecuentes y silenciosos.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">La Química del Miedo en la Menopausia</h3>
            <p>El estrógeno y la progesterona no solo regulan tu ciclo menstrual; también tienen un <strong>efecto calmante sobre tu cerebro.</strong> La progesterona, por ejemplo, estimula los receptores GABA, que son como el "freno" de tu sistema nervioso. El estrógeno ayuda a regular el cortisol, la hormona del estrés.</p>
            <p class="mt-4">Cuando estas hormonas fluctúan y disminuyen, es como si <strong>tu cerebro perdiera parte de su sistema de calma natural.</strong> El "acelerador" (el cortisol, la adrenalina) toma el control con más facilidad, dejándote en un estado de alerta constante, de "lucha o huida", incluso cuando no hay un peligro real.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">El Miedo a Perder el Control y a Perdernos a Nosotras Mismas</h3>
            <p>Este cambio hormonal coincide con una etapa de la vida llena de transiciones: los hijos se van de casa, nuestros padres envejecen, la carrera profesional puede estancarse o cambiar, y nos enfrentamos a la realidad de nuestro propio envejecimiento. Es natural que surjan preguntas existenciales:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>¿Quién soy ahora</strong> que mis roles están cambiando?</li>
                <li>¿He hecho lo que <strong>realmente quería</strong> en la vida?</li>
                <li>¿Sigo siendo <strong>válida, visible, deseable?</strong></li>
            </ul>
            <p class="mt-4">El miedo, en este contexto, no es solo una reacción química. Es el eco de una <strong>profunda crisis de identidad.</strong> Es el miedo a no reconocernos en el espejo, a sentir que la mujer que éramos se ha desvanecido.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Estrategias para Calmar la Mente y Recuperar tu Poder</h3>
            <p>No podemos eliminar el miedo, pero sí podemos aprender a gestionarlo y a quitarle el poder que tiene sobre nosotras.</p>
            <ol class="list-decimal list-inside space-y-2 mt-2">
                <li><strong>Respira para Engañar a tu Cerebro:</strong> Cuando sientas ansiedad, tu respiración se acelera. Haz lo contrario de forma consciente. Inspira lentamente por la nariz durante 4 segundos, sostén la respiración 4 segundos y exhala muy despacio por la boca durante 6-8 segundos. Esto <strong>activa el nervio vago</strong> y le dice a tu cerebro: "estamos a salvo".</li>
                <li><strong>Nombra al Monstruo:</strong> En lugar de decir "estoy ansiosa", di "estoy sintiendo ansiedad". Separarte de la emoción le resta poder. Reconócela sin juicio: "Vale, aquí está el miedo a conducir otra vez. Lo siento, lo noto en el pecho, pero <strong>no soy yo. Es una sensación</strong>".</li>
                <li><strong>Reduce la Carga de Estrés Externo:</strong> Tu sistema nervioso ya está sobrecargado. <strong>Es el momento de aprender a decir "no".</strong> Simplifica tu agenda, delega tareas, pide ayuda. Proteger tu energía no es egoísmo, es una necesidad.</li>
                <li><strong>Mueve el Cuerpo para Liberar la Tensión:</strong> El ejercicio es una de las herramientas más potentes. No tiene que ser intenso. Caminar, bailar, hacer yoga o estiramientos ayuda a liberar la energía acumulada del estrés y a generar endorfinas, tus calmantes naturales.</li>
                <li><strong>Habla, Comparte, Busca Apoyo:</strong> El silencio es el mejor amigo del miedo. Hablar de lo que sientes con una amiga, tu pareja o un profesional te hará darte cuenta de que es una experiencia compartida. <strong>Sentirte comprendida es increíblemente sanador.</strong></li>
            </ol>
            <p class="mt-4">Recuperar tu valía en esta etapa no consiste en ser la mujer que eras, sino en <strong>abrazar a la mujer en la que te estás convirtiendo:</strong> más sabia, más consciente y, aunque ahora no lo parezca, mucho más fuerte. El miedo es solo una nube, no dejes que te tape el sol.</p>

---

**Título del Artículo: Tu Metabolismo en la Menopausia no está Roto, está Cambiando**
**Resumen:** Si sientes que, a pesar de comer lo mismo y moverte igual, la báscula no para de subir, no es tu imaginación. Tu metabolismo está evolucionando, y entenderlo es clave para adaptarte.
**Contenido:**
            <p>Una de las frustraciones más grandes durante la menopausia es el aumento de peso, especialmente alrededor de la cintura. Haces lo mismo de siempre, quizás incluso te esfuerzas más, pero los resultados no llegan. Es fácil pensar que tu metabolismo está "roto" o que has perdido la batalla contra la báscula. Pero la realidad es más compleja y, a la vez, más esperanzadora: <strong>tu metabolismo no está roto, simplemente está siguiendo unas nuevas reglas de juego.</strong></p>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">¿Qué le Pasa Realmente a tu Metabolismo?</h2>
            <p>Varios factores se combinan para cambiar la forma en que tu cuerpo gestiona la energía:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Caída de Estrógeno:</strong> Esta hormona influye en la distribución de la grasa. Con menos estrógeno, el cuerpo tiende a almacenar <strong>grasa de forma más visceral (en el abdomen),</strong> un patrón más similar al masculino.</li>
                <li><strong>Pérdida de Masa Muscular (Sarcopenia):</strong> A partir de los 30, perdemos masa muscular de forma natural, y este proceso se acelera en la menopausia. El músculo es metabólicamente más activo que la grasa, lo que significa que quema más calorías en reposo. <strong>Menos músculo = metabolismo basal más lento.</strong></li>
                <li><strong>Resistencia a la Insulina:</strong> Muchas mujeres se vuelven más resistentes a la insulina en esta etapa. Esto significa que el cuerpo necesita producir más insulina para gestionar el azúcar en sangre, lo que <strong>favorece el almacenamiento de grasa.</strong></li>
                <li><strong>Cambios en el Estilo de Vida:</strong> El estrés, el mal sueño y la fatiga pueden llevar a decisiones alimentarias menos saludables y a una menor motivación para hacer ejercicio, creando un círculo vicioso.</li>
            </ul>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">Las Nuevas Reglas del Juego: Cómo Adaptarte</h2>
            <p>Si las reglas han cambiado, nuestra estrategia también debe hacerlo. Olvídate de las dietas restrictivas y el cardio interminable. Es hora de trabajar <strong><em>con</em> tu cuerpo, no <em>contra</em> él.</strong></p>
            <h3 class="text-xl font-bold mt-4 mb-2 font-lora">1. Prioriza la Proteína</h3>
            <p>La proteína es tu mejor aliada. Ayuda a <strong>mantener y construir masa muscular, aumenta la saciedad</strong> (te sientes llena por más tiempo) y tiene un mayor efecto térmico (tu cuerpo gasta más energía en digerirla). Intenta incluir una fuente de proteína en cada comida: huevos, pollo, pescado, legumbres, tofu, yogur griego.</p>
            <h3 class="text-xl font-bold mt-4 mb-2 font-lora">2. Abraza el Entrenamiento de Fuerza</h3>
            <p>Si solo puedes hacer un tipo de ejercicio, que sea este. Levantar pesas (o usar tu propio peso corporal) es la <strong>forma más eficaz de combatir la sarcopenia.</strong> Construir músculo es como subir el "motor" de tu metabolismo. No necesitas convertirte en culturista; 2-3 sesiones a la semana pueden marcar una diferencia abismal.</p>
            <h3 class="text-xl font-bold mt-4 mb-2 font-lora">3. No le Tengas Miedo a la Grasa (Saludable)</h3>
            <p>Las grasas saludables (aguacate, aceite de oliva, frutos secos, semillas) son esenciales para la producción de hormonas y ayudan a mantenerte saciada y a estabilizar el azúcar en sangre. Son densas en calorías, así que controla las porciones, pero no las elimines.</p>
            <h3 class="text-xl font-bold mt-4 mb-2 font-lora">4. Carbohidratos Inteligentes</h3>
            <p>No tienes que eliminar los carbohidratos, pero sí elegirlos sabiamente. Opta por <strong>carbohidratos complejos y ricos en fibra</strong> (verduras, frutas, legumbres, granos integrales) que liberan energía lentamente y no disparan la insulina. Limita los azúcares y harinas refinadas.</p>
            <h3 class="text-xl font-bold mt-4 mb-2 font-lora">5. Gestiona el Estrés y el Sueño</h3>
            <p>Un cortisol elevado y un mal descanso <strong>promueven el almacenamiento de grasa abdominal.</strong> Priorizar técnicas de relajación y una buena higiene del sueño es tan importante como lo que comes o cuánto te mueves.</p>
            <p class="mt-4">Adaptarse a estos cambios requiere un cambio de mentalidad. No se trata de castigarte, sino de <strong>nutrirte y fortalecerte.</strong> Estás en una nueva etapa que pide un nuevo enfoque, uno más inteligente y compasivo con tu cuerpo.</p>

---

**Título del Artículo: Resistencia a la Insulina: El Saboteador Silencioso en la Menopausia**
**Resumen:** Detrás del aumento de peso, la fatiga y los antojos de azúcar podría esconderse un enemigo invisible: la resistencia a la insulina. Entender qué es y cómo combatirla es clave para tu salud.
**Contenido:**
            <p>En la conversación sobre la salud en la menopausia, hablamos mucho de estrógenos y progesterona, pero a menudo se nos olvida una hormona igualmente crucial: <strong>la insulina.</strong> Durante esta transición, muchas mujeres desarrollan, sin saberlo, <strong>resistencia a la insulina,</strong> una condición que puede sabotear silenciosamente sus esfuerzos por sentirse bien y mantenerse saludables.</p>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">¿Qué es la Resistencia a la Insulina?</h2>
            <p>Imagina que la insulina es una llave. Su trabajo es abrir la "puerta" de tus células para que la glucosa (el azúcar de la sangre) pueda entrar y ser usada como energía. En una persona con resistencia a la insulina, las "cerraduras" de las células se vuelven menos sensibles. <strong>La llave (insulina) no funciona bien.</strong></p>
            <p class="mt-4">Como respuesta, el páncreas trabaja horas extras para producir más y más insulina, intentando forzar la apertura de esas puertas. Este <strong>exceso de insulina en la sangre (hiperinsulinemia)</strong> es el verdadero problema. ¿Por qué?</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Promueve el Almacenamiento de Grasa:</strong> La insulina es una hormona de almacenamiento. Cuando sus niveles son altos, le dice a tu cuerpo que almacene grasa, especialmente en la zona abdominal.</li>
                <li><strong>Causa Antojos y Fatiga:</strong> A pesar de tener mucha glucosa en la sangre, tus células no la están recibiendo bien, por lo que te sientes cansada y con antojos de más azúcar, creando un ciclo vicioso.</li>
                <li><strong>Aumenta la Inflamación:</strong> Niveles altos de insulina son pro-inflamatorios y pueden empeorar dolores articulares y otros síntomas.</li>
                <li><strong>Es un Precursor de Enfermedades:</strong> La resistencia a la insulina no tratada es el camino hacia el síndrome metabólico, la diabetes tipo 2 y un mayor riesgo de enfermedades cardiovasculares.</li>
            </ul>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">¿Por Qué Ocurre en la Menopausia?</h2>
            <p>La caída de estrógenos parece jugar un papel directo en hacer que las células sean menos sensibles a la insulina. Además, la pérdida de masa muscular y el aumento de la grasa visceral contribuyen significativamente a este problema.</p>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">Claves para Re-sensibilizar tus Células a la Insulina</h2>
            <p>La buena noticia es que <strong>la resistencia a la insulina es reversible</strong> en gran medida a través de cambios en el estilo de vida. El objetivo es simple: <strong>necesitamos que nuestro páncreas no tenga que gritar (producir tanta insulina).</strong></p>
            <ol class="list-decimal list-inside space-y-2 mt-2">
                <li><strong>Reduce el Azúcar y los Refinados:</strong> Este es el paso más importante. Limita drásticamente el consumo de azúcares añadidos, bebidas azucaradas, harinas blancas, pan, pasta y arroz blanco. Estos alimentos provocan grandes picos de glucosa e insulina.</li>
                <li><strong>Construye Músculo:</strong> El músculo es el mayor "consumidor" de glucosa de tu cuerpo. Cuanta más masa muscular tengas, más lugares tendrá la glucosa para ir sin necesidad de tanta insulina. <strong>El entrenamiento de fuerza es fundamental.</strong></li>
                <li><strong>Añade Fibra a tus Comidas:</strong> La fibra (presente en verduras, frutas, legumbres y granos integrales) ralentiza la absorción de azúcar, evitando los picos bruscos de glucosa. ¡Que las verduras sean las protagonistas de tu plato!</li>
                <li><strong>Incorpora Ayuno Intermitente (con precaución):</strong> Darle a tu cuerpo descansos de la digestión (por ejemplo, un ayuno de 12-14 horas durante la noche) puede ayudar a reducir los niveles de insulina. Es importante empezar poco a poco y escuchar a tu cuerpo.</li>
                <li><strong>Camina Después de Comer:</strong> Un paseo de 10-15 minutos después de las comidas principales ayuda a tus músculos a captar la glucosa de la sangre, reduciendo la necesidad de insulina.</li>
                <li><strong>El Vinagre de Manzana puede Ayudar:</strong> Tomar una cucharada de vinagre de manzana diluida en agua antes de una comida rica en carbohidratos ha demostrado mejorar la sensibilidad a la insulina.</li>
            </ol>
            <p class="mt-4">Abordar la resistencia a la insulina no solo te ayudará a controlar tu peso, sino que mejorará tus niveles de energía, reducirá la inflamación y protegerá tu salud a largo plazo. Es una de las <strong>intervenciones más poderosas</strong> que puedes hacer por tu bienestar en esta nueva etapa.</p>

---

**Título del Artículo: La Revolución de tus Hormonas: Guía para la Perimenopausia**
**Resumen:** Antes de la última regla, hay un período de transición llamado perimenopausia. Entender esta fase de fluctuaciones hormonales es clave para navegarla con menos incertidumbre.
**Contenido:**
            <p>Mucha gente piensa que la menopausia llega de un día para otro, pero la realidad es que es un proceso gradual. La antesala, conocida como <strong>perimenopausia</strong>, puede durar varios años y es a menudo la etapa más confusa y sintomática para manyas mujeres. Es la "revolución" antes de la calma, y <strong>entenderla te dará el poder de manejarla.</strong></p>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">¿Qué es Exactamente la Perimenopausia?</h2>
            <p>La perimenopausia significa "alrededor de la menopausia" y es el tiempo de transición antes de tu última menstruación. Puede comenzar en tus 40, o incluso a finales de tus 30. Durante esta fase, tus ovarios comienzan a producir estrógeno de manera más errática. <strong>No es una disminución lineal y constante; son más bien picos y valles.</strong> Un mes puedes tener niveles de estrógeno muy altos, y al siguiente, muy bajos. La producción de progesterona también disminuye de manera más constante.</p>
            <p class="mt-4">Este caos hormonal es el responsable de la aparición de muchos de los síntomas que asociamos con la menopausia.</p>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">Los Síntomas más Comunes de la Perimenopausia</h2>
            <p>Debido a las fluctuaciones, los síntomas pueden aparecer y desaparecer. Algunos de los más frecuentes son:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Ciclos Menstruales Irregulares:</strong> Es el sello distintivo. Tus ciclos pueden acortarse, alargarse, ser más abundantes o más ligeros. Puedes saltarte un período y luego tener dos muy seguidos.</li>
                <li><strong>Síndrome Premenstrual (SPM) Agravado:</strong> La irritabilidad, la hinchazón y la sensibilidad en los senos pueden volverse mucho más intensas.</li>
                <li><strong>Problemas de Sueño:</strong> Dificultad para conciliar el sueño o mantenerlo, a menudo sin estar directamente relacionados con sofocos todavía.</li>
                <li><strong>Cambios de Humor:</strong> La ansiedad, la irritabilidad y la sensación de estar al borde de las lágrimas son muy comunes debido a las fluctuaciones hormonales.</li>
                <li><strong>Primeros Sofocos:</strong> Pueden empezar a aparecer de forma leve y esporádica.</li>
                <li><strong>Menor Libido y Sequedad Vaginal:</strong> La disminución de estrógenos empieza a afectar a los tejidos vaginales.</li>
                <li><strong>Fatiga y Niebla Mental:</strong> La sensación de estar agotada y tener dificultad para concentrarse también puede comenzar en esta etapa.</li>
            </ul>
            <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">Navegando la Transición: ¿Qué Puedes Hacer?</h2>
            <p>Saber que estás en la perimenopausia es el primer paso. No estás enferma, tu cuerpo está cambiando. Aquí hay algunas estrategias clave para esta fase:</p>
            <ol class="list-decimal list-inside space-y-2 mt-2">
                <li><strong>Registra tus Síntomas:</strong> Llevar un diario de tus ciclos y síntomas puede ayudarte a ti y a tu médico a entender mejor lo que está pasando.</li>
                <li><strong>Adapta tu Estilo de Vida:</strong> Lo que funcionaba antes puede que ya no sea suficiente. Es el momento ideal para empezar a <strong>priorizar el sueño, la nutrición equilibrada</strong> (especialmente proteínas y fibra), el <strong>ejercicio regular</strong> (¡fuerza!) y la <strong>gestión del estrés.</strong></li>
                <li><strong>Habla con tu Médico:</strong> No minimices tus síntomas. Habla con tu ginecólogo o médico de cabecera. Pueden ofrecerte opciones que van desde cambios en el estilo de vida hasta terapia hormonal de baja dosis si es apropiado para ti, para suavizar la transición.</li>
                <li><strong>Busca Información y Apoyo:</strong> Entender lo que te pasa reduce la ansiedad. Leer libros, seguir a profesionales de confianza y hablar con otras mujeres que están pasando por lo mismo es increíblemente valioso.</li>
            </ol>
            <p class="mt-4">La perimenopausia es una invitación a prestarle más atención a tu cuerpo y a tus necesidades. Es un ensayo general para la menopausia que te da la oportunidad de construir una base sólida de hábitos saludables que te servirán para el resto de tu vida. No es una etapa fácil, pero con información y las herramientas adecuadas, puedes navegarla con <strong>mayor confianza y serenidad.</strong></p>

---

**Título del Artículo: La Menopausia y el Entorno Familiar: Cómo Involucrar a tu Familia**
**Resumen:** Involucrar a tu familia no es un signo de debilidad, es un acto de inteligencia emocional y amor. Aprende a construir un puente de comprensión para que puedan apoyarte.
**Contenido:**
            <p>La menopausia se vive en primera persona, pero sus efectos se expanden como una onda por todo el ecosistema familiar. Tu irritabilidad, tu cansancio, tu tristeza o tu niebla mental no te afectan solo a ti. Afectan a tu pareja, a tus hijos, a la dinámica del hogar. Sin embargo, sigue siendo un tema tabú, algo que sufrimos en silencio, y <strong>ese silencio es lo que más daño hace.</strong></p>
            <p class="mt-4">Involucrar a tu familia no es un signo de debilidad, es un <strong>acto de inteligencia emocional y amor.</strong> Es construir un puente de comprensión para que puedan apoyarte y para que vuestra relación salga fortalecida de esta transición.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">El Impacto en la Pareja: "No sé qué le pasa"</h3>
            <p>Para muchas parejas, esta etapa es un campo de minas. La disminución de la libido, la sequedad vaginal, los cambios de humor y la fatiga pueden crear una distancia enorme. Tu pareja puede sentirse <strong>confundida, rechazada o impotente,</strong> sin entender que no es algo personal contra ella, sino el resultado de una revolución hormonal.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">El Impacto en los Hijos: "Mamá está rara"</h3>
            <p>Los hijos, especialmente los adolescentes, pueden percibir tus cambios como algo personal. Tu <strong>menor paciencia, tus olvidos o tu necesidad de estar sola</strong> pueden interpretarlos como enfado o falta de interés en ellos. Si en casa conviven la adolescencia y la menopausia, el choque de revoluciones hormonales puede ser explosivo.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Cómo Abrir la Conversación: Un Guion para Empezar</h3>
            <p>Hablar del tema puede ser incómodo, pero es esencial. <strong>No esperes a estar en medio de una discusión.</strong> Busca un momento de calma y empieza la conversación. Aquí tienes algunas ideas:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li><strong>Edúcate tú primero:</strong> Cuanto mejor entiendas tú lo que te pasa, mejor podrás explicarlo. Lee libros, escucha podcasts, busca información de calidad.</li>
                <li><strong>Usa el "Yo siento":</strong> En lugar de acusar ("Nunca me entiendes"), expresa tus sentimientos ("Últimamente me siento muy irritable y cansada, y me frustra no tener la misma paciencia de antes").</li>
                <li><strong>Explica la parte física:</strong> A menudo es más fácil empezar por lo tangible. "Estoy en una etapa llamada perimenopausia. Mis hormonas, como el estrógeno, están cambiando mucho. Esto afecta a mi sueño, mi temperatura corporal y mi energía. Por eso a veces me ves tan agotada o necesito abrir las ventanas en invierno".</li>
                <li><strong>Pide lo que necesitas de forma concreta:</strong> No esperes que adivinen. Sé específica. "Lo que más me ayudaría es que tuvieras un poco más de paciencia si estoy olvidadiza", o "Necesito 15 minutos para mí cuando llego del trabajo para poder recargar pilas", o "Un abrazo sin que me preguntes qué me pasa sería maravilloso ahora mismo".</li>
                <li><strong>Comparte recursos con ellos:</strong> Si te sientes cómoda, puedes compartir un artículo o un vídeo corto que explique de forma sencilla qué es la menopausia. Esto les da una fuente de información objetiva y les muestra que no es algo que "te estás inventando".</li>
            </ul>
            <p class="mt-4">Convertir a tu familia en tu equipo de apoyo transforma la menopausia de una batalla solitaria a un desafío compartido. Requiere valentía por tu parte para mostrarte vulnerable, y requiere empatía por su parte para escuchar. Pero el resultado —<strong>una conexión más profunda y un hogar más compasivo</strong>— merece absolutamente la pena. No tienes que protegerlos de tu realidad; tienes que invitarlos a comprenderla.</p>

---

**Título del Artículo: Cuando la Adolescencia y la Menopausia Chocan en Casa**
**Resumen:** Una madre navegando la perimenopausia y un hijo en plena adolescencia. Descubre estrategias para que el choque de revoluciones hormonales no haga explotar tu hogar.
**Contenido:**
            <p>Hay una <strong>tormenta perfecta</strong> que se gesta en muchos hogares y de la que se habla muy poco: la colisión de dos de las mayores revoluciones hormonales de la vida bajo un mismo techo. Por un lado, una madre navegando las turbulentas aguas de la perimenopausia. Por otro, un hijo o hija en plena efervescencia adolescente.</p>
            <p class="mt-4">El resultado puede ser un campo de batalla emocional donde los cambios de humor, la irritabilidad y la incomprensión están a la orden del día. Si te encuentras en esta situación, respira hondo. <strong>No es tu familia la que está rota, es la química la que está revolucionada.</strong></p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Dos Mundos en Colisión</h3>
            <p>La madre perimenopáusica lucha con la <strong>fatiga, la niebla mental, la ansiedad y una mecha mucho más corta</strong> debido a la fluctuación del estrógeno y la progesterona. Siente que pierde el control de su propio cuerpo y sus emociones.</p>
            <p class="mt-4">El adolescente, por su parte, está inundado de testosterona o estrógeno, lo que impulsa la <strong>búsqueda de independencia, la impulsividad y una montaña rusa emocional.</strong> Su cerebro está en plena remodelación, especialmente el córtex prefrontal, responsable del juicio y el control de impulsos.</p>
            <p class="mt-4">¿El resultado? Una madre que necesita calma y se siente incomprendida, y un adolescente que necesita espacio y se siente controlado. Es la receta para el conflicto diario.</p>
            <h3 class="text-2xl font-bold font-montserrat mt-6 mb-3">Estrategias de Supervivencia (y Conexión)</h3>
            <p>Sobrevivir a esta etapa no se trata de ganar batallas, sino de <strong>construir puentes.</strong></p>
            <ol class="list-decimal list-inside space-y-2 mt-2">
                <li><strong>Ponle Nombre y Apellido:</strong> Habla con tus hijos (si tienen la edad adecuada para entenderlo) de forma sencilla. No necesitas dar una clase de biología, pero sí puedes decir: "Cariño, estoy en una etapa de cambios hormonales, como tú. A veces me siento más cansada o irritable, y no es por ti. Necesito un poco más de paciencia". <strong>Validar su experiencia ("sé que para ti también es una etapa de muchos cambios")</strong> crea empatía.</li>
                <li><strong>Crea Zonas de Tregua:</strong> Estableced momentos o lugares en casa donde las discusiones están prohibidas. Puede ser la mesa durante la cena. El objetivo es tener espacios para conectar sin la tensión del conflicto.</li>
                <li><strong>Prioriza tu Autocuidado (de Verdad):</strong> No es un lujo, es tu chaleco salvavidas. Si tú estás desbordada, no podrás gestionar los desafíos de la adolescencia. <strong>Delega, pide ayuda, simplifica.</strong> Diez minutos de silencio con una infusión pueden ser más reparadores que una hora de discusión.</li>
                <li><strong>Responde en Lugar de Reaccionar:</strong> Cuando sientas que la ira sube, aplica la regla de los 90 segundos. Es el tiempo que tarda la química de la emoción en disiparse. Respira hondo, sal de la habitación si es necesario, y responde cuando la ola emocional haya pasado.</li>
                <li><strong>Busca el Humor:</strong> A veces, reírse de lo absurdo de la situación es la mejor terapia. Reconocer juntas que la casa es "Hormone Central" puede quitarle mucho hierro al asunto.</li>
            </ol>
            <p class="mt-4">Esta etapa pasará. Es un túnel, pero al final hay luz. Al reconocer que ambos estáis navegando una tormenta hormonal, podéis convertiros en aliados en lugar de adversarios. Y quizás, solo quizás, descubrir una nueva forma de conectar basada en una comprensión más profunda y compasiva de lo que significa estar en plena transformación.</p>

--- FIN DEL CONTENIDO DEL BLOG ---
`;

const Chatbot: React.FC<ChatbotProps> = ({ closeChat }) => {
    const [messages, setMessages] = useState<Message[]>(() => {
        try {
            const savedMessages = sessionStorage.getItem('chatHistory');
            return savedMessages 
                ? JSON.parse(savedMessages) 
                : [{ text: 'Hola! Soy el asistente virtual de Mila Ciudad. ¿En qué puedo ayudarte hoy sobre **salud y bienestar**?', sender: 'bot' }];
        } catch (error) {
            console.error('Failed to parse chat history from sessionStorage', error);
            return [{ text: 'Hola! Soy el asistente virtual de Mila Ciudad. ¿En qué puedo ayudarte hoy sobre **salud y bienestar**?', sender: 'bot' }];
        }
    });

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const conversationStarters = [
        "¿Qué es la perimenopausia?",
        "Consejos para dormir mejor",
        "¿Qué es la resistencia a la insulina?",
        "¿Ofreces coaching personalizado?"
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

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
            
            const systemInstruction = `Eres un asistente virtual para el sitio web de Mila Ciudad, coach de salud y bienestar.
            Tu propósito es ayudar a los usuarios con preguntas sobre salud activa, menopausia y bienestar general, reflejando la filosofía de Mila: "No te doblegues".
            - Sé empática, positiva y alentadora.
            - Ofrece información general y consejos de estilo de vida.
            - NO proporciones consejo médico específico. Si te piden consejo médico, recomienda SIEMPRE consultar a un profesional de la salud.
            - El sitio web tiene un blog muy completo, cuyo contenido se proporciona a continuación. Debes usar esta información para responder a las preguntas de los usuarios. Cuando respondas, sintetiza la información relevante de los artículos. Si es útil, puedes mencionar el título del artículo de donde sacaste la información. No te limites a decir "hay un artículo sobre eso", sino que extrae la información y responde directamente.
            - Cuando sea apropiado, menciona que Mila Ciudad te acompaña en esta transición con su método "MILACIUDAD+". Habla siempre en tercera persona sobre Mila (ella te acompaña, no "te acompañamos"). Puedes sugerir que exploren la sección "Mi Método" para más detalles.
            - **Mila también es autora del libro "Rescatando Padres".** Es una guía esencial para padres, abuelos y educadores que buscan afrontar la crianza con calma y seguridad.
                - **Si un usuario pregunta sobre crianza, salud infantil, primeros auxilios para niños, desarrollo emocional, rabietas, sueño infantil, alimentación o adaptación escolar, debes mencionar el libro como un recurso clave.**
                - **El libro contiene:** Protocolos claros para los primeros días del bebé, una guía completa de PRIMEROS AUXILIOS PEDIÁTRICOS (atragantamientos, golpes, quemaduras, etc.), estrategias para el desarrollo emocional, y consejos sobre vida familiar y uso de pantallas.
                - **Dónde comprar y para quién es ideal:** El libro se vende en Amazon. Es uno de los mejores regalos para padres primerizos, para reuniones de baby shower y es un recurso valioso para toda la vida.
                - **Tu objetivo al hablar del libro es transmitir que es una herramienta práctica que transforma la duda en seguridad y la preocupación en calma.**
            - Mantén las respuestas relativamente concisas y fáciles de entender.
            - Puedes usar formato simple como listas con asteriscos (*) o negritas (**texto**) para mejorar la legibilidad.
            ${blogArticles}
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: text,
                config: {
                    systemInstruction,
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
        <div className="fixed bottom-8 right-8 w-[calc(100%-4rem)] max-w-md h-[70vh] max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col font-inter z-50 animate-fade-in-up">
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