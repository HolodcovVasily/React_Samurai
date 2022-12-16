import { userAPI, authAPI } from "./../api/api";
const SET_USER_DATA = "react/auth/SET_USER_DATA";

let initialState = {
  id: null,
  login: null,
  email: null,
  isFetching: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

//ACTION CREATOR
export const setAuthUserData = (id, login, email, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, login, email, isAuth },
});

//THUNK authUser
export const authUser = () => {
  return async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data;
      dispatch(setAuthUserData(id, login, email, true));
    }
  };
};

//THUNK LOGIN
export const login = (email, password, rememberMe, setStatus) => {
  return async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
      dispatch(authUser());
    } else {
      setStatus(response.data.messages);
    }
  };
};

//THUNK LOGOUT
export const logout = () => {
  return async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export default authReducer;
