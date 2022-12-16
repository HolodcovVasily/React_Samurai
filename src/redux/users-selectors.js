import { createSelectorHook, useSelector } from "react-redux";

export function getUsersSelector(state) {
  return state.userPage.usersData;
}
// const getUsersSelector = useSelector((state) => {
//   state.userPage.usersData;
// });

// function createSelectorHook(selector, callback) {
//   return (state) => {
//     callback(selector(state));
//   };
// }

// export const getUsersReselect = createSelectorHook(
//   getUsersSelector,
//   (users) => {
//     return users.filter((u) => true);
//   }
// );

export const getPageSize = (state) => {
  return state.userPage.pageSize;
};
export const getCurrentPage = (state) => {
  return state.userPage.currentPage;
};
export const getTotalCount = (state) => {
  return state.userPage.totalCount;
};
export const getIsFetching = (state) => {
  return state.userPage.isFetching;
};
export const getFollowingInProgress = (state) => {
  return state.userPage.followingInProgress;
};
export const getIsAuth = (state) => {
  return state.auth.isAuth;
};
