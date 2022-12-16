import { userAPI, authAPI } from "../api/api";
import { authUser } from "./auth-reducer";
const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

//ACTION CREATOR
export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
});

//THUNK initialize
export const initializeApp = () => async (dispatch) => {
  await dispatch(authUser());
  dispatch(initializedSuccess());
};

// export const initializeApp = () => {
//   return (dispatch) => {
//     let promise = dispatch(authUser());
//     Promise.all([promise]).then(() => {
//       dispatch(initializedSuccess());
//     });
//   };
// };

export default appReducer;
