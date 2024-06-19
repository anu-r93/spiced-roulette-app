import Image from "next/image";
import { useState } from "react";
import rouletteWheelImage from "../../assets/roulette-wheel.png";

const Roulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [showRandomUser, setShowRandomUser] = useState(false);
  const [randomUser, setRandomUser] = useState(null);
  const [showMessageCard, setShowMessageCard] = useState(false);

  const handleCardClick = (title) => {
    setActiveCard(title);
  };

  const handleSpin = async () => {
    setIsSpinning(true);
    const randomRotation = Math.floor(Math.random() * 360 + 720);
    setRotation(randomRotation);

    const response = await fetch("/api/randomUser", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const { user } = await response.json();

    setTimeout(() => {
      setIsSpinning(false);
      setActiveCard(null);
      setShowRandomUser(true);
      setRandomUser(user);
    }, 3000);
  };

  const handleYesClick = async () => {
    setShowMessageCard(true);
    const response = await fetch("/api/connectionRequest", {
      method: "POST",
      body: JSON.stringify({ receiverId: randomUser.id }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleNoClick = () => {
    setShowRandomUser(false);
    setShowMessageCard(false);
  };

  const Card = ({ title, onClick, isActive, body }) => {
    return (
      <div
        className={`bg-white rounded-lg shadow-md p-4 w-full max-w-xs cursor-pointer transition-all duration-300 ${
          isActive
            ? "bg-purple-200 text-purple-700 shadow-lg scale-105"
            : "bg-white text-gray-700"
        }`}
        onClick={(e) => {
          onClick(title);
          e.currentTarget.classList.add("hover:bg-purple-100");
        }}
      >
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-slate-400">{body}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col items-center py-8">
      {!showRandomUser && (
        <div className="flex flex-wrap text-black justify-center gap-4 mb-8 w-full px-4">
          <Card
            title="Web Development"
            body="Connect with alumni to learn about current trends and opportunities in Web Development."
            onClick={handleCardClick}
            isActive={activeCard === "Web Development"}
          />
          <Card
            title="UI/UX Design"
            body="Engage with alumni to explore design techniques and career pathways."
            onClick={handleCardClick}
            isActive={activeCard === "UI/UX Design"}
          />
          <Card
            title="Data Science"
            body="Leverage your connections for insights into analytics, machine learning, and job prospects."
            onClick={handleCardClick}
            isActive={activeCard === "Data Science"}
          />
          <Card
            title="Java Development"
            body="Network with Java Development alumni to discuss coding best practices and career advancements."
            onClick={handleCardClick}
            isActive={activeCard === "Java Development"}
          />
        </div>
      )}
      {showRandomUser ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4"></h2>
          {randomUser && (
            <div>
              <p className="text-2xl font-extrabold text-white">
                {randomUser.name}
              </p>
              <Image
                src={randomUser.avatar}
                alt={randomUser.name}
                width={350}
                height={350}
                className="mx-auto mt-4 rounded-full"
              />
              <div className="bg-white bg-opacity-80 rounded-lg shadow-md p-4 mt-4 mx-4 sm:mx-0">
                <p className="text-gray-700 text-sm sm:text-base">
                  {randomUser.bio}
                </p>
              </div>
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full"
                  onClick={handleYesClick}
                >
                  Yes
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full"
                  onClick={handleNoClick}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="wheel relative">
          <Image
            className={`transition-all duration-[5000ms] ease-[cubic-bezier(0.3,1,0.7,1)] will-change-transform rounded-full shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-[350px] ${
              isSpinning ? "animate-spin" : ""
            }`}
            src={rouletteWheelImage}
            alt="Roulette Wheel"
            width={350}
            height={350}
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
      )}
      <div className="arrow absolute left-1/2 -translate-x-1/2 -translate-y-[50px] w-0 h-0 border-[40px] border-transparent border-t-[55px] border-t-tomato rounded-[0.35em] z-20" />

      {!showRandomUser && (
        <button
          className="mt-8 mb-20 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          Spin the Wheel
        </button>
      )}

      {showMessageCard && (
        <div className="bg-yellow-400 rounded-lg shadow-md p-4 mt-8 animate-bounce text-center">
          <p className="text-lg font-bold text-white">
            You successfully sent a connection request!
          </p>
        </div>
      )}
    </div>
  );
};

export default Roulette;
