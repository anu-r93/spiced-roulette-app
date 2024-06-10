import React from "react";
import Link from "next/link";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="container">
      <h2>Sign Up</h2>
      <RegisterForm />
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
