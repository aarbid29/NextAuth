"use client"; // enabling the component to run on the client side
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  useEffect(() => {
    // Extract the token from the URL once when the component mounts
    const urlToken = new URLSearchParams(window.location.search).get("token");
    console.log(urlToken);
    setToken(urlToken || "");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onReset = async () => {
    try {
      setLoading(true);

      if (!token) {
        console.log("Token is missing");
        setError(true);
        return;
      }
      if (!user.password || !user.confirmpassword) {
        console.log("Passwords are missing");
        setError(true);
        return;
      }

      await axios.post("/api/users/changepassword", {
        token,
        password: user.password,
        confirmpassword: user.confirmpassword,
      });

      setVerified(true);
      router.push("/login");
    } catch (err: any) {
      setError(true);
      console.log("Error occurred while verifying:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">
        {loading ? "Processing..." : "Reset Password"}
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      {verified && (
        <p className="text-green-500">Password has been reset successfully!</p>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />
      <input
        type="password"
        name="confirmpassword"
        placeholder="Confirm Password"
        value={user.confirmpassword}
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
        {loading ? "Resetting..." : "Reset Password"}
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
