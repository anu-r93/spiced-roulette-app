import React from "react";
import Link from "next/link";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LoginPage = () => {
  return (
    <>
      <div className="container">
        <h2>Login</h2>
        <LoginForm />
        <p>
          Dont have an account? <Link href="/register">Sign Up</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
