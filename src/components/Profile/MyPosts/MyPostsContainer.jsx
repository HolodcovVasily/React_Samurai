import React from "react";

import { addPostActionCreator } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { compose } from "redux";

//Component MyPost

let mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    //
    newPostText: state.profilePage.newPostText,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(MyPosts);
