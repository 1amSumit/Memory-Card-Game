import { useState, useEffect } from "react";
import { MenuButton } from "../components/MenuButton";
import { useNavigate } from "react-router-dom";

export function PlayGame() {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div
        className={`bg-gray-900 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 ease-in-out ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-8 animate-pulse">
          Memory Maestro
        </h1>
        <div className=" flex flex-col gap-8 md:flex-row  items-center justify-center">
          <MenuButton onClick={() => navigate("/")}>Play</MenuButton>
          <MenuButton onClick={() => console.log("Settings clicked")}>
            Settings
          </MenuButton>
          <MenuButton onClick={() => navigate("/level")}>Levels</MenuButton>
        </div>
      </div>
    </div>
  );
}
