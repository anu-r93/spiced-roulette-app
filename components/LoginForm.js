import Link from "next/link";
import React from "react";
import { Password } from "./Password";
import { useForm } from "react-hook-form";
import Email from "./Email";
import SubmitButton from "./Button";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { handleSubmit, control } = useForm({ mode: "onTouched" });
  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        router.push("/home");
      }
    } catch (error) {
      // Error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full max-w-md p-8">
        <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Email control={control} />
            <Password control={control} />
            <SubmitButton text={"Login"} />
          </form>
        </div>
        <div className="text-center">
          <p className="text-gray-600">
            Dont have an account?{" "}
            <Link
              className="text-purple-600 hover:text-purple-800 font-bold"
              href="/register"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
