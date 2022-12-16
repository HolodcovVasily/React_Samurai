import React from "react";
import s from "../Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div className={s.dialog}>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbUyGzy0hd_quVvYzJhn-wKCiIcH5wz291Pw&usqp=CAU"></img>
      </div>
      <div>
        <NavLink
          to={path}
          className={(navData) => (navData.isActive ? s.active : "")}
        >
          {props.name}
        </NavLink>
      </div>
    </div>
  );
};

export default DialogItem;
