// import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import HomePage from "./home/home";
import LoginPage from "./login";
const LoginAndRegistrationPage = () => {
  // const [showLogin, setShowLogin] = useState(true);

  // const toggleForm = () => {
  //   setShowLogin(!showLogin);
  // };

  return (
    <div>
      <LoginPage />
    </div>
    /* {showLogin ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <RegisterForm toggleForm={toggleForm} />
      )} */
  );
};

export default LoginAndRegistrationPage;
