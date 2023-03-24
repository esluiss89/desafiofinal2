import React, { useState } from 'react'
import Uno from '../images/baner1.jpg'
import Dos from '../images/baner2.jpg'
import Tres from '../images/baner3.jpg'
import Cuatro from '../images/baner4.jpg'
import '../App.css';
import './Login.css';

import { firebaseApp } from "../credenciales"

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(firebaseApp)

const Login = () => {
  // Define el estado local "registrando" y su setter
  const [registrando, setRegistrando] = useState(false)

  // Define la función handlerSubmit para manejar el envío del formulario
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    // Si se está registrando un nuevo usuario, llama a la función "createUserWithEmailAndPassword" de Firebase
    if (registrando) {
      await createUserWithEmailAndPassword(auth, correo, contraseña)
    }
    // Si no, llama a la función "signInWithEmailAndPassword" de Firebase para autenticar al usuario existente
    else {
      await signInWithEmailAndPassword(auth, correo, contraseña)
    }
  }

  return (
<div className="row container">
  {/* div de la sección de la cabecera */}
  <div className='hero text-center m-2 p-2 login-header'>
    <h1 className='color-text login-title'>DeliciasCecy</h1>
    <h4 className='login-subtitle'>¡Tu mejor lugar para Crear tu pastel!</h4>
  </div>

  {/* div de la sección del carrusel */}
  <div className="col-12 col-md-6 m-2 mt-4 carrusel-section">
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      {/* div de las imágenes del carrusel */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={Uno} alt="" className='tamaño-imagen' />
        </div>
        <div className="carousel-item">
          <img src={Dos} alt="" className='tamaño-imagen' />
        </div>
        <div className="carousel-item">
          <img src={Tres} alt="" className='tamaño-imagen' />
        </div>
        <div className="carousel-item">
          <img src={Cuatro} alt="" className='tamaño-imagen' />
        </div>
      </div>
      {/* botones de control del carrusel */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  </div>
  {/* div del formulario de inicio de sesión o registro */}
  <div className="col-12 col-md-5 m-2 login-form">
    <div>
      {/* título del formulario */}
      <h1 className='text-center'>{registrando ? "Registrate" : "Inicia sesión"}</h1>
      {/* formulario */}
      <form className="" onSubmit={handlerSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Ingresar Correo"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Ingresar Contraseña"
            id="password"
          />
        </div>
        {/* botón para enviar el formulario */}
        <button type="submit" className="btn btn-warning form-control mt-2">
          {registrando ? "Registrate" : "Inicia sesión"}
        </button>
        {/* botón para cambiar entre registro e inicio de sesión */}
        <button
          className="btn btn-secondary form-control mt-2"
          onClick={() => setRegistrando(!registrando)}
        >
          {registrando
                ? "Ya tienes cuenta? Inicia sesion"
                : "No tienes cuenta? Registrate."}
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}

export default Login