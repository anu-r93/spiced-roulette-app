import Link from "next/link";
import React from "react";
import Name from "./Name";
import { useForm } from "react-hook-form";
import Email from "./Email";
import { ConfirmPassword, Password } from "./Password";
import SubmitButton from "./Button";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const { fullName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      // Show error message
      return false;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (response.status === 201) {
        router.push("/home");
      }
    } catch (error) {
      // Error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full max-w-md  p-8">
        <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Name control={control} />
            <Email control={control} />
            <Password control={control} />
            <ConfirmPassword control={control} />
            <span>
              {formState.isSubmitted &&
              getValues("password") !== getValues("confirmPassword")
                ? "Passwords do not match"
                : ""}
            </span>
            <SubmitButton text="Register" />
          </form>
        </div>
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              className="text-purple-600 hover:text-purple-800 font-bold"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
