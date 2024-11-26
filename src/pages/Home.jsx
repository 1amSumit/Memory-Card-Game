import { useRecoilState, useRecoilValue } from "recoil";
import { highScoreUsername, usernameState } from "../store/username";
import {
  highScoreState,
  userScoreEasyState,
  userScoreHardState,
  userScoreMediumState,
} from "../store/score";
import Board from "../components/Board";
import { useEffect, useState } from "react";
import { gameLevelState } from "../store/level";
import { matchLevelState } from "../store/match";
import { timeState } from "../store/Timer";

export default function Home() {
  const username = useRecoilValue(usernameState);
  const highScoreUser = useRecoilValue(highScoreUsername);
  const [scoreEasy, setScoreEasy] = useRecoilState(userScoreEasyState);
  const [scoreMedium, setScoreMedium] = useRecoilState(userScoreMediumState);
  const [scoreHard, setScoreHard] = useRecoilState(userScoreHardState);

  const [highScore, setHighScore] = useRecoilState(highScoreState);
  const level = useRecoilValue(gameLevelState);
  const match = useRecoilValue(matchLevelState);
  const [time, setTime] = useRecoilState(timeState);
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    setSeconds(time);
  }, [time]);

  useEffect(() => {
    if (seconds <= 0) {
      setSeconds(0);
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, setTime]);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-[2rem]">
          <h2 className="text-gray-200 font-bold font-sour text-4xl">
            Hello {username}
          </h2>

          <div>
            <p className="text-gray-200 text-2xl font-sour">Level: {level}</p>
            <p className="text-gray-200 text-2xl font-sour">Match: {match}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-sour text-2xl text-gray-200">
            Your Score:{" "}
            {level === "easy"
              ? scoreEasy
              : level === "medium"
              ? scoreMedium
              : scoreHard}
          </p>
          <p className="font-sour text-xl text-gray-200">
            High Score: {highScore} by {highScoreUser}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-200 text-3xl font-sour">Timer: {seconds}</p>

        {seconds === 0 ? (
          <p className="text-xl text-gray-200">Restart</p>
        ) : (
          <Board />
        )}
      </div>
    </div>
  );
}
