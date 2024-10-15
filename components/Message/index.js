// pages/messages.jsx
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";

const MessagesPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //connection is not being used anywhere
  const [connection, setConnection] = useState(null);
  const { data: user } = useSWR("/api/user");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/messages");
        setMessages(response.data.messages);
        setConnection(response.data.connection);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    try {
      await axios.post("/api/messages", { message });
      setMessage("");
      // Fetch updated messages after sending
      const response = await axios.get("/api/messages");
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col pb-24 h-screen">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === user.id
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex p-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l-lg p-2"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;
