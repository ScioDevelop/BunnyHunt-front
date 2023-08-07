import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { useState } from "react";
import cardImages from './imputs.js';
import MenuPage from "./menuPage";
import Game from "./GameCards";

import { BrowserRouter, Routes, Route } from "react-router-dom"

import TimeCounter from "./TimeCounter";

function App() {
  
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [analitic, setAnalitic] = useState([]);
  const [cards, setCards] = useState([]);
  const [matchNumber, setMatchNumber] = useState(0);

  // shuffle cards for new game
  const shuffleCards = () => {
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

    let shuffledCardsRed = [... cardImages.cardImagesRED];
    let shuffledCardsGreen = [...cardImages.cardImagesGREEN];
    let shuffledCardsBlue = [...cardImages.cardImagesBLUE];

    shuffleArray(shuffledCardsRed);
    shuffleArray(shuffledCardsGreen);
    shuffleArray(shuffledCardsBlue);

    let shuffledCards = [
      ...shuffledCardsRed.slice(0, 5),
      ...shuffledCardsGreen.slice(0, 7),
      ...shuffledCardsBlue.slice(0, 7),
    ];

    shuffledCards.push({ src: "/img/rabbit.png", type: "red" });

    let cardsWithID = shuffledCards.map((card) => ({
      ...card,
      id: Math.random(),
    }));
    shuffleArray(cardsWithID);
    //console.log(cardsWithID)

    setCards(cardsWithID);
  };

  return (
    <div className="App">
      <BrowserRouter>
      
      <NavBar isRunning={isRunning} setIsRunning={setIsRunning} shuffleCards={shuffleCards} matchNumber={matchNumber} setMatchNumber={setMatchNumber}/>
      
      <Routes>
      <Route path="*"  />
      <Route path="/" element={<MenuPage />}/>
      <Route path="/game" element={<Game isRunning={isRunning} setIsRunning={setIsRunning} cards={cards} setAnalitic={setAnalitic} analitic={analitic} shuffleCards={shuffleCards} matchNumber={matchNumber} setMatchNumber={setMatchNumber}/>} />
      <Route path="/end"  />
      
      </Routes>

      <TimeCounter seconds={seconds} setSeconds={setSeconds} />
      </BrowserRouter>
    </div>
  );
}

export default App;
