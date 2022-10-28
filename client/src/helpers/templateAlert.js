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
  });
}
