import { useState, useEffect } from "react";
import {
  HomeOutlined,
  Home,
  MessageOutlined,
  Message,
  AccountCircleOutlined,
  AccountCircle,
  TrackChangesOutlined,
  TrackChanges,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.pathname.split("/")[1];
    setActiveIcon(currentPath || null);
  }, [router.pathname]);

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
    router.push(`/${icon}`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 bg-opacity-50 backdrop-filter backdrop-blur-lg border-t border-purple-200 py-4 hover:ring-4">
      <ul className="flex justify-center space-x-8">
        <li
          className={`cursor-pointer transition-colors duration-300 ${
            activeIcon === "home" ? "text-white" : "text-gray-300"
          }`}
          onClick={() => handleIconClick("home")}
        >
          <Link href="/home">
            {activeIcon === "home" ? (
              <Home fontSize="large" className="mr-4" />
            ) : (
              <HomeOutlined fontSize="large" className="mr-4" />
            )}
          </Link>
        </li>
        <li
          className={`cursor-pointer transition-colors duration-300 ${
            activeIcon === "roulette" ? "text-white" : "text-gray-300"
          }`}
          onClick={() => handleIconClick("roulette")}
        >
          <Link href="/roulette">
            {activeIcon === "roulette" ? (
              <TrackChanges fontSize="large" className="mr-4" />
            ) : (
              <TrackChangesOutlined fontSize="large" className="mr-4" />
            )}
          </Link>
        </li>
        <li
          className={`cursor-pointer transition-colors duration-300 ${
            activeIcon === "message" ? "text-white" : "text-gray-300"
          }`}
          onClick={() => handleIconClick("message")}
        >
          <Link href="/message">
            {activeIcon === "message" ? (
              <Message fontSize="large" className="mr-4" />
            ) : (
              <MessageOutlined fontSize="large" className="mr-4" />
            )}
          </Link>
        </li>
        <li
          className={`cursor-pointer transition-colors duration-300 ${
            activeIcon === "profile" ? "text-white" : "text-gray-300"
          }`}
          onClick={() => handleIconClick("profile")}
        >
          <Link href="/profile">
            {activeIcon === "profile" ? (
              <AccountCircle fontSize="large" className="mr-4" />
            ) : (
              <AccountCircleOutlined fontSize="large" className="mr-4" />
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

/* return (
    <nav>
      <ul>
        <li>
          <Link href="/home" alt="home">
            Home
          </Link>
        </li>
        <li>
          <Link href="/roulette-I" alt="roulette-I">
            Roulette
          </Link>
        </li>
        <li>
          <Link href="/message" alt="inbox">
            Inbox
          </Link>
        </li>
        <li>
          <Link href="/profile" alt="profile">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};*/
