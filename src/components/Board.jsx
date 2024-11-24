import { RiPlantLine } from "react-icons/ri";
import { TbPlant2 } from "react-icons/tb";
import { PiPlant } from "react-icons/pi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Board() {
  const cards = [
    { id: 1, name: "plant 1", icon: <RiPlantLine className="w-8 h-8" /> },
    { id: 2, name: "plant 2", icon: <TbPlant2 className="w-8 h-8" /> },
    { id: 3, name: "plant 3", icon: <PiPlant className="w-8 h-8" /> },
  ];
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCard, setFlippedCard] = useState([]);
  const [matchedPair, setMatchedPair] = useState(0);

  useEffect(() => {
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

    setShuffledCards(shuffleCards);
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

      setTimeout(() => setFlippedCard([]), 1000);
    }
  }, [flippedCard]);

  const handleCardClick = (id) => {
    if (flippedCard.length === 2) return;
    setFlippedCard((prev) => [...prev, id]);
    setShuffledCards((prevCards) =>
      prevCards.map((card, i) =>
        i === id ? { ...card, isFlipped: true } : card
      )
    );
  };

  console.log(flippedCard);

  return (
    <div className="h-screen flex items-center justify-center p-8">
      <div className="grid grid-cols-3 w-full max-w-md items-center justify-center gap-2">
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
  );
}
