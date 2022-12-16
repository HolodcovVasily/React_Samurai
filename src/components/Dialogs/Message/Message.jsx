import React from "react";
import s from "../Dialogs.module.css";

const Message = (props) => {
  return (
    <div className={s.message}>
      <span className={s.id}>{props.id}</span>
      <div>{props.message}</div>
    </div>
  );
};

export default Message;
