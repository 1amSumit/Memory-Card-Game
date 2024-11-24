import { useRecoilState, useRecoilValue } from "recoil";
import { highScoreUsername, usernameState } from "../store/username";
import { highScoreState, userScoreState } from "../store/score";
import Board from "../components/Board";
import { useEffect, useState } from "react";

export default function Home() {
  const username = useRecoilValue(usernameState);
  const highScoreUser = useRecoilValue(highScoreUsername);
  const [userScore, setUserScore] = useRecoilState(userScoreState);
  const [highScore, setHighScore] = useRecoilState(highScoreState);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds <= 0) {
      return clearTimeout(timeout);
    }
  }, [seconds]);

  const cardIds = [1, 2, 3, 3, 2, 1, 1, 3, 2];

  return (
    <div className="h-screen overflow-hidden p-4 bg-gray-900">
      <div className="flex flex-row justify-between">
        <h2 className="text-gray-200 font-bold font-sour text-2xl">
          Hello {username}
        </h2>

        <div className="flex flex-col gap-1 ">
          <p className="font-sour text-2xl text-gray-200">
            Your Score: {userScore}
          </p>
          <p className="font-sour text-xl text-gray-200">
            High Score: {highScore} by {highScoreUser}
          </p>
        </div>
      </div>

      <div className=" flex flex-col items-center justify-center">
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
