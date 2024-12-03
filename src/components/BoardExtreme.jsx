import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PiPlant } from "react-icons/pi";
import { RiPlantLine } from "react-icons/ri";
import { TbPlant2 } from "react-icons/tb";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameLevelState } from "../store/level";
import { matchLevelState } from "../store/match";
import { turnState } from "../store/moves";
import { extremeHighScoreState, userScoreExtremeState } from "../store/score";

export default function BoardExtreme() {
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
    {
      id: 4,
      name: "plant 4",
      icon: <img src="/plant/p-4.png" className="w-8 h-8" />,
    },
    {
      id: 5,
      name: "plant 5",
      icon: <img src="/plant/p-5.png" className="w-8 h-8" />,
    },
    {
      id: 6,
      name: "plant 6",
      icon: <img src="/plant/p-6.png" className="w-8 h-8" />,
    },
    {
      id: 7,
      name: "plant 7",
      icon: <img src="/plant/p-7.png" className="w-8 h-8" />,
    },
    {
      id: 8,
      name: "plant 8",
      icon: <img src="/plant/p-8.png" className="w-8 h-8" />,
    },
    {
      id: 9,
      name: "plant 9",
      icon: <img src="/plant/p-9.png" className="w-8 h-8" />,
    },
    {
      id: 10,
      name: "plant 10",
      icon: <img src="/plant/p-10.png" className="w-8 h-8" />,
    },
    {
      id: 11,
      name: "plant 11",
      icon: <img src="/plant/p-11.png" className="w-8 h-8" />,
    },
    {
      id: 12,
      name: "plant 12",
      icon: <img src="/plant/p-12.png" className="w-8 h-8" />,
    },
    {
      id: 13,
      name: "plant 13",
      icon: <img src="/plant/p-13.png" className="w-8 h-8" />,
    },
    {
      id: 14,
      name: "plant 14",
      icon: <img src="/plant/p-14.png" className="w-8 h-8" />,
    },
    {
      id: 15,
      name: "plant 15",
      icon: <img src="/plant/p-15.png" className="w-8 h-8" />,
    },
    {
      id: 16,
      name: "animal 16",
      icon: <img src="/plant/p-16.png" className="w-8 h-8" />,
    },
    {
      id: 17,
      name: "animal 1",
      icon: <img src="/animal/ani-1.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 2",
      icon: <img src="/animal/ani-2.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 3",
      icon: <img src="/animal/ani-3.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 4",
      icon: <img src="/animal/ani-4.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 5",
      icon: <img src="/animal/ani-5.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 6",
      icon: <img src="/animal/ani-6.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 7",
      icon: <img src="/animal/ani-7.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 8",
      icon: <img src="/animal/ani-8.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 9",
      icon: <img src="/animal/ani-9.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 10",
      icon: <img src="/animal/ani-10.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 11",
      icon: <img src="/animal/ani-11.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 12",
      icon: <img src="/animal/ani-12.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 13",
      icon: <img src="/animal/ani-13.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 14",
      icon: <img src="/animal/ani-14.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 15",
      icon: <img src="/animal/ani-15.png" className="w-8 h-8" />,
    },
    {
      id: 18,
      name: "animal 16",
      icon: <img src="/animal/ani-16.png" className="w-8 h-8" />,
    },
  ];
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCard, setFlippedCard] = useState([]);
  const [matchedPair, setMatchedPair] = useState(0);
  const [match, setMatch] = useRecoilState(matchLevelState);

  const level = useRecoilValue(gameLevelState);
  const [scoreExtreme, setScoreExtreme] = useRecoilState(userScoreExtremeState);

  const [extremeHighScore, setExtremeHighScore] = useRecoilState(
    extremeHighScoreState
  );
  const [turns, setTurns] = useRecoilState(turnState);

  const audioFlipRef = useRef();
  const audioFlipFailRef = useRef();

  const playFlipSound = () => {
    if (audioFlipRef.current) {
      audioFlipRef.current.play();
    }
  };
  const playFlipFailSound = () => {
    if (audioFlipFailRef.current) {
      audioFlipFailRef.current.play();
    }
  };

  const shuffleCards = (card) => {
    const dupliacteCards = [...card, ...card];

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

        if (level === "extreme") {
          if (turns > cards.length + 3) {
            setScoreExtreme((prev) => prev + 45);
          } else if (turns === cards.length || turns === cards.length + 1) {
            setScoreExtreme((prev) => prev + 50);
          } else {
            setScoreExtreme((prev) => prev + 40);
          }
        }
        setTurns(0);
      }, 1000);
    }
  }, [matchedPair, cards.length, setMatch, setTurns]);

  useEffect(() => {
    if (scoreExtreme > extremeHighScore) {
      setExtremeHighScore(scoreExtreme);

      localStorage.setItem("extremeHighScore", extremeHighScore);
    }
  }, [scoreExtreme]);

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
      }, 600);
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
        <div
          className={`grid ${
            level === "easy"
              ? "grid-cols-3"
              : level === "medium"
              ? "grid-cols-4"
              : level === "hard"
              ? "grid-cols-6"
              : "grid-cols-8"
          }   justify-center gap-2`}
        >
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
