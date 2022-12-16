import React from "react";
import Preloader from "../../Preloader/Preloader";

import s from "./ProfileInfo.module.css";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      {/* <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnPfgcXgjaeI9zR1bvfxlM827GBdjkgjxwiQ&usqp=CAU"></img>
      </div> */}
      <div className={(s.descriptionBlock, s.profileInfoAva)}>
        <img src={props.profile.photos.large} />
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
