import React, { PureComponent } from "react";
import s from "./MyPosts.module.css";
import Post from "./Posts/Post";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";

//Component MyPost
const MyPosts = React.memo((props) => {
  window.props = [];
  window.props.push(props);
  console.log(props);
  console.log("Hello!");

  let postsElement = [...props.postsData].reverse().map((post) => {
    return <Post message={post.message} likeCount={post.likeCount} />;
  });

  return (
    <div className={s.postsBlock}>
      <h3>My post</h3>
      <AddPostForm
        addPost={props.addPost}
        onPostChange={props.onPostChange}
        newPostText={props.newPostText}
      />
      <div className={s.posts}>{postsElement}</div>
    </div>
  );
});

const AddPostForm = (props) => {
  const validationSchemaAddPostForm = yup.object().shape({
    newPostText: yup.string(),
    // .required("Enter some post")
  });

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        newPostText: "",
      }}
      validateOnBlur
      onSubmit={(values, { resetForm }) => {
        onAddPost(values);
        resetForm();
      }}
      validationSchema={validationSchemaAddPostForm}
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
            placeholder="Enter new post"
            className={s.input}
            name={"newPostText"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newPostText}
          ></textarea>
          {touched.newPostText && errors.newPostText && (
            <p className={s.error}>{errors.newPostText}</p>
          )}

          <div>
            <button
              disabled={!isValid && !dirty && !values.newPostText}
              onClick={handleSubmit}
              type={"submit"}
            >
              Add post
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default MyPosts;
