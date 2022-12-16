import React from "react";
import { sendMessageActionCreator } from "../../redux/dialog-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { WithAuthRedirect } from "../../HOC/WiithAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return { dialogsPage: state.dialogsPage };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageActionCreator(newMessageBody));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithAuthRedirect
)(Dialogs);
