import React, { useState } from "react";
import Image from "next/image";
import { FiEdit, FiSave } from "react-icons/fi";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Anushka Raman");
  const [bio, setBio] = useState("Bootcamp Graduate | Tech Enthusiast");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [showPendingRequests, setShowPendingRequests] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const togglePendingRequests = () => {
    setShowPendingRequests(!showPendingRequests);
  };

  const handleSaveChanges = () => {
    // Save changes logic here
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700">Profile</h2>
          {isEditing ? (
            <button
              className="text-green-600 hover:text-green-800 focus:outline-none"
              onClick={handleSaveChanges}
            >
              <FiSave size={24} />
            </button>
          ) : (
            <button
              className="text-purple-600 hover:text-purple-800 focus:outline-none"
              onClick={handleEditClick}
            >
              <FiEdit size={24} />
            </button>
          )}
        </div>
        <div className="flex flex-col items-center mb-6">
          <Image
            src={profileImage}
            alt="Profile"
            width={150}
            height={150}
            className="rounded-full mb-4"
          />
          {isEditing ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
          ) : null}
          <h3 className="text-l font-bold text-black-700 mb-2">Name</h3>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="text-center text-xl font-bold bg-purple-100 text-purple-700 mb-2 px-4 py-2 rounded-lg"
            />
          ) : (
            <p className="text-xl font-bold text-purple-700 mb-2 border rounded">
              {name}
            </p>
          )}
          <h3 className="text-l font-bold text-black-700 mb-2">Bio</h3>
          {isEditing ? (
            <textarea
              value={bio}
              onChange={handleBioChange}
              className="text-center text-gray-600 mb-4 bg-purple-100 px-4 py-2 rounded-lg"
              rows={2}
            />
          ) : (
            <p className="text-center text-gray-600 mb-4 border rounded">
              {bio}
            </p>
          )}
        </div>
        <div className="bg-purple-100 rounded-lg p-4 mb-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={togglePendingRequests}
          >
            <h4 className="text-lg font-semibold text-purple-700">
              Pending Requests
            </h4>
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
              2
            </span>
          </div>
          {showPendingRequests && (
            <ul className="mt-4">
              <li className="text-gray-600 mb-2">
                <span className="font-semibold">Request 1:</span> Lorem ipsum
                dolor sit amet.
              </li>
              <li className="text-gray-600">
                <span className="font-semibold">Request 2:</span> Consectetur
                adipiscing elit.
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
