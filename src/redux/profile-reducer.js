import { profileAPI, userAPI } from "./../api/api";
const ADD_POST = "ADD-POST";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
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
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: state.postsData.length,
        message: action.newPostText,
        likeCount: 0,
      };

      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: "",
      };
    }

    case SET_USERS_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    default:
      return state;
  }
};

//ACTION CREATOR
export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});
export const setUsersProfile = (profile) => ({
  type: SET_USERS_PROFILE,
  profile,
});
export const setStatus = (status) => ({ type: SET_STATUS, status });

//THUNK getProfileId
export const getProfileId = (profileId) => {
  return async (dispatch) => {
    let res = await userAPI.getProfile(profileId);
    dispatch(setUsersProfile(res.data));
  };
};

//THUNK getStatus
export const getStatus = (profileId) => {
  return async (dispatch) => {
    let res = await profileAPI.getStatus(profileId);
    dispatch(setStatus(res.data));
  };
};

//THUNK updateStatus
export const updateStatus = (status) => {
  return async (dispatch) => {
    let res = await profileAPI.updateStatus(status);
    if (res.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };
};

export default profileReducer;
