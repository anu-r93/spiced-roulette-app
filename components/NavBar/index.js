import HomeIcon from "@mui/icons-material/Home";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  console.log(router);

  return (
    <nav className="bg-black py-6">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link
            href="/home"
            className={`flex items-center text-white hover:text-gray-300 ${
              router?.pathname === "/home" ? "text-blue-500" : ""
            }`}
          >
            <HomeIcon className="mr-2" />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/roulette-I"
            className={`flex items-center text-white hover:text-gray-300 ${
              router.pathname === "/roulette-I" ? "text-blue-500" : ""
            }`}
          >
            <TrackChangesIcon className="mr-2" />
            Roulette
          </Link>
        </li>
        <li>
          <Link
            href="/message"
            className={`flex items-center text-white hover:text-gray-300 ${
              router.pathname === "/message" ? "text-blue-500" : ""
            }`}
          >
            <MessageIcon className="mr-2" />
            Inbox
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className={`flex items-center text-white hover:text-gray-300 ${
              router.pathname === "/profile" ? "text-blue-500" : ""
            }`}
          >
            <PersonIcon className="mr-2" />
            Profile
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
