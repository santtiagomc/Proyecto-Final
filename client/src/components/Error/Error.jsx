import style from "./Error.module.css";

export default function Error({ error }) {
  //cambiar estilos despues
  return (
    <div className={style.error}>
      <h2 className={style.showError}>{error}</h2>
    </div>
  );
}
