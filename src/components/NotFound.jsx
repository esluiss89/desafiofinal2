// Importamos React y el componente Link de react-router-dom
import React from 'react';
import { Link } from 'react-router-dom';

// Importamos el archivo CSS para los estilos de este componente
import './NotFound.css';

// Definimos una función flecha llamada "NotFound"
const NotFound = () => {
    return (
        <div className="not-found"> {/* Agregamos la clase "not-found" al div */}
            <h1>502 - Página no encontrada</h1> {/* Agregamos un encabezado h1 con el mensaje de error */}
            <p>Lo sentimos, la página que estás buscando no se encontró.</p> {/* Agregamos un párrafo con el mensaje de error */}
            <Link to="/">Volver a la página de inicio</Link> {/* Agregamos un enlace para volver a la página de inicio */}
        </div>
    );
}

// Exportamos la función "NotFound" para que pueda ser utilizada por otros componentes
export default NotFound;
