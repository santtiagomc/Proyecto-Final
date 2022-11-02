import Swal from "sweetalert2";

// * Alerta grande en el medio de la pantalla, color negro
export default function templateAlert(title, text, icon, timer) {
  return Swal.fire({
    background: "#19191a",
    color: "#e1e1e1",
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    confirmButtonColor: "#355070",
  });
}

export function templateAlertTopEnd(timer, icon, message) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: icon,
    title: message,
  });
}
