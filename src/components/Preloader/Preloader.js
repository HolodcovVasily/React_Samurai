import React from "react";
import preloader from "../../assets/images/preloader.gif";
import style from "../Users/Users.module.css";

let Preloader = (props) => {
  return (
    <div className={style.preloader}>
      <img src={preloader} />
    </div>
  );
};

export default Preloader;
