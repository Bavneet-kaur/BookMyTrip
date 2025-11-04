'use client';

import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../components/Input";
import Button from "../components/Button";
import { IoAirplane } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-toastify";

type LoginData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: "onChange" });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginData) => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        // Save user data + token to localStorage
        localStorage.setItem("userInfo", JSON.stringify(result));

        toast.success(`Welcome back, ${result.name || "User"}!`);

        // Redirect based on role
        if (result.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      } else {
        toast.error(result.message || "Invalid email or password");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="bg-blue-500 w-16 h-16 flex items-center justify-center rounded-full">
            <IoAirplane size={30} color="white" />
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Log in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input
              type="email"
              label="Email"
              placeholder="john.doe@example.com"
              {...register("email", { required: "Email is required" })}
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
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              name="password"
              required
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
