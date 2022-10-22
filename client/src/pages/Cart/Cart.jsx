import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from "./Cart.module.css";
import { getGuestCart, postCart } from "../../redux/actions";
import Swal from "sweetalert2";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => state);

  let repeatedIdArrayCart = []
  let uniqueIdArrayCart = []
  let quantity = {}
  if (localStorage.length) {
    repeatedIdArrayCart = localStorage.getItem("cart").split(",");
    uniqueIdArrayCart = [...new Set(repeatedIdArrayCart)]
    repeatedIdArrayCart.length && repeatedIdArrayCart.forEach((el) => {
      quantity[el] = (quantity[el] || 0) + 1;
    });
  }

  console.log(repeatedIdArrayCart.length)
  const handleCartAdd = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(postCart({ userId: user.uid, bookId: e.target.value, suma: true }));
    } else {
      if (quantity[e.target.value] < 5) {
        localStorage.setItem("cart", `${repeatedIdArrayCart.toString()},${e.target.value}`)
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'Alcanzaste el máximo de este producto'
        })
      };
      dispatch(getGuestCart(uniqueIdArrayCart.toString()))
    }
  }

  const handleCartSubs = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(postCart({ userId: user.uid, bookId: e.target.value, suma: true }));
    } else {
      if (quantity[e.target.value] > 1) {
        let index = repeatedIdArrayCart.indexOf(e.target.value)
        let filtered = repeatedIdArrayCart.splice(index, 1)

        localStorage.setItem("cart", `${repeatedIdArrayCart.toString()}`)
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'Alcanzaste el mínimo de este producto'
        });
      }
      dispatch(getGuestCart(uniqueIdArrayCart.toString()))
    }
  }

  useEffect(() => {
    if (uniqueIdArrayCart.length && !cart.length)
      dispatch(getGuestCart(uniqueIdArrayCart.toString()))
  }, []);

  return (
    <>
      {cart.length
        ?
        <div className={style.cart_container}>
          <div className={`${style.attributes}`}>
            <h4 className={`col-7 ps-4 ${style.attributes_h2}`}>Producto</h4>
            <h4 className={`col-2 text-center ${style.attributes_h2}`}>Precio unitario</h4>
            <h4 className={`col-1 text-center ${style.attributes_h2}`}>Cantidad</h4>
            <h4 className={`col-2 text-center ${style.attributes_h2}`}>Precio total</h4>
          </div>
          <hr></hr>
          {cart.map(book => (
            <div key={book.id}>
              <div className={style.detail}>
                <div className={`col-7 text-center ${style.detail_product}`}>
                  <img src={book.image} alt="Portada" className={style.detail_img}></img>
                  <div className={style.detail_info}>
                    <Link to={`/detail/${book.id}`}><h2 className={style.detail_info_h2}>{book.name}</h2></Link>
                    <h5 className={style.detail_info_h4}>{book.author}</h5>
                  </div>
                </div>
                <h3 className={`col-2 text-center ${style.detail_price}`}>{book.price}</h3>
                <div className={`col-1 text-center ${style.detail_quantity}`}>
                  <button value={book.id} onClick={handleCartSubs} className={style.detail_quantity_button}>-</button>
                  <h3 className={style.detail_quantity_p}>{quantity[book.id]}</h3>
                  <button value={book.id} onClick={handleCartAdd} className={style.detail_quantity_button}>+</button>
                </div>
                <h3 className={`col-2 text-center ${style.detail_price}`}>{(book.price * quantity[book.id]).toFixed(2)}</h3>
              </div>
              <hr></hr>
            </div>
          ))}
        </div>
        : !uniqueIdArrayCart.length
          ? <h1 className={style.message}>No tienes ningún libro en el carrito.</h1>
          : <h1 className={style.message}>Cargando...</h1>}
    </>
  );
}





//   return (
//     <>
//       <h1 className={style.h1}>Carrito WIP</h1>
//       {cartLS &&
//         filteredBooks.map((el, index) => {
//           return (
//             <div key={index}>
//               <Link to={`/detail/${el}`}>
//                 <h1>{`Producto: ${el} | Cantidad: ${counts[el]}`}</h1>
//               </Link>
//             </div>
//           );
//         })}
//     </>
//   );
// }
