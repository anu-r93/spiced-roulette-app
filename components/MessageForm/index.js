import React, { useState } from "react";
import Image from "next/image";
import { FiSend, FiArrowLeft } from "react-icons/fi";

const MessageForm = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [showUserList, setShowUserList] = useState(true);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowUserList(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log(`Sending message to ${selectedUser.name}: ${message}`);
    setMessage("");
  };

  const handleBackToList = () => {
    setShowUserList(true);
    setSelectedUser(null);
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
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col">
      <div className="flex-1 flex flex-col">
        {showUserList ? (
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold p-4 bg-purple-600 text-white">
              Connections
            </h2>
            <ul className="p-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="py-3 px-4 rounded-xl mb-2 cursor-pointer transition-all duration-300 bg-purple-100 hover:bg-purple-200"
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-center">
                    <Image
                      src={user.avatar}
                      alt="User Avatar"
                      className="rounded-full mr-3"
                      width={48}
                      height={48}
                    />
                    <span className="font-semibold text-purple-800">
                      {user.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div className="bg-purple-600 p-4 flex items-left">
              <button onClick={handleBackToList} className="text-white">
                <FiArrowLeft size={24} />
              </button>
              <div className="flex items-center ml-4">
                <Image
                  src={selectedUser.avatar}
                  alt="User Avatar"
                  className="rounded-full mr-3"
                  width={40}
                  height={40}
                />
                <h2 className="text-lg font-bold text-white">
                  {selectedUser.name}
                </h2>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-purple-50">
              {/* Message history goes here */}
            </div>
            <div className="mb-16 p-4 flex items-center">
              <input
                className="flex-1 bg-purple-100 rounded-full py-2 px-4 text-purple-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600  "
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleMessageChange}
              />
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ml-2 transition-colors"
                onClick={handleSendMessage}
              >
                <FiSend size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageForm;
