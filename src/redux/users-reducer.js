import { userAPI } from "./../api/api";
import { updateObjInArray } from "./../utilits/objects-helpers/obj-helpers";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_TOGGLE_IS_FETCHING = "SET_TOGGLE_IS_FETCHING";
const SET_TOGGLE_FOLLOWING_PROGRESS = "SET_TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
  usersData: [],
  pageSize: 100,
  // totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersData: updateObjInArray(state.usersData, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        usersData: updateObjInArray(state.usersData, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS:
      return {
        ...state,
        usersData: action.usersData,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case SET_TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

//ACTION CREATOR
export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unFollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (usersData) => ({ type: SET_USERS, usersData });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUserCount = (totalCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount,
});
export const toggleIsFetching = (isFetching) => ({
  type: SET_TOGGLE_IS_FETCHING,
  isFetching,
});
export const togglefollowingProgress = (isFetching, userId) => ({
  type: SET_TOGGLE_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

//THUNK getUsers
export const getUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));

    let data = await userAPI.getUsers(currentPage, pageSize);
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUserCount(data.totalCount));
  };
};

//common methods for Follow and unFollow
let followUnFollowFlow = async (dispatch, userId, APIMethod, ActionCreator) => {
  dispatch(togglefollowingProgress(true, userId));
  let response = await APIMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(ActionCreator(userId));
  }
  dispatch(togglefollowingProgress(false, userId));
};

//THUNK UNFOLLOW
export const unFollow = (userId) => {
  return async (dispatch) => {
    let APIMethod = userAPI.unfollow.bind(userAPI);
    let ActionCreator = unFollowSuccess;
    followUnFollowFlow(dispatch, userId, APIMethod, ActionCreator);
  };
};

//THUNK FOLLOW
export const follow = (userId) => {
  return async (dispatch) => {
    let APIMethod = userAPI.follow.bind(userAPI);
    let ActionCreator = followSuccess;
    followUnFollowFlow(dispatch, userId, APIMethod, ActionCreator);
  };
};

export default usersReducer;
