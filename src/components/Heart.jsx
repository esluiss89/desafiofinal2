/**
 * Componente funcional que representa un icono de corazón.
 * 
 * @param {object} props - Las propiedades del componente.
 * @param {boolean} props.filled - Indica si el corazón está relleno o no.
 * @returns {JSX.Element} El componente Heart como un elemento JSX.
 */
export default function Heart({ filled }) {
  return (
    // Crea un contenedor sin etiqueta para el SVG y otros elementos JSX.
    <>
      {/* Crea un elemento SVG con un ancho de 40 píxeles y una vista de 24x24. */}
      <svg width="40px" viewBox="0 0 24 24">
        {/* Crea un elemento "path" que define la forma del corazón. 
            El color de relleno del corazón depende del valor de la propiedad "filled". */}
        <path
          fill={filled ? "red" : "white"}
          d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
        />
      </svg>
    </>
  );
}
