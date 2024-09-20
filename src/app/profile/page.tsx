"use client"; // to enable the component to run on the client side
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState(null); // Initialize with null

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (err) {
      console.log("Error occurred while logging out:", err);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
    } catch (err) {
      console.log("Error occurred while getting user details:", err);
    }
  };
  useEffect(() => {
    getUserDetails(); // Call getUserDetails on component mount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-3 rounded bg-green-500">
        {data ? <Link href={`/profile /${data}`}>{data}</Link> : "Nothing"}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="px-4 py-2 bg-green-800 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
      >
        Get User Details
      </button>
    </div>
  );
}
