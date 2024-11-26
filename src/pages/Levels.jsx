import React, { useState } from "react";

import { useRecoilState } from "recoil";
import { gameLevelState } from "../store/level";
import { LevelButton } from "../components/LevelsButton";
import { useNavigate } from "react-router-dom";

export default function Levels() {
  const [selectedLevel, setSelectedLevel] = useRecoilState(gameLevelState);
  const [visible, setVisible] = useState(true);

  const navigate = useNavigate();

  const levels = [
    { level: "1-10", difficulty: "Easy" },
    { level: "11-20", difficulty: "Medium" },
    { level: "21-30", difficulty: "Hard" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <div
        className={`bg-gray-800 p-8 rounded-3xl shadow-2xl transform transition-all duration-500 ease-in-out ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Choose Your Level
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {levels.map(({ level, difficulty }) => (
            <LevelButton
              key={level}
              difficulty={difficulty}
              onClick={() => setSelectedLevel(difficulty.toLowerCase())}
            />
          ))}
        </div>
        {selectedLevel && (
          <div className="mt-8 text-center">
            <p className="text-white text-xl mb-4">
              You selected: <span className="font-bold">{selectedLevel}</span>
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
