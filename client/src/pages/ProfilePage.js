import React from 'react';
import './ProfilePage.css'; // Import the CSS file for styling

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>
      <div className="profile-body">
        <img
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-details">
          <p className="profile-info"><strong>Username:</strong> John Doe</p>
          <p className="profile-info"><strong>Email:</strong> johndoe@example.com</p>
          <button className="edit-profile-button">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
