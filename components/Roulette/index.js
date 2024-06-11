import Image from "next/image";
import RouletteWheelImage from "./../../assets/roulette-wheel.png";
import { useState } from "react";

const RouletteFirstScreen = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (title) => {
    setActiveCard(title);
  };

  const handleSpin = () => {
    setIsSpinning(true);
    const randomRotation = Math.floor(Math.random() * 360 + 720);
    setRotation(randomRotation);
    setTimeout(() => {
      setIsSpinning(false);
      setActiveCard(null);
    }, 5000);
  };

  const Card = ({ title, onClick, isActive }) => {
    return (
      <div
        className={`bg-white rounded-lg shadow-md p-4 w-full max-w-xs cursor-pointer ${
          isActive ? "border-2 border-violet-500" : ""
        }`}
        onClick={onClick}
      >
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col items-center py-8">
      <div className="flex flex-wrap text-black justify-center gap-4 mb-8 w-full px-4">
        <Card
          title="Web Development"
          onClick={() => handleCardClick("Web Development")}
          isActive={activeCard === "Web Development"}
        />
        <Card
          title="UI/UX Design"
          onClick={() => handleCardClick("UI/UX Design")}
          isActive={activeCard === "UI/UX Design"}
        />
        <Card
          title="Data Science"
          onClick={() => handleCardClick("Data Science")}
          isActive={activeCard === "Data Science"}
        />
        <Card
          title="Java Development"
          onClick={() => handleCardClick("Java Development")}
          isActive={activeCard === "Java Development"}
        />
      </div>
      <div className="wheel relative">
        <Image
          className={`transition-all duration-[5000ms] ease-[cubic-bezier(0.3,1,0.7,1)] will-change-transform rounded-full shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-[350px] ${
            isSpinning ? "animate-spin" : ""
          }`}
          src={RouletteWheelImage}
          alt="Roulette Wheel"
          width={350}
          height={350}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
      <div className="arrow absolute left-1/2 -translate-x-1/2 -translate-y-[50px] w-0 h-0 border-[40px] border-transparent border-t-[55px] border-t-tomato rounded-[0.35em] z-20" />

      <button
        className="mt-8 mb-20 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={handleSpin}
        disabled={isSpinning}
      >
        Spin the Wheel
      </button>
    </div>
  );
};

export default RouletteFirstScreen;

{
  /* <Image
  class="mt-20"
  src={RouletteWheelImage}
  width={500}
  height={500}
  alt="Roulette Wheel picture"
/>; */
}
