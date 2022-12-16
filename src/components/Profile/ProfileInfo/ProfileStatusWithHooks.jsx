import React, { useEffect, useState } from "react";
import Preloader from "../../Preloader/Preloader";
import s from "./ProfileInfo.module.css";

export const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activatedEditMode = () => {
    setEditMode(true);
  };

  const deActivatedEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={s.statusContainer}>
      {!editMode && (
        <div>
          <span onDoubleClick={activatedEditMode}>
            Your status: {props.status || "No status! "}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            value={status}
            onChange={onStatusChange}
            autoFocus={true}
            type="text"
            onBlur={deActivatedEditMode}
          ></input>
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
