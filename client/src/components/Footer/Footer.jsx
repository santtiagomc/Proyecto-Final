import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/NavBar/Logo.png"
import LogoGithub from "./github.png"
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={style.container}>
        {/* <div> */}
        <p className={style.text}>© {new Date().getFullYear()} Henry Bootcamp</p>
        {/* </div> */}
        {/* <div> */}
        <Link
          to={{ pathname: "https://github.com/santtiagomc/Proyecto-Final" }}
          target="_blank"
          rel="noopener noreferer"
        >
          <img id="github" src={LogoGithub} alt="github" className={style.github} />
        </Link>
        {/* </div> */}
      </div>
    </>
  );
}
