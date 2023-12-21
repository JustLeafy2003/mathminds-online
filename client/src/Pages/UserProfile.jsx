import React from "react";
import { getLocalStorageUser } from "../Utils/localStorageUtils";
import { FiUser } from "react-icons/fi";

/**
 * UserProfile Component - Displays user profile information.
 * @component
 * @returns {JSX.Element} UserProfile component
 */
const UserProfile = () => {
  // Get user data from local storage
  const userData = getLocalStorageUser();

  // Check if user data is available
  if (!userData) {
    return (
      <>
        <h3>User profile</h3>
        <p>No user data available</p>
      </>
    );
  }

  return (
    <div className="central-container" style={{maxWidth:"500px",width:"400px",marginTop:"0"}}>
        <div style={{display:"flex"}}>
          <div className="avatar-container" style={{border: ".25em dashed",padding: "1em",height: "9em",borderRadius: "50%"}}>
              <FiUser size={100} />
          </div>
      <div className="user-details" style={{width:"100%",textAlign:"left",fontSize:"1.25em",marginLeft:"1em"}}>
        <h3>{userData.Name}'s Profile</h3>
        <hr style={{ opacity: 0.75, width: "100%" }} />
        <p><u>USER ID:</u> {userData.ID}</p>
        <p><u>STATUS:</u> {userData.Admin ? "Admin" : "Member"}</p>
      </div>
      </div>
        <hr style={{ opacity: 0.75, width: "100%" }} />
        <div style={{width:"100%",textAlign:"left",fontSize:"1.25em",marginLeft:"1em"}}>
          <p>Wins: {userData.Wins}</p>
          <p>Losses: {userData.Losses}</p>
        </div>
        <hr style={{ opacity: 0.75, width: "100%" }} />
        <p style={{width:"100%",textAlign:"left",fontSize:"1.25em",marginLeft:"1em"}}>Bio: {userData.Bio}</p>
    </div>
  );
};

export default UserProfile;
