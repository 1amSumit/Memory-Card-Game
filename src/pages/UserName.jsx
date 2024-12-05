import React, { useState } from "react";
import { FaPlay, FaBrain } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameState } from "../store/username";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/registerUser";
import toast from "react-hot-toast";

const UserName = () => {
  const [username, setUsername] = useRecoilState(usernameState);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.isUnique) {
        // Only set username in localStorage if it's unique
        localStorage.setItem("username", username);
        toast.success("User Registration Successfully!");
        navigate("/");
      } else {
        // Show error message if the username is not unique
        setErr("Username already taken. Please choose another one.");
      }
    },
    onError: (error) => {
      toast.error("Error registering user: " + error.message);
      setErr(error.message);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setErr("Please enter a username");
      return;
    }

    // Reset error before making the mutation call
    setErr("");
    mutate({ username });
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    if (err) {
      setErr(""); // Reset error when user starts typing again
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <CardFlipSVG />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Memory Maestro
        </h1>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-2 items-center justify-center">
            <label htmlFor="username">Enter your name</label>
            <input
              type="text"
              placeholder="John"
              id="username"
              className="border-[1px] w-full border-green-500 px-6 py-3 mb-1 rounded-full outline-none placeholder:font-bold font-bold"
              value={username}
              onChange={handleInputChange}
            />
            {err && <p className="text-red-500 mb-2">{err}</p>}
          </div>
          <button
            type="submit"
            className="bg-green-500 w-full hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-auto"
          >
            <FaPlay className="mr-2" />
            Start Game
          </button>
        </form>
        <div className="mt-8 flex items-center justify-center text-gray-500">
          <FaBrain className="mr-2" />
          <span>Train your brain, have fun!</span>
        </div>
      </div>
    </div>
  );
};

const CardFlipSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className="w-32 h-32 mx-auto"
    >
      <rect x="10" y="10" width="80" height="120" rx="10" fill="#4CAF50" />
      <rect
        x="110"
        y="10"
        width="80"
        height="120"
        rx="10"
        fill="#2196F3"
        transform="rotate(15 150 70)"
      />
      <text x="50" y="80" fontSize="40" fill="white" textAnchor="middle">
        ?
      </text>
      <text
        x="150"
        y="80"
        fontSize="40"
        fill="white"
        textAnchor="middle"
        transform="rotate(15 150 70)"
      >
        !
      </text>
    </svg>
  );
};

export default UserName;
