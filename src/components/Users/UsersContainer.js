import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import Preloader from "./../Preloader/Preloader";
import {
  follow,
  unFollow,
  setCurrentPage,
  togglefollowingProgress,
  getUsers,
} from "./../../redux/users-reducer";
import { Navigate } from "react-router-dom";
import { WithAuthRedirect } from "./../../HOC/WiithAuthRedirect";
import { compose } from "redux";
import {
  getPageSize,
  getCurrentPage,
  getTotalCount,
  getIsFetching,
  getFollowingInProgress,
  getIsAuth,
  getUsersSelector,
} from "./../../redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}

        <Users
          totalCount={this.props.totalCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          usersData={this.props.usersData}
          unFollow={this.props.unFollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//     usersData: state.userPage.usersData,
//     pageSize: state.userPage.pageSize,
//     currentPage: state.userPage.currentPage,
//     totalCount: state.userPage.totalCount,
//     isFetching: state.userPage.isFetching,
//     followingInProgress: state.userPage.followingInProgress,
//     isAuth: state.auth.isAuth,
//   };
// };
let mapStateToProps = (state) => {
  return {
    // usersData: getUsersSelector(state),

    usersData: getUsersSelector(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    totalCount: getTotalCount(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    isAuth: getIsAuth(state),
  };
};

export default compose(
  WithAuthRedirect,
  connect(mapStateToProps, {
    follow,
    unFollow,
    setCurrentPage,
    togglefollowingProgress,
    getUsers,
  })
)(UsersContainer);
