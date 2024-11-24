import React from "react";
import { FaBrain } from "react-icons/fa";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <CardFlipSVG />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Memory Maestro
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Challenge your mind with our exciting memory match game!
        </p>
        <Link
          to={"/username"}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-auto"
        >
          Welcome
        </Link>
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

export default Welcome;
