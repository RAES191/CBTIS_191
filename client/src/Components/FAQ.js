import React from 'react';
import Faq from 'react-faq-component';
import '../Styles/FAQ.css';  // Asegúrate de que este archivo contenga los nuevos estilos.

const data = {
    title: "Preguntas frecuentes",
    rows: [
        {
            title: "¿Cómo puedo ver el historial de asistencia de mi hijo?",
            content: `Para ver el historial de asistencia de su hijo, inicie sesión en el portal de padres con sus credenciales. Luego, navegue a la sección de "Asistencia" donde podrá ver el historial de las horas de entrada y salida de su hijo.`,
        },
        {
            title: "¿Qué hago si no puedo acceder al portal de padres?",
            content:
                "Si tiene problemas para acceder al portal de padres, asegúrese de estar usando las credenciales correctas. Si aún tiene dificultades, puede contactar al soporte técnico de la escuela enviando un correo electrónico a soporte@cbtis191.gob.mx o llamando al 766 5454 5252.",
        },
        {
            title: "¿Con qué frecuencia se actualiza la información de asistencia?",
            content: `La información de asistencia se actualiza en tiempo real cada vez que su hijo usa el sistema de entrada en la escuela. Puede ver los datos actualizados inmediatamente en el portal de padres.`,
        },
        {
            title: "¿Cómo se garantiza la privacidad de la información de mi hijo?",
            content: `La privacidad y seguridad de la información de su hijo es nuestra máxima prioridad. Utilizamos tecnologías de encriptación avanzadas para proteger los datos y asegurarnos de que solo los padres y el personal autorizado de la escuela puedan acceder a la información de asistencia.`,
        },
    ],
};

const styles = {
    bgColor: 'white', // Fondo blanco para claridad
    titleTextColor: "#b40f0f", // Color del título
    rowTitleColor: "#400000", // Color del texto de las preguntas
    rowTitleTextSize: '18px', // Tamaño del texto de las preguntas
    rowContentColor: '#333333', // Color del contenido de las respuestas
    rowContentTextSize: '16px', // Tamaño del texto de las respuestas
    arrowColor: "#b40f0f", // Color de la flecha
    transitionDuration: "0.3s", // Duración de la transición de expansión/contracción
    rowContentPaddingTop: '10px', // Padding superior en el contenido
    rowContentPaddingBottom: '10px', // Padding inferior en el contenido
    rowContentPaddingLeft: '50px', // Aumentar el padding izquierdo para legibilidad
};

const config = {
    animate: true,
    arrowIcon: "▼", // Flecha personalizada para expandir/contraer
    tabFocus: true
};

function FAQ() {
    return (
        <div className="faq-section">
            <Faq data={data} styles={styles} config={config} />
        </div>
    );
}

export default FAQ;
