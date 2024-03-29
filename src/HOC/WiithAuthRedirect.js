import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsRedirect = (state) => ({
  isAuth: state.auth.isAuth,
});

//HOC High order Component
export const WithAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) {
        return <Navigate to={"/login"} />;
      }
      return <Component {...this.props} />;
    }
  }

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
};
