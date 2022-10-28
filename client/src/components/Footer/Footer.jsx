import React from "react";
import { Link } from "react-router-dom";
import LogoGithub from "./github.png";
import style from "./Footer.module.css";
import { FiTwitter } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className={style.container}>
        <h4 className={style.follow}>¡Seguinos!</h4>
        <hr></hr>
        <FiFacebook className={style.iconSM} />
        <FiTwitter className={style.iconSM} />
        <FaInstagram className={style.iconSM} />
        <SlSocialLinkedin className={style.iconSM} />
        <hr></hr>

        <p className={style.text}>
          © {new Date().getFullYear()} Henry Bootcamp
        </p>

        <Link
          to={{ pathname: "https://github.com/santtiagomc/Proyecto-Final" }}
          target="_blank"
          rel="noopener noreferer"
        >
          <img
            id="github"
            src={LogoGithub}
            alt="github"
            className={style.github}
          />
        </Link>
      </div>
    </>
  );
}
