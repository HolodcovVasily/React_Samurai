import profileReducer from "./profile-reducer";
test("new post should be added", () => {
  let state = {
    postsData: [
      { id: 1, message: "Good day, Jerry!", likeCount: 12 },
      { id: 2, message: "Bye, Tom!", likeCount: 10 },
      { id: 3, message: "Hi Mary! How are you?", likeCount: 5 },
      { id: 4, message: "Hello John! How are you?", likeCount: 1 },
      { id: 5, message: "Hey, Julia! Whats up?", likeCount: 0 },
      {
        id: 6,
        message: "Hello there, Sam, not much. How are you doing?",
        likeCount: 12,
      },
      { id: 7, message: "whats going on?", likeCount: 70 },
      { id: 8, message: "How is everything?", likeCount: 122 },
      { id: 9, message: "How are things going?", likeCount: 15 },
      { id: 10, message: "How are you getting on?", likeCount: 10 },
      { id: 11, message: "What have you been up to?", likeCount: 25 },
      { id: 12, message: "Look, who is here!", likeCount: 55 },
    ],
  };
  let action = addPostActionCreator("kamasutra");
  // let addPostActionCreator = (newPostText) => ({
  //   type: ADD_POST,
  //   newPostText,
  // });

  let newState = profileReducer(state, action);
  expect(newState.postsData.length).toBe(13);
});
