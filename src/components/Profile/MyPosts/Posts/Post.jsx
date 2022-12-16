import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKqIL063cbhyfBHg4NR8_GL295cExAIR1TZg&usqp=CAU"></img>
      {props.message}
      <div>
        <span>Like {props.likeCount}</span>
        {/* <span>Dislike</span> */}
      </div>
    </div>
  );
};

export default Post;
