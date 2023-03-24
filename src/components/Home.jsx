import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import perfil from '../images/perfil.gif';
import { firebaseApp } from '../credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore';

// Inicializa las instancias de autenticación y base de datos
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {

  const [subId] = useState();
  const [archivoUrl, setArchivoUrl] = React.useState("");
  const [docus, setDocus] = React.useState([]);
  const [filterDatos] = useState("");

  // Función para manejar la carga de archivos
  const archivoHandler = async (e) => {
    const archivo = e.target.files[0];
    const storageRef = firebaseApp.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("archivo cargado:", archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);
  }

  // Función para guardar o actualizar la información de un archivo en la base de datos
  const guardarInfo = async (e) => {
    e.preventDefault()
    const nombreArchivo = e.target.nombre.value;
    const descripcion = e.target.descripcion.value;
    const coleccionRef = firebaseApp.firestore().collection("archivos");
    await coleccionRef.doc(nombreArchivo).set({ nombre: nombreArchivo, descripcion: descripcion, url: archivoUrl });
    console.log("archivo cargado:", nombreArchivo, descripcion, "ulr:", archivoUrl);
  }

  // Función para ordenar y filtrar los archivos
  let orderFilter = (e) => {
    let listUpdate;
    if (e.target.value === "") {
      setDocus(docus);
    } else if (e.target.value === "az") {
      listUpdate = [...docus].sort((a, b) => a.nombre > b.nombre ? 1 : -1);
      setDocus(listUpdate);
    } else if (e.target.value === "za") {
      listUpdate = [...docus].sort((a, b) => a.nombre > b.nombre ? -1 : 1);
      setDocus(listUpdate);
    }
  }

  // Función para eliminar un archivo de la base de datos
  const deleteUsuario = async (id) => {
    // Se muestra una confirmación antes de eliminar el archivo
    const confirmacion = window.confirm('¿Está seguro de que desea eliminar este archivo?');
    if (!confirmacion) return;

    // Se obtiene la referencia a la colección de archivos
    const colRef = collection(db, "archivos");
    try {
      // Se elimina el documento con el ID proporcionado
      await deleteDoc(doc(colRef, id));
      console.log(`Archivo con id ${id} eliminado correctamente.`);
    } catch (error) {
      console.error(`Error al eliminar el archivo con id ${id}: ${error}`);
    }
  };


  // Función que se ejecuta una sola vez para obtener la lista de archivos desde la base de datos
  useEffect(() => {
    async function fetchData() {
      const docusList = await firebaseApp.firestore().collection("archivos").get();
      setDocus(docusList.docs.map((doc) => doc.data()));
    }
    fetchData();
  }, []);

  return (
    <div className="container ">
      <div className='row'>
        <div className='col-12'>
          {/* Barra de navegación de la aplicación */}
          <nav className="navbar navbar-expand-lg navbar-light color-text d-flex justify-content-between align-items-cente my-4">
            <h1>DeliciasCecy</h1>
            <div>
              {/* Botón para desplegar la lista de opciones de navegación */}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              {/* Lista de opciones de navegación */}
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  {/* Opción "Home" */}
                  <li className="nav-link active" aria-current="page">
                    <Link to="/">
                      <h4>Home</h4>
                    </Link>
                  </li>
                  {/* Opción "Mis Favoritos" */}
                  <li className="nav-link active" aria-current="page">
                    <Link to="/src/components/Favoritos.jsx">
                      <h4>Mis Favoritos</h4>
                    </Link>
                  </li>
                  {/* Opción "Cerrar Sesión" */}
                  <li className="nav-link active" aria-current="page">
                    <Link to="/">
                      <h4 onClick={() => signOut(auth)}>Cerrar Sesion</h4>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* cuerpo de la app */}
      <div className='row'>
        <div className="col-12 text-center">
          {/* Sección de bienvenida al usuario */}
          <img src={perfil} alt="" width="250" height="250" />
          <h2 >Bienvenido <strong>{correoUsuario}</strong></h2>
          <h4>Crea y gestiona tus pasteles de forma facil, rapida.</h4>

          <div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 text-center">
          {/*Sección para solicitar un pastel */}
          <h2 className='mt-5 mb-3 text-center'>Solicitar Pastel</h2>
          <form onSubmit={guardarInfo}>
            <div className="card card-body">
              {/* Campo de texto para agregar un mensaje */}
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Agregar Mensaje"
                />
              </div>

              {/* segunda caja */}
              {/* Campo de texto para agregar una descripción del pastel */}
              <div className="form-group">
                <textarea
                  type="form-control"
                  id="exampleFormControlTextarea1"
                  name="descripcion"
                  className="form-control my-2"
                  placeholder="Agrega una Descripción del Pastel"
                />
              </div>

              {/* tercer campo */}
              {/* Campo para seleccionar una imagen del pastel */}
              <div className="form-group">
                <input
                  type="file"
                  id="formFile"
                  name="url"
                  className="form-control mt-2 mb-3 form-control"
                  placeholder="Selecionar Imagen"
                  onChange={archivoHandler}
                />
              </div>
              {/* Se cierra el formulario de agregar/editar documento y se muestra la opción de guardar o actualizar */}
              {/* dependiendo del estado de subId */}
              <button className='btn btn-secondary'>
                {subId === '' ? 'Guardar' : 'Actualizar'}
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 col-lg-6">
          {/* Se muestra el título de la sección para el historial de documentos solicitados */}
          <h2 className='text-center mt-5 mb-3'>Historial de Solicitados</h2>
          {/* Se crea un elemento de selección para ordenar los documentos mostrados según su nombre */}
          <select className="form-select m-2 w-100 w-md-25" aria-label="Default select example" onChange={orderFilter}>
            <option value={-1}>Ordena por:</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>
          <div className='row'>
            {
              // Se filtra y mapea la lista de documentos según los criterios de ordenamiento y búsqueda
              docus.filter((dato) => {
                if (!filterDatos) {
                  return dato;
                } else if (dato.nombre.toLocaleLowerCase() === filterDatos.toLocaleLowerCase()) {
                  return dato;
                } else {
                  console.log("sinFiltro");
                  return null;
                }
              }).map(list => (
                <div key={list.id} className="card m-3 col-12 col-lg-5">
                  {/* cuerpo de la app  */}
                  {/* Se muestra la imagen del documento */}
                  <img src={list.url} alt="img" />
                  <div className='card-body'>
                    {/* Se muestra el nombre del documento */}
                    <h5 className='card-title text-black'>{list.nombre}</h5>
                    {/* Se muestra la descripción del documento */}
                    <p className='card-text text-black'>{list.descripcion}</p>
                    <div className='d-flex flex-column'>
                      {/* Se crea un botón para eliminar el documento */}
                      <button className='btn btn-danger' onClick={() => deleteUsuario(list.nombre)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}


// Se exporta el componente Home
export default Home