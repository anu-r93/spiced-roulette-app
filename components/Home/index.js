import Image from "next/image";
import CoffeeChatImage from "./../../assets/coffee-chat-transparent.png";
import Link from "next/link";

const HomeComponent = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r items-center from-purple-500 to-indigo-500">
      <div>
        <Image
          class="mt-20"
          src={CoffeeChatImage}
          width={700}
          height={700}
          alt="Homepage picture"
        />
      </div>
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 mx-10 text-center">
        <p className="font-bold text-xl text-black">
          Tech Brews: Code, Coffee, Connect
        </p>
        <p className="px-7 mt-5 text-slate-400">
          Fuel your creativity with coffee and connect with fellow tech
          enthusiasts in a relaxed and inspiring environment
        </p>
        <button
          className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          <Link href="/roulette">Get started</Link>
        </button>
      </div>
    </div>
  );
};

export default HomeComponent;
