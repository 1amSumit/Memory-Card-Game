import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameState } from "../store/username";
import {
  MdOutlineMusicNote as MusicOn,
  MdOutlineMusicOff as MusicOff,
} from "react-icons/md";

import { CiPause1 as Pause } from "react-icons/ci";

export default function RootLayout() {
  const [usr, setUsr] = useRecoilState(usernameState);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pauseHover, setPauseHover] = useState(false);
  // const [musicHover, setMusicHover] = useState(false);

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
      navigate("/play");
    }
  }, [navigate, setUsr]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        navigate("/play");
      } else if (event.key === "m" || event.key === "M") {
        toggleMusic();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate, toggleMusic]);

  return (
    <main className="h-[100vh] bg-gray-900 p-4 overflow-hidden flex flex-col">
      <div className="h-[90vh]">
        <Outlet />
      </div>
      <footer className="h-[10vh] flex flex-row gap-4">
        <div className="">
          {isPlaying ? (
            <MusicOn
              // onMouseEnter={() => {
              //   setMusicHover(true);
              // }}
              // onMouseLeave={() => {
              //   setMusicHover(false);
              // }}
              onClick={toggleMusic}
              className="text-gray-200  w-6 h-6 cursor-pointer"
            />
          ) : (
            <MusicOff
              // onMouseEnter={() => {
              //   setMusicHover(true);
              // }}
              // onMouseLeave={() => {
              //   setMusicHover(false);
              // }}
              onClick={toggleMusic}
              className="text-gray-200  w-6 h-6 cursor-pointer"
            />
          )}
          {/* {musicHover && (
            <span className="text-white">
              {isPlaying ? "Pause" : "Play"} music
            </span>
          )} */}
        </div>
        <div>
          <Pause
            onClick={() => navigate("/play")}
            onMouseLeave={() => {
              setPauseHover(false);
            }}
            onMouseEnter={() => {
              setPauseHover(true);
            }}
            className="text-gray-200 w-6 h-6 cursor-pointer"
          />
          {pauseHover && (
            <span className="text-white font-sour">Pause game</span>
          )}
        </div>
      </footer>

      <audio ref={audioRef} src="/gameMusic.mp3" loop autoPlay />
    </main>
  );
}
