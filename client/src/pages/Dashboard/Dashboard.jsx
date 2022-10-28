import React from "react";
import style from "./Dashboard.module.css";
import PanelSideBar from "../../components/PanelSideBar/PanelSideBar";

export default function Dashboard() {

  return (
    <div className={style.container}>
      <PanelSideBar />
    </div>
  );
}