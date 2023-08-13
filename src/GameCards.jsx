import React from 'react'
import SingleCard from "./card";
import { useState, useEffect } from "react";

function Game({isRunning, setIsRunning,cards,setAnalitic,shuffleCards,analitic,matchNumber,setMatchNumber}) {

  const [milliseconds, setMilliseconds] = useState(0);

  // milliseconds counter for analitic data
  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);
    }, 10);
    return () => clearInterval(interval);
  }, [milliseconds]);

  function handleChoice(card) {
    console.log(card);
  }

  function createAnaliticReport(card, IsBunnyFound) {
    let newData = analitic.push({
      time: milliseconds,
      objekt_type: card.color,
      bunnyFound: IsBunnyFound,
      matchNumber: matchNumber,
    });
    setAnalitic([...analitic]);
    console.log(analitic);
  }

  useEffect(() => {
    shuffleCards();
    shuffleCards();
    setMatchNumber(1)
  }, []);

  return (
    <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            setIsRunning={setIsRunning}
            isRunning={isRunning}
            flipped={""}
            createAnaliticReport={createAnaliticReport}
          />
        ))}
      </div>
  )
}

export default Game