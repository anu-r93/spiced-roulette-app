import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import Loader from "../Loader";
import Logout from "../Logout";
// import SubmitButton from "../Button";

const Profile = () => {
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  const [showSentRequests, setShowSentRequests] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [connections, setConnections] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [refetchPendingRequest, setRefetchPendingRequest] = useState(false);

  useEffect(() => {
    async function getConnections() {
      const response = await fetch(`/api/connectionRequest/connected`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const { connections } = await response.json();

      setConnections(connections);
    }

    async function getSentRequests() {
      const response = await fetch(`/api/connectionRequest/sent`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const { connectionRequests } = await response.json();

      setSentRequests(connectionRequests);
    }

    async function getPendingRequests() {
      const response = await fetch("/api/connectionRequest", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const { connectionRequests } = await response.json();

      setPendingRequests(connectionRequests);
    }

    getPendingRequests();
    getSentRequests();
    getConnections();
  }, [refetchPendingRequest]);

  const { data: { user } = {}, isLoading, error } = useSWR(`/api/user`);

  const togglePendingRequests = () => {
    setShowPendingRequests(!showPendingRequests);
  };

  const toggleSentRequests = () => {
    setShowSentRequests(!showSentRequests);
  };

  const toggleConnections = () => {
    setShowConnections(!showConnections);
  };

  const handleAcceptRequest = async ({ sender, receiver, id }) => {
    await fetch(`/api/connectionRequest/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "connected", sender, receiver }),
      headers: { "Content-Type": "application/json" },
    });
    setRefetchPendingRequest(true);
  };

  const handleRejectRequest = async (id) => {
    await fetch(`/api/connectionRequest/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "declined" }),
      headers: { "Content-Type": "application/json" },
    });
    setRefetchPendingRequest(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center px-4 pb-20 pt-8">
      {isLoading || error ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="relative">
            <Image
              src={user.avatar}
              alt="Profile"
              width={500}
              height={300}
              className="w-full h-auto rounded-t-lg object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-t-lg">
              <h2 className="text-2xl font-bold text-white mb-2">
                {user.name}
              </h2>
              <p className="text-white">{user.bio}</p>
            </div>
          </div>
          <div className="p-4">
            <div
              className="bg-purple-100 rounded-lg p-4 mb-4 cursor-pointer"
              onClick={togglePendingRequests}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-purple-700">
                  Pending Requests
                </h4>
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
                  {pendingRequests.length}
                </span>
              </div>
              {showPendingRequests && pendingRequests.length > 0 && (
                <ul className="mt-4">
                  {pendingRequests.map(({ sender, receiver, _id }) => {
                    return (
                      <li
                        className="bg-white rounded-lg shadow-md p-4 mb-4"
                        key={_id}
                      >
                        <div className="flex items-center mb-2">
                          <Image
                            src={sender.avatar}
                            alt="Profile"
                            width={50}
                            height={50}
                            className="rounded-full mr-4"
                          />
                          <span className="font-semibold text-gray-700">
                            {sender.fullName}
                          </span>
                          <span className="text-xs text-black ml-4">
                            {sender.bio}
                          </span>
                        </div>
                        <div className="flex justify-center space-x-4">
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() =>
                              handleAcceptRequest({ receiver, sender, id: _id })
                            }
                          >
                            Yes
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => handleRejectRequest(_id)}
                          >
                            No
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className="p-4 -mt-10">
            <div
              className="bg-purple-100 rounded-lg p-4 mb-4 cursor-pointer"
              onClick={toggleSentRequests}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-purple-700">
                  Sent Requests
                </h4>
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
                  {sentRequests?.length}
                </span>
              </div>
              {showSentRequests && sentRequests.length > 0 && (
                <ul className="mt-2">
                  {sentRequests.map(({ receiver, _id }) => {
                    return (
                      <li
                        className="bg-white rounded-lg shadow-md p-4 mb-4"
                        key={_id}
                      >
                        <div className="flex items-center mb-2">
                          <Image
                            src={receiver.avatar}
                            alt="Profile"
                            width={50}
                            height={50}
                            className="rounded-full mr-4"
                          />
                          <span className="font-semibold text-gray-700">
                            {receiver.fullName}
                          </span>
                          <span className="text-xs text-black ml-4">
                            {receiver.bio}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className="p-4 -mt-10">
            <div
              className="bg-purple-100 rounded-lg p-4 mb-4 cursor-pointer"
              onClick={toggleConnections}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-purple-700">
                  Your Connections
                </h4>
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
                  {connections?.length}
                </span>
              </div>
              {showConnections && connections.length > 0 && (
                <ul className="mt-2">
                  {connections.map(({ avatar, fullName, _id }) => {
                    return (
                      <li
                        className="bg-white rounded-lg shadow-md p-4 mb-4"
                        key={_id}
                      >
                        <div className="flex items-center mb-2">
                          <Image
                            src={avatar}
                            alt="Profile"
                            width={50}
                            height={50}
                            className="rounded-full mr-4"
                          />
                          <span className="font-semibold text-gray-700">
                            {fullName}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
