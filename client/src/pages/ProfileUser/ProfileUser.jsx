 import React from "react";
 import { Link } from "react-router-dom";
 //import style from "./Login.module.css";


export default function ProfileUser() {
  return (
    <div >
      <h1> Vista general de la Cuenta </h1>
      <div>
        <h2>Perfil</h2>
        <h4>Nombre: Ejemplo1</h4>
        <h4>Correo Electrónico: hola@gmail.com </h4>
        <h4>Provincia: BS AS</h4>
        <h4>Ciudad: plata</h4>
        <h4>Dirección: calle falsa 123</h4>
        <h4>Código Postal: 4310</h4>
        <button>Editar perfil</button>

      </div>
      <div>
        <h2>Historial de compras</h2>
        <h4>Compra 1</h4>
        <h4>Compra 2</h4>
        <h4>Compra 3</h4>
        <button>Ver todas 🛒</button>

      </div>
      <br></br>
      <Link to="/">
        <button>Volver</button>
      </Link>
    </div>
  );
 }