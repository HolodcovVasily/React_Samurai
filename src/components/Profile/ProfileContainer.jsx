import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getProfileId,
  getStatus,
  updateStatus,
} from "./../../redux/profile-reducer";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

import { WithAuthRedirect } from "../../HOC/WiithAuthRedirect";
import { compose } from "redux";
import Login from "./../Login/Login";

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMyProfile: true,
    };
  }
  ////new version
  componentDidMount() {
    let profileId = +this.props.router.params.profileId;
    let authorizedProfileId = this.props.authorizedProfileId;

    if (profileId) {
      this.props.getProfileId(profileId);
      this.props.getStatus(profileId);
    } else {
      if (this.props.isAuth) {
        this.props.getProfileId(authorizedProfileId);
        this.props.getStatus(authorizedProfileId);
      }
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    );
  }
}

//В новой версии нет withRouter. Создаем сами:
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedProfileId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default compose(
  withRouter,
  WithAuthRedirect,
  connect(mapStateToProps, { getProfileId, getStatus, updateStatus })
)(ProfileContainer);
