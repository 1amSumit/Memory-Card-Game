import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { gameLevelState } from "../store/level";
import { matchLevelState } from "../store/match";
import { turnState } from "../store/moves";
import { easyHighScoreState, userScoreEasyState } from "../store/score";

export default function Board() {
  const audioFlipRef = useRef();
  const audioFlipFailRef = useRef();

  const playFlipSound = () => {
    console.log("hall");
    if (audioFlipRef.current) {
      audioFlipRef.current.play();
    }
  };
  const playFlipFailSound = () => {
    console.log("jhkh");
    if (audioFlipFailRef.current) {
      audioFlipFailRef.current.play();
    }
  };

  const cards = [
    {
      id: 1,
      name: "plant 1",
      icon: <img src="/plant/p-1.png" className="w-8 h-8" />,
    },
    {
      id: 2,
      name: "plant 2",
      icon: <img src="/plant/p-2.png" className="w-8 h-8" />,
    },
    {
      id: 3,
      name: "plant 3",
      icon: <img src="/plant/p-3.png" className="w-8 h-8" />,
    },
  ];
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCard, setFlippedCard] = useState([]);
  const [matchedPair, setMatchedPair] = useState(0);
  const [match, setMatch] = useRecoilState(matchLevelState);

  const [level, setLevel] = useRecoilState(gameLevelState);
  const [scoreEasy, setScoreEasy] = useRecoilState(userScoreEasyState);
  const [easyHighScore, setEasyHighScore] = useRecoilState(easyHighScoreState);

  const [turns, setTurns] = useRecoilState(turnState);

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

        if (match > 4) {
          setLevel("medium");
          setMatch(1);
        }

        shuffleCards(cards);

        if (level === "easy") {
          if (turns > cards.length + 3) {
            setScoreEasy((prev) => prev + 15);
          } else if (turns === cards.length || turns === cards.length + 1) {
            setScoreEasy((prev) => prev + 20);
          } else {
            setScoreEasy((prev) => prev + 10);
          }
        }

        setTurns(0);
      }, 1000);
    }
  }, [matchedPair, cards.length, setMatch, setTurns]);

  useEffect(() => {
    if (scoreEasy > easyHighScore) {
      localStorage.setItem("easyHighScore", easyHighScore);
      setEasyHighScore(scoreEasy);
    }
  }, [scoreEasy]);

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
      } else {
        setTimeout(() => {
          playFlipFailSound();
        }, 800);
      }

      setTimeout(() => {
        setFlippedCard([]);
      }, 800);
    }
  }, [flippedCard]);

  const handleCardClick = (id) => {
    if (flippedCard.length === 2) return;
    if (flippedCard.includes(id)) return;

    setFlippedCard((prev) => {
      const newFlipped = [id, ...prev];
      playFlipSound();
      return newFlipped;
    });

    setShuffledCards((prevCards) =>
      prevCards.map((card, i) =>
        i === id ? { ...card, isFlipped: true } : card
      )
    );

    if (flippedCard.length >= 1) {
      setTurns((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-gray-900 p-2 lg:p-4">
      <div className="h-full lg:mt-[4rem] justify-center p-8">
        <div className={`grid grid-cols-3   justify-center gap-2`}>
          {shuffledCards.map((card, index) => (
            <motion.div
              animate={{
                rotateY:
                  flippedCard.includes(card.id) || card.isMatched ? 180 : 0,
              }}
              transition={{ duration: 0.4 }}
              key={index}
              onClick={() => handleCardClick(card.id)}
              className={`${
                level === "extreme"
                  ? "w-[2.5rem] h-[2.5rem]"
                  : "w-[3rem] h-[3rem]"
              } 2xl:w-[4rem] 2xl:h-[4rem] rounded-xl  cursor-pointer flex items-center justify-center ${
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
      <audio ref={audioFlipRef} src="/flipsound.mp3" />
      <audio ref={audioFlipFailRef} src="/flipfail.mp3" />
    </div>
  );
}
