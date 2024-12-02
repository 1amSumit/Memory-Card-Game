import { useRecoilState, useRecoilValue } from "recoil";
import { highScoreUsername, usernameState } from "../store/username";
import {
  easyHighScoreState,
  extremeHighScoreState,
  hardHighScoreState,
  highScoreState,
  mediumHighScoreState,
  userScoreEasyState,
  userScoreHardState,
  userScoreMediumState,
} from "../store/score";
import Board from "../components/Board";
import { gameLevelState } from "../store/level";
import { matchLevelState } from "../store/match";
import { turnState } from "../store/moves";
import BoardMedium from "../components/BoardMedium";
import BoardHard from "../components/BoardHard";
import BoardExtreme from "../components/BoardExtreme";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { playingState } from "../store/music";
import {
  MdOutlineMusicNote as MusicOn,
  MdOutlineMusicOff as MusicOff,
} from "react-icons/md";

import { CiPause1 as Pause } from "react-icons/ci";

export default function Home() {
  const [isPlaying, setIsPlaying] = useRecoilState(playingState);
  const username = useRecoilValue(usernameState);
  const highScoreUser = useRecoilValue(highScoreUsername);
  const [scoreEasy] = useRecoilState(userScoreEasyState);
  const [scoreMedium] = useRecoilState(userScoreMediumState);
  const [scoreHard] = useRecoilState(userScoreHardState);
  const [highScore, setHighScore] = useRecoilState(highScoreState);

  const [easyHighScore] = useRecoilState(easyHighScoreState);
  const [mediumHighScore] = useRecoilState(mediumHighScoreState);
  const [hardHighScore] = useRecoilState(hardHighScoreState);
  const [extremeHighScore] = useRecoilState(extremeHighScoreState);

  const level = useRecoilValue(gameLevelState);
  const match = useRecoilValue(matchLevelState);
  const [turns] = useRecoilState(turnState);

  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [pauseHover, setPauseHover] = useState(false);

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
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        navigate("/play");
      } else if (event.key === "m" || event.key === "M") {
        console.log("hakkk");
        toggleMusic();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate, toggleMusic]);

  useEffect(() => {
    setHighScore(
      (prev) =>
        prev +
        easyHighScore +
        mediumHighScore +
        hardHighScore +
        extremeHighScore
    );
  }, [easyHighScore, mediumHighScore, hardHighScore, extremeHighScore]);

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-[1rem]">
          <h2 className="text-gray-200 font-bold font-sour text-xl 2xl:text-4xl">
            Hello {username}
          </h2>

          <div>
            <p className="text-gray-200 text-lg 2xl:text-2xl font-sour">
              Level: {level}
            </p>
            <p className="text-gray-200 text-lg 2xl:text-2xl font-sour">
              Match: {match}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-sour text-sm sm:text-lg 2xl:text-2xl text-gray-200">
            Your Score:
            {level === "easy"
              ? scoreEasy
              : level === "medium"
              ? scoreMedium
              : scoreHard}
          </p>
          <p className="font-sour text-sm sm:text-lg 2xl:text-2xl text-gray-200">
            High Score: {highScore} by {highScoreUser}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center ">
        <p className="text-gray-200 text-xl 2xl:text-3xl font-sour">
          Turns: {turns}
        </p>
        {level === "easy" ? (
          <Board />
        ) : level === "medium" ? (
          <BoardMedium />
        ) : level === "hard" ? (
          <BoardHard />
        ) : (
          <BoardExtreme />
        )}
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

      <audio ref={audioRef} src="/gameMusic.mp3" loop />
    </div>
  );
}
