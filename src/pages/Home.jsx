import { useRecoilState, useRecoilValue } from "recoil";
import { highScoreUsername, usernameState } from "../store/username";
import {
  easyHighScoreState,
  hardHighScoreState,
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
import BoardHigh from "../components/BoardMedium";
import BoardHard from "../components/BoardHard";
import BoardExtreme from "../components/BoardExtreme";

export default function Home() {
  const username = useRecoilValue(usernameState);
  const highScoreUser = useRecoilValue(highScoreUsername);
  const [scoreEasy, setScoreEasy] = useRecoilState(userScoreEasyState);
  const [scoreMedium, setScoreMedium] = useRecoilState(userScoreMediumState);
  const [scoreHard, setScoreHard] = useRecoilState(userScoreHardState);

  const [easyHighScore, setEasyHighScore] = useRecoilState(easyHighScoreState);
  const [mediumHighScore, setMediumScore] =
    useRecoilState(mediumHighScoreState);
  const [hardHighScore, setHardHighScore] = useRecoilState(hardHighScoreState);

  const level = useRecoilValue(gameLevelState);
  const match = useRecoilValue(matchLevelState);
  const [turns, setTurns] = useRecoilState(turnState);

  return (
    <div>
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
            High Score:{" "}
            {level === "easy"
              ? easyHighScore
              : level === "medium"
              ? mediumHighScore
              : hardHighScore}{" "}
            by {highScoreUser}
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
    </div>
  );
}
