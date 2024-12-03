import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { usernameState } from "../store/username";

import {
  easyHighScoreState,
  extremeHighScoreState,
  hardHighScoreState,
  mediumHighScoreState,
  userScoreEasyState,
  userScoreExtremeState,
  userScoreHardState,
  userScoreMediumState,
} from "../store/score";

export default function RootLayout() {
  const [usr, setUsr] = useRecoilState(usernameState);
  const navigate = useNavigate();

  const [scoreEasy, setScoreEasy] = useRecoilState(userScoreEasyState);
  const [scoreMedium, setScoreMedium] = useRecoilState(userScoreMediumState);
  const [scoreHard, setScoreHard] = useRecoilState(userScoreHardState);
  const [scoreExtreme, setScoreExtreme] = useRecoilState(userScoreExtremeState);

  const [easyHighScore, setEasyHighScore] = useRecoilState(easyHighScoreState);
  const [mediumHighScore, setMediumScore] =
    useRecoilState(mediumHighScoreState);

  const [hardHighScore, setHardHighScore] = useRecoilState(hardHighScoreState);
  const [extremeHighScore, setExtremeHighScore] = useRecoilState(
    extremeHighScoreState
  );

  useEffect(() => {
    const easyScore = parseInt(localStorage.getItem("easyScore")) || 0;
    const mediumScore = parseInt(localStorage.getItem("mediumScore")) || 0;
    const hardScore = parseInt(localStorage.getItem("hardScore")) || 0;
    const extremeScore = parseInt(localStorage.getItem("extremeScore")) || 0;

    const easyHighScore = parseInt(localStorage.getItem("easyHighScore")) || 0;
    const mediumHighScore =
      parseInt(localStorage.getItem("mediumHighScore")) || 0;
    const hardHighScore = parseInt(localStorage.getItem("hardHighScore")) || 0;
    const extremeHighScore =
      parseInt(localStorage.getItem("extremeHighScore")) || 0;

    setScoreEasy(easyScore);
    setScoreMedium(mediumScore);
    setScoreHard(hardScore);
    setScoreExtreme(extremeScore);

    setEasyHighScore(easyHighScore);
    setMediumScore(mediumHighScore);
    setHardHighScore(hardHighScore);
    setExtremeHighScore(extremeHighScore);
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username") || "";

    if (username.trim() === "") {
      navigate("/welcome");
    } else {
      setUsr(username);
      navigate("/play");
    }
  }, [navigate, setUsr]);

  return (
    <main className="h-[100vh] bg-gray-900 p-1 lg:p-4 overflow-hidden flex flex-col">
      <div className="h-[90vh]">
        <Outlet />
      </div>
    </main>
  );
}
