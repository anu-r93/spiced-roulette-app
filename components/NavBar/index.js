import { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const router = useRouter();

  const handleIconClick = (icon) => {
    setActiveIcon(icon === activeIcon ? null : icon);
  };

  return (
    <nav className="bg-black py-8">
      <ul className="flex justify-center space-x-8">
        <li
          className={`cursor-pointer transition-colors duration-300  ${
            activeIcon === "home" ? "text-violet-500" : "text-gray-500"
          }`}
          onClick={() => handleIconClick("home")}
        >
          <Link href="/home">
            {activeIcon === "home" ? (
              <HomeIcon fontSize="large" className="mr-4" />
            ) : (
              <HomeOutlinedIcon fontSize="large" className="mr-4" />
            )}
            {router.pathname === "/home"}
          </Link>
        </li>
        <li
          className={`cursor-pointer transition-colors duration-300 ${
            activeIcon === "roulette" ? "text-violet-500" : "text-gray-500"
          }`}
          onClick={() => handleIconClick("roulette")}
        >
          <Link href="/roulette">
            {activeIcon === "roulette" ? (
              <TrackChangesIcon fontSize="large" className="mr-4" />
            ) : (
              <TrackChangesOutlinedIcon fontSize="large" className="mr-4" />
            )}
            {router.pathname === "/profile"}
          </Link>
        </li>
        <li
          className={`cursor-pointer transition-colors duration-300 ${
            activeIcon === "message" ? "text-violet-500" : "text-gray-500"
          }`}
          onClick={() => handleIconClick("message")}
        >
          <Link href="/message">
            {activeIcon === "message" ? (
              <MessageIcon fontSize="large" className="mr-4" />
            ) : (
              <MessageOutlinedIcon fontSize="large" className="mr-4" />
            )}
            {router.pathname === "/message"}
          </Link>
        </li>
        <li
          className={`cursor-pointer transition-colors duration-300 ${
            activeIcon === "profile" ? "text-violet-500" : "text-gray-500"
          }`}
          onClick={() => handleIconClick("profile")}
        >
          <Link href="/profile">
            {activeIcon === "profile" ? (
              <AccountCircleIcon fontSize="large" className="mr-4" />
            ) : (
              <AccountCircleOutlinedIcon fontSize="large" className="mr-4" />
            )}
            {router.pathname === "/profile"}
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
