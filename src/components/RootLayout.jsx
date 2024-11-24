import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameState } from "../store/username";
import {
  MdOutlineMusicNote as MusicOn,
  MdOutlineMusicOff as MusicOff,
} from "react-icons/md";

export default function RootLayout() {
  const [usr, setUsr] = useRecoilState(usernameState);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username") || "";

    if (username.trim() === "") {
      console.log("No username found, redirecting to welcome.");
      navigate("/welcome");
    } else {
      console.log("Username found: ", username);
      setUsr(username);
      navigate("/");
    }
  }, [navigate, setUsr]);

  return (
    <main className="h-[100vh] overflow-hidden flex flex-col p-4 bg-gray-900">
      <div className="h-[90vh]">
        <Outlet />
      </div>
      <footer className="h-[10vh]">
        <div>
          {isPlaying ? (
            <MusicOn
              onClick={toggleMusic}
              className="text-gray-200  w-6 h-6 cursor-pointer"
            />
          ) : (
            <MusicOff
              onClick={toggleMusic}
              className="text-gray-200  w-6 h-6 cursor-pointer"
            />
          )}
        </div>
      </footer>

      <audio ref={audioRef} src="/gameMusic.mp3" loop autoPlay />
    </main>
  );
}
