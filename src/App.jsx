// Importamos React y las funciones useState, BrowserRouter, Routes y Route de react-router-dom
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importamos los componentes Home, Login, Favoritos y NotFound
import Home from "./components/Home";
import Login from "./components/Login";
import Favoritos from "./components/Favoritos";
import NotFound from "./components/NotFound";

// Importamos las credenciales de Firebase y las funciones necesarias para manejar la autenticación
import { firebaseApp } from "./credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Importamos el archivo CSS para los estilos de la aplicación
import "./App.css";

// Importamos el componente Footer
import Footer from "./components/Footer";

// Obtenemos una instancia del objeto auth de Firebase
const auth = getAuth(firebaseApp)

// Definimos una función llamada "App"
function App() {
  const [user, setUser] = useState(null); // Definimos el estado "user" y lo inicializamos como null

  // Utilizamos la función onAuthStateChanged para detectar los cambios en la autenticación de Firebase
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      setUser(firebaseUser); // Si el usuario está autenticado, lo asignamos al estado "user"
    } else {
      setUser(null); // Si no está autenticado, asignamos null al estado "user"
    }
  });

  // Renderizamos el componente principal de la aplicación
  return (
    <div className="container"> {/* Agregamos la clase "container" al div */}
      <BrowserRouter> {/* Agregamos el componente BrowserRouter */}
        <Routes> {/* Agregamos el componente Routes */}
          <Route
            path="/"
            element={user ? <Home correoUsuario={user.email} /> : <Login />} // Si el usuario está autenticado, mostramos el componente Home con su correo electrónico. Si no está autenticado, mostramos el componente Login
            exact
          />
          <Route path="/favoritos" element={<Favoritos />} /> {/* Agregamos la ruta para el componente Favoritos */}
          <Route path="*" element={<NotFound />} /> {/* Agregamos la ruta para el componente NotFound */}
        </Routes>
      </BrowserRouter>
      <Footer /> {/* Agregamos el componente Footer */}
    </div>
  );
}

export default App; // Exportamos la función "App" para que pueda ser utilizada por otros componentes

