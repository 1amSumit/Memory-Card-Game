import React from "react";

export const LevelButton = ({ difficulty, selected, onClick }) => {
  const baseClasses =
    "w-full p-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const textClasses = "text-center font-bold";

  const difficultyColors = {
    Easy: "bg-green-500 hover:bg-green-600 focus:ring-green-400",
    Medium: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400",
    Hard: "bg-red-500 hover:bg-red-600 focus:ring-red-400",
    Extreme: "bg-purple-500 hover:bg-purple-600 focus:ring-purple-400",
  };

  const selectedClasses = selected
    ? "ring-4 ring-white ring-opacity-60 scale-105"
    : "opacity-80 hover:opacity-100";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${difficultyColors[difficulty]} ${selectedClasses}`}
    >
      <h2 className={`${textClasses} text-2xl mb-2`}>{difficulty}</h2>
    </button>
  );
};
