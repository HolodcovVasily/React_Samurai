import React from "react";
import Preloader from "../../Preloader/Preloader";
import s from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
  state = { editMode: false, status: this.props.status };

  activatedEditMode = () => {
    this.setState({ editMode: true });
  };
  deActivatedEditMode = () => {
    this.setState({ editMode: false });

    this.props.updateStatus(this.state.status);
  };

  handleSelect = (e) => {
    e.target.select();
  };

  onStatusChange = (e) => {
    this.setState({ status: e.currentTarget.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div className={s.statusContainer}>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activatedEditMode}>
              {this.props.status || "No status!"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              onFocus={this.handleSelect}
              autoFocus={true}
              onBlur={this.deActivatedEditMode}
              type="text"
              value={this.state.status}
            ></input>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
