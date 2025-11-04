'use client';

import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../components/Input";
import Button from "../components/Button";
import { IoAirplane } from "react-icons/io5";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage("");

    if (data.password !== data.confirmPass) {
      setMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: "user", 
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Signup successful! 🎉");
        console.log("User created:", result);

        // Optionally save token for auto-login
        localStorage.setItem("token", result.token);

        // Redirect to login page or dashboard
        window.location.href = "/login";
      } else {
        setMessage(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while signing up.");
    } finally {
      setLoading(false);
    }
  };

  const passwordValue = watch("password");

  const passwordInvalid =
    passwordValue !== undefined &&
    passwordValue.length > 0 &&
    passwordValue.length < 8;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="bg-blue-500 w-16 h-16 flex items-center justify-center rounded-full">
            <IoAirplane size={30} color="white" />
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Join us today and get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              name="name"
              required
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div>
            <Input
              type="email"
              label="Email"
              placeholder="john.doe@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              name="email"
              required
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div>
            <Input
              type="password"
              label="Password"
              placeholder="Choose a strong password"
              {...register("password", {
                required: "Password is required",
                minLength: 8,
              })}
              name="password"
              required
            />
            <span
              className={`block mt-1 text-xs ${
                passwordInvalid ? "text-red-500" : "text-gray-400"
              }`}
            >
              Password must be at least 8 characters
            </span>
          </div>

          <div>
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              {...register("confirmPass", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
              name="confirmPass"
              required
            />
            {errors.confirmPass && (
              <span className="text-red-500 text-sm">
                {errors.confirmPass.message}
              </span>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        {message && (
          <p
            className={`text-center text-sm mt-4 ${
              message.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
