import React from "react";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import { Navigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElement = state.dialogsData.map((dialog) => {
    return <DialogItem name={dialog.userName} key={dialog.id} id={dialog.id} />;
  });
  let messageElement = state.messagesData.map((phrase) => {
    return <Message message={phrase.message} key={phrase.id} id={phrase.id} />;
  });

  //UI
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElement}</div>
      <div className={s.messages}>
        <div>{messageElement}</div>
        <AddMessageForm sendMessage={props.sendMessage} />
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  const validationSchemaSendMessageForm = yup.object().shape({
    newMessageBody: yup.string(),
  });

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
    // values.newMessageBody = "";
    //Вместо такого затирания использовать на onSubmit={(values, { resetForm }) => {
    //   какие-то действия;
    //   resetForm();
    // }}
  };

  return (
    <Formik
      initialValues={{
        newMessageBody: "",
      }}
      validateOnBlur
      onSubmit={(values, { resetForm }) => {
        addNewMessage(values);
        resetForm();
      }}
      validationSchema={validationSchemaSendMessageForm}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
      }) => (
        <div>
          <textarea
            placeholder="Enter your message"
            className={s.input}
            name={"newMessageBody"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newMessageBody}
          ></textarea>
          {touched.newMessageBody && errors.newMessageBody && (
            <p className={s.error}>{errors.newMessageBody}</p>
          )}

          <div>
            <button
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
              type={"submit"}
            >
              Send message
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Dialogs;
