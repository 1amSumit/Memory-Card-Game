import { RiPlantLine } from "react-icons/ri";
import { TbPlant2 } from "react-icons/tb";
import { PiPlant } from "react-icons/pi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Board() {
  const cards = [
    { id: 1, name: "plant1", icon: <RiPlantLine className="w-4 h-4" /> },
    { id: 2, name: "plant2", icon: <TbPlant2 className="w-4 h-4" /> },
    { id: 3, name: "plant3", icon: <PiPlant className="w-4 h-4" /> },
  ];
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCard, setFlippedCard] = useState([]);

  useEffect(() => {
    const dupliacteCards = [...cards, ...cards];
    const shuffleCards = dupliacteCards
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        id: index,
        icon: card.icon,
        isFlipped: false,
        isMatched: false,
      }));

    setShuffledCards(shuffleCards);
  }, []);

  const handleCardClick = (id) => {
    console.log(id);
    if (flippedCard.length === 2) return;
    setFlippedCard((prev) => [...prev, id]);
  };

  console.log(flippedCard);

  return (
    <div className="h-screen flex items-center justify-center p-8">
      <div className="grid grid-cols-3 w-full max-w-md items-center justify-center gap-2">
        {shuffledCards.map((card, index) => (
          <motion.div
            animate={{ rotateY: flippedCard.includes(index) ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            key={index}
            onClick={() => handleCardClick(card.id)}
            className={`w-[5rem] h-[5rem] rounded-xl  cursor-pointer flex items-center justify-center ${
              flippedCard.includes(index) ? "bg-purple-600" : "bg-yellow-400"
            }`}
          >
            <div
              className={`${flippedCard.includes(index) ? "block" : "hidden"}`}
            >
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
