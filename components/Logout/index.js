import { useRouter } from "next/router";
import { FiPower } from "react-icons/fi";

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Delete all cookies
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Perform any additional logout actions here, such as clearing user data or state

    // Redirect to the login page or any other desired page
    router.push("/login");
  };

  return (
    <button
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 ml-4 flex items-center"
      type="submit"
      onClick={handleLogout}
    >
      <FiPower />
    </button>
  );
};

export default Logout;
