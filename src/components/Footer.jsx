import React from 'react';
import './Footer.css';

/**
 * Componente funcional que representa el pie de página de la aplicación.
 * 
 * @returns {JSX.Element} El componente Footer como un elemento JSX.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>Todos los derechos reservados &copy; 2023</p>
          </div>
          <div className="col-md-6">
            <p>Contáctanos:</p>
            <p><strong>Correo:</strong> deliciascecy@tusitio.com</p>
            <p><strong>Teléfono:</strong> +1 (555) 567-5432</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
