import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FiSend, FiArrowLeft } from "react-icons/fi";
import useSWR from "swr";
import { decodeAccessToken } from "@/db/accessToken";

const MessageForm = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [showUserList, setShowUserList] = useState(true);
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const { data: { user } = {}, isLoading, error } = useSWR(`/api/user`);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  useEffect(() => {
    async function getConnections() {
      const response = await fetch(`/api/connectionRequest/connected`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const { connections } = await response.json();

      setConnections(connections);
    }

    getConnections();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    setShowUserList(false);

    async function getMessages() {
      if (!user) return;
      const response = await fetch(`/api/message/${user?._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const { messages } = await response.json();

      setMessages(messages);
    }

    getMessages();
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      sender: loggedInUser.id, // Replace with actual current user ID
      receiver: selectedUser._id,
      message: message,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);

    await fetch(`/api/message`, {
      method: "POST",
      body: JSON.stringify(newMessage),
      headers: { "Content-Type": "application/json" },
    });

    setMessage("");
  };

  const handleBackToList = () => {
    setShowUserList(true);
    setSelectedUser(null);
    setMessages([]);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col">
      <div className="flex-1 flex flex-col">
        {showUserList ? (
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold p-4 bg-purple-600 text-white">
              Connections
            </h2>
            <ul className="p-4">
              {connections &&
                connections.map((user) => (
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
                        {user.fullName}
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
                  {selectedUser.fullName}
                </h2>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-purple-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.sender === loggedInUser.id ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.sender === loggedInUser.id
                        ? "bg-purple-600 text-white"
                        : "bg-white text-purple-800"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {formatTimestamp(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="mb-16 p-4 flex items-center">
              <input
                className="flex-1 bg-purple-100 rounded-full py-2 px-4 text-purple-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleMessageChange}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
