import React from "react";
import s from "./Login.module.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { login } from "./../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const DoLogin = (props) => {
  //Scema if validation with yup
  const validationSchemaLoginForm = yup.object().shape({
    email: yup.string().required("Обязательно"),
    rememberMe: yup.bool(),
    password: yup.string().required("Обязательно"),
    confirmPasswordMe: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords aren`t correct")
      .required("Обязательно"),
  });
  //Initial object with values from form
  const initialValues = {
    email: "",
    rememberMe: false,
    password: "",
    confirmPasswordMe: "",
  };
  //What to do if submit
  const onSubmit = (values, { setSubmitting, setStatus }) => {
    props.login(values.email, values.password, values.rememberMe, setStatus);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      onSubmit={onSubmit}
      validationSchema={validationSchemaLoginForm}
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
        status,
      }) => (
        <Form>
          <div className={s.form}>
            <div className={s.error}>{status}</div>
            <p>
              <label htmlFor={"email"}>Email</label>
              <br />
              <Field
                placeholder="email"
                className={s.input}
                type={"text"}
                name={"email"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </p>
            {touched.email && errors.email && (
              <p className={s.error}>{errors.email}</p>
            )}

            <p>
              <label htmlFor={"rememberMe"}>Remember Me</label>
              <br />
              <Field
                className={s.input}
                type={"checkbox"}
                name={"rememberMe"}
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.rememberMe}
              />
            </p>
            {touched.rememberMe && errors.rememberMe && (
              <p className={s.error}>{errors.rememberMe}</p>
            )}

            <p>
              <label htmlFor={"password"}>Password</label>
              <br />
              <Field
                className={s.input}
                type={"password"}
                name={"password"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </p>
            {touched.password && errors.password && (
              <p className={s.error}>{errors.password}</p>
            )}

            <p>
              <label htmlFor={"confirmPasswordMe"}>Confirm Password</label>
              <br />
              <Field
                className={s.input}
                type={"password"}
                name={"confirmPasswordMe"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPasswordMe}
              />
            </p>
            {touched.confirmPasswordMe && errors.confirmPasswordMe && (
              <p className={s.error}>{errors.confirmPasswordMe}</p>
            )}

            <button
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
              type={"submit"}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Login = (props) => {
  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <DoLogin login={props.login} />
    </div>
  );
};

const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth });

export default connect(mapStateToProps, { login })(Login);
