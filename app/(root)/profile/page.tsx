import React from "react";
import UpdateProfile from "./update-profile";

const ProfilePage = () => {
  return (
    <div className="pt-10 px-4 md:px-0">
      <h1 className="text-2xl mb-10">Profile Settings</h1>
      <p className="text-lg mb-6">Update your profile</p>
      <UpdateProfile />
    </div>
  );
};

export default ProfilePage;
