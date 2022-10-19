 import React from "react";
 import { Link } from "react-router-dom";


export default function ProfileUser() {
  return (
    <div >
      <div>      
        <h1>Bienvenido a tu perfíl 😎</h1>
      </div>

      <h1> Nombre: Ejemplo1</h1>
      <h1>Apellido: Ejemplo2 </h1>
      <h1>Correo Electronico: hola@gmail.com </h1>
      <h1>Provincia: BS AS</h1>
      <h1>Ciudad: plata</h1>
      <h1>Dirección: calle falsa 123</h1>
      <h1>Codigo Postal: 4310</h1>
      <button>Editar Perfil.</button>
      <button>Historial de Compras 🛒</button>
      <br></br>
      <Link to="/">
        <button>Atras</button>
      </Link>
    </div>
  );
 }