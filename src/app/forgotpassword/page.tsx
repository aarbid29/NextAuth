"use client"; // enabling the component to run on the client side
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPassword() {
  const router = useRouter(); // to push/navigate into a page

  const [user, setUser] = React.useState({
    email: "",
  });
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = React.useState(false);

  const onReset = async () => {
    try {
      setLoading(true);

      await axios.post("/api/users/resetPassword", user);

      router.push("/login");
    } catch (error: any) {
      console.log("error occured while resseting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">
        {loading ? "Processing..." : "Reset Password"}
      </h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <button
        onClick={onReset}
        disabled={loading}
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
          loading ? "bg-gray-300 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Loading" : "Reset Password"}
      </button>
      <p>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}
