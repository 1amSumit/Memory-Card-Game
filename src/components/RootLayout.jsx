import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { usernameState } from "../store/username";

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
