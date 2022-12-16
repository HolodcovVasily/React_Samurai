import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import sideBarReducer from "./sidebar-reducer";
// const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
// const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
// const SEND_MESSAGE = "SEND-MESSAGE";

let store = {
  _state: {
    profilePage: {
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
      newPostText: "",
    },
    dialogsPage: {
      dialogsData: [
        { id: 1, userName: "Alisa" },
        { id: 2, userName: "Maryna" },
        { id: 3, userName: "Vasya" },
        { id: 4, userName: "Max" },
        { id: 5, userName: "Kolya" },
        { id: 6, userName: "Tolik" },
        { id: 7, userName: "Ann" },
        { id: 8, userName: "Mick" },
        { id: 9, userName: "Dasha" },
        { id: 10, userName: "Artem" },
        { id: 11, userName: "Mishka" },
        { id: 12, userName: "Tanya" },
      ],
      messagesData: [
        { id: 1, message: "Good day, Jerry!" },
        { id: 2, message: "Bye, Tom!" },
        { id: 3, message: "Hi Mary! How’re you?" },
        { id: 4, message: "Hello John! How’re you?" },
        { id: 5, message: "Hey, Julia! What’s up?" },
        {
          id: 6,
          message: "Hello there, Sam, not much. How are you doing?",
        },
        { id: 7, message: "what is going on?" },
        { id: 8, message: "How is everything?" },
        { id: 9, message: "How are things going?" },
        { id: 10, message: "How are you getting on?" },
        { id: 11, message: "What have you been up to?" },
        { id: 12, message: "Look, who is here!" },
      ],
      newMessageBody: "",
    },
    sideBar: {},
  },
  _callSubscriber() {
    console.log("state changed");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
    this._state.sideBar = sideBarReducer(this._state.sideBar, action);

    this._callSubscriber(this._state);
  },
};

window.store = store;
export default store;
