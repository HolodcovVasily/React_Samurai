import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import sideBarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogReducer,
  sideBar: sideBarReducer,
  userPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

// let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

window.store = store;

export default store;
