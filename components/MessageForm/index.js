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
    <div className="flex h-screen bg-purple-100">
      {/* User List */}
      <div className="bg-white w-1/4 border-r border-purple-300 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-purple-700">Users</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-purple-200 cursor-pointer"
                onClick={() => handleUserSelect(user)}
              >
                <div className="flex items-center">
                  <Image
                    src={user.avatar}
                    alt="User Avatar"
                    className="rounded-full mr-2"
                    width={20}
                    height={20}
                  />
                  <span className="text-purple-700">{user.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Message Form */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {selectedUser ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-purple-700">
              Send Message to {selectedUser.name}
            </h2>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-purple-700">
              Select a user to send a message
            </h2>
          </div>
        )}
        <div className="flex items-center pb-24">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-purple-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
          />
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline ml-2"
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
