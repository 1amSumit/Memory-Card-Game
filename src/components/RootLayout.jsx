import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameState } from "../store/username";
import {
  MdOutlineMusicNote as MusicOn,
  MdOutlineMusicOff as MusicOff,
} from "react-icons/md";

import { CiPause1 as Pause } from "react-icons/ci";
import {
  easyHighScoreState,
  hardHighScoreState,
  mediumHighScoreState,
  userScoreEasyState,
  userScoreHardState,
  userScoreMediumState,
} from "../store/score";

export default function RootLayout() {
  const [usr, setUsr] = useRecoilState(usernameState);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pauseHover, setPauseHover] = useState(false);

  const [scoreEasy, setScoreEasy] = useRecoilState(userScoreEasyState);
  const [scoreMedium, setScoreMedium] = useRecoilState(userScoreMediumState);
  const [scoreHard, setScoreHard] = useRecoilState(userScoreHardState);

  const [easyHighScore, setEasyHighScore] = useRecoilState(easyHighScoreState);
  const [mediumHighScore, setMediumScore] =
    useRecoilState(mediumHighScoreState);

  const [hardHighScore, setHardHighScore] = useRecoilState(hardHighScoreState);

  useEffect(() => {
    const easyScore = parseInt(localStorage.getItem("easyScore")) || 0;
    const mediumScore = parseInt(localStorage.getItem("mediumScore")) || 0;
    const hardScore = parseInt(localStorage.getItem("hardScore")) || 0;

    const easyHighScore = parseInt(localStorage.getItem("easyHighScore")) || 0;
    const mediumHighScore =
      parseInt(localStorage.getItem("mediumHighScore")) || 0;
    const hardHighScore = parseInt(localStorage.getItem("hardHighScore")) || 0;

    setScoreEasy(easyScore);
    setScoreMedium(mediumScore);
    setScoreHard(hardScore);

    setEasyHighScore(easyHighScore);
    setMediumScore(mediumHighScore);
    setHardHighScore(hardHighScore);
  }, []);

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
      navigate("/welcome");
    } else {
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
    <main className="h-[100vh] bg-gray-900 p-1 lg:p-4 overflow-hidden flex flex-col">
      <div className="h-[90vh]">
        <Outlet />
      </div>
      <footer className="h-[10vh] flex flex-row gap-4">
        <div className="">
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
