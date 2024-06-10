// import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
const Home = () => {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default Home;
