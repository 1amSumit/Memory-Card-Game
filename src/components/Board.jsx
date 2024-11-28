import { RiPlantLine } from "react-icons/ri";
import { TbPlant2 } from "react-icons/tb";
import { PiPlant } from "react-icons/pi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { matchLevelState } from "../store/match";
import { gameLevelState } from "../store/level";
import {
  easyHighScoreState,
  hardHighScoreState,
  mediumHighScoreState,
  userScoreEasyState,
  userScoreHardState,
  userScoreMediumState,
} from "../store/score";
import { turnState } from "../store/moves";

export default function Board() {
  const cards = [
    { id: 1, name: "plant 1", icon: <RiPlantLine className="w-8 h-8" /> },
    { id: 2, name: "plant 2", icon: <TbPlant2 className="w-8 h-8" /> },
    { id: 3, name: "plant 3", icon: <PiPlant className="w-8 h-8" /> },
    // { id: 4, name: "plant 4", icon: <PiPlant className="w-8 h-8" /> },
    // { id: 5, name: "plant 5", icon: <PiPlant className="w-8 h-8" /> },
    // { id: 6, name: "plant 6", icon: <PiPlant className="w-8 h-8" /> },
  ];
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCard, setFlippedCard] = useState([]);
  const [matchedPair, setMatchedPair] = useState(0);
  const [match, setMatch] = useRecoilState(matchLevelState);

  const level = useRecoilValue(gameLevelState);
  const [scoreEasy, setScoreEasy] = useRecoilState(userScoreEasyState);
  const [scoreMedium, setScoreMedium] = useRecoilState(userScoreMediumState);
  const [scoreHard, setScoreHard] = useRecoilState(userScoreHardState);
  const [easyHighScore, setEasyHighScore] = useRecoilState(easyHighScoreState);
  const [mediumHighScore, setMediumHighScore] =
    useRecoilState(mediumHighScoreState);
  const [hardHighScore, setHardHighScore] = useRecoilState(hardHighScoreState);
  const [turns, setTurns] = useRecoilState(turnState);

  useEffect(() => {
    localStorage.setItem("easyScore", scoreEasy);
    localStorage.setItem("mediumScore", scoreMedium);
    localStorage.setItem("hardScore", scoreHard);
    localStorage.setItem("easyHighScore", easyHighScore);
    localStorage.setItem("mediumHighScore", mediumHighScore);
    localStorage.setItem("hardHighScore", hardHighScore);
  }, [
    scoreEasy,
    scoreMedium,
    scoreHard,
    easyHighScore,
    mediumHighScore,
    hardHighScore,
  ]);

  const shuffleCards = (cards) => {
    const dupliacteCards = [...cards, ...cards];
    const shuffleCards = dupliacteCards
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        id: index,
        name: card.name,
        icon: card.icon,
        isFlipped: false,
        isMatched: false,
      }));

    setFlippedCard([]);
    setMatchedPair(0);

    setShuffledCards(shuffleCards);
  };

  useEffect(() => {
    if (matchedPair === cards.length) {
      setTimeout(() => {
        setMatch((prev) => prev + 1);
        shuffleCards(cards);

        if (level === "easy") {
          if (timePased <= 10 && timePased > 5) {
            setScoreEasy((prev) => prev + 5);
            setScoreEasy((prev) => prev + 10);
          } else if (timePased > 0 && timePased <= 5) {
            setScoreEasy((prev) => prev + 10);
            setScoreEasy((prev) => prev + 10);
          } else {
            setScoreEasy((prev) => prev + 10);
          }

          if (scoreEasy > easyHighScore) {
            setEasyHighScore(scoreEasy);
          }
        }
        if (level === "medium") {
          if (timePased <= 10 && timePased > 5) {
            setScoreMedium((prev) => prev + 5);
            setScoreMedium((prev) => prev + 20);
          } else if (timePased > 0 && timePased <= 5) {
            setScoreMedium((prev) => prev + 10);
            setScoreMedium((prev) => prev + 20);
          } else {
            setScoreMedium((prev) => prev + 20);
          }

          if (scoreMedium > mediumHighScore) {
            setMediumHighScore(scoreMedium);
          }
        }
        if (level === "hard") {
          if (timePased <= 10 && timePased > 5) {
            setScoreHard((prev) => prev + 5);
            setScoreHard((prev) => prev + 30);
          } else if (timePased > 0 && timePased <= 5) {
            setScoreHard((prev) => prev + 10);
            setScoreHard((prev) => prev + 30);
          } else {
            setScoreHard((prev) => prev + 30);
          }
          if (scoreHard > hardHighScore) {
            setHardHighScore(scoreHard);
          }
        }

        setTimePased(0);
      }, 1000);
    }
  }, [matchedPair, cards.length, setMatch]);

  useEffect(() => {
    shuffleCards(cards);
  }, []);

  useEffect(() => {
    if (flippedCard.length === 2) {
      const [firstCard, secondCard] = flippedCard;
      if (shuffledCards[firstCard].name === shuffledCards[secondCard].name) {
        setShuffledCards((prevCards) =>
          prevCards.map((card, index) =>
            index === firstCard || index === secondCard
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPair((prev) => prev + 1);
      }

      setTimeout(() => setFlippedCard([]), 600);
    }
  }, [flippedCard]);

  const handleCardClick = (id) => {
    if (flippedCard.length === 2) return;
    if (flippedCard.includes(id)) return;

    setFlippedCard((prev) => {
      const newFlipped = [id, ...prev];
      console.log(newFlipped);
      return newFlipped;
    });

    setShuffledCards((prevCards) =>
      prevCards.map((card, i) =>
        i === id ? { ...card, isFlipped: true } : card
      )
    );
  };

  return (
    <div className="bg-gray-900 p-2 lg:p-4">
      <div className="h-screen lg:mt-[4rem] justify-center p-8">
        <div className="grid grid-cols-3 w-full max-w-md  justify-center gap-2">
          {shuffledCards.map((card, index) => (
            <motion.div
              animate={{
                rotateY:
                  flippedCard.includes(card.id) || card.isMatched ? 180 : 0,
              }}
              transition={{ duration: 0.4 }}
              key={index}
              onClick={() => handleCardClick(card.id)}
              className={`w-[5rem] h-[5rem] rounded-xl  cursor-pointer flex items-center justify-center ${
                flippedCard.includes(card.id) || card.isMatched
                  ? "bg-purple-600"
                  : "bg-yellow-400"
              }`}
            >
              <div
                className={`${
                  flippedCard.includes(card.id) || card.isMatched
                    ? "block"
                    : "hidden"
                }`}
              >
                {card.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
