import React, { useState } from "react";
import Image from "next/image";
import { FiSend } from "react-icons/fi";

const MessageForm = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Handle sending the message logic here
    console.log(`Sending message to ${selectedUser.name}: ${message}`);
    setMessage("");
  };

  const users = [
    { id: 1, name: "Max Mustermann", avatar: "https://via.placeholder.com/40" },
    {
      id: 2,
      name: "Erika Mustermann",
      avatar: "https://via.placeholder.com/40",
    },
    { id: 3, name: "John Doe", avatar: "https://via.placeholder.com/40" },
    { id: 4, name: "Jane Doe", avatar: "https://via.placeholder.com/40" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex">
      {/* User List */}
      <div className="bg-white rounded-l-lg shadow-md w-1/4 p-4">
        <h2 className="text-lg font-semibold mb-4 text-purple-700">
          Connections
        </h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`py-2 px-4 rounded-lg mb-2 cursor-pointer ${
                selectedUser?.id === user.id
                  ? "bg-purple-200 text-purple-700"
                  : "bg-white text-gray-700 hover:bg-purple-100"
              }`}
              onClick={() => handleUserSelect(user)}
            >
              <div className="flex items-center">
                <Image
                  src={user.avatar}
                  alt="User Avatar"
                  className="rounded-full mr-2"
                  width={40}
                  height={40}
                />
                <span>{user.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Message Screen */}
      <div className="flex-1 bg-white rounded-r-lg shadow-md p-4 flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto">
          {selectedUser ? (
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src={selectedUser.avatar}
                  alt="User Avatar"
                  className="rounded-full mr-2"
                  width={40}
                  height={40}
                />
                <h2 className="text-lg font-semibold text-purple-700">
                  {selectedUser.name}
                </h2>
              </div>
              {/* Message history goes here */}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-lg font-semibold text-purple-700">
                Select a user to start chatting
              </h2>
            </div>
          )}
        </div>

        {/* Type and Send Message */}
        <div className="bg-white rounded-lg shadow-md pb-24 flex items-center">
          <input
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-purple-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
          />
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold p-2 rounded-lg focus:outline-none focus:shadow-outline ml-2"
            onClick={handleSendMessage}
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
