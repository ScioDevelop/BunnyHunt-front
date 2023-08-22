import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { useState } from "react";
import cardImages from './imputs.js';

import MenuPage from "./MenuPage";
import Game from "./GameCards";
import Settings from "./Settings";

import { BrowserRouter, Routes, Route } from "react-router-dom"

import TimeCounter from "./TimeCounter";

import { useAtom } from 'jotai'
import { GameSettings } from "./DataManagement";

function App() {
  
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [analitic, setAnalitic] = useState([]);
  const [cards, setCards] = useState([]);
  const [matchNumber, setMatchNumber] = useState(0);
  
  const [GameSettingAtom] = useAtom(GameSettings)

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

    let numberOfCardsInBoard= Number(GameSettingAtom.m)*Number(GameSettingAtom.n)
    let SliceRed = 0
    let SliceBlue = 0
    let SliceGreen = 0
    
    let difference = 1

    if (numberOfCardsInBoard%3===0){
      SliceRed = numberOfCardsInBoard/3
      SliceBlue = numberOfCardsInBoard/3
      SliceGreen = numberOfCardsInBoard/3
    } else {
      if( (numberOfCardsInBoard-1)%3!==0){
        difference=2
      }
      SliceRed = (numberOfCardsInBoard-difference)/3
      SliceBlue = (numberOfCardsInBoard-difference)/3
      SliceGreen = (numberOfCardsInBoard-difference)/3

    }

    function linksToCardData(setOflinks,type){
      
      let outputData = []
      
      setOflinks.forEach(link => {
        outputData.push({ "src": link, "type": type },)
      });

      return outputData
    }

    let shuffledCardsRed = [... cardImages.cardImagesRED];
    let shuffledCardsGreen = [...cardImages.cardImagesGREEN, ...linksToCardData(cardImages.cardGifs ,"gif")];
    let shuffledCardsBlue = [...cardImages.cardImagesBLUE];

    shuffleArray(shuffledCardsGreen)
    shuffleArray(shuffledCardsBlue)
    shuffleArray(shuffledCardsRed)

    let selectedCardsForGame1 = shuffledCardsRed.slice(0, SliceRed-1)
    let selectedCardsForGame2 = shuffledCardsGreen.slice(0, SliceGreen)
    let selectedCardsForGame3 = shuffledCardsBlue.slice(0, SliceBlue)
    
    shuffleArray(selectedCardsForGame1)
    shuffleArray(selectedCardsForGame2)
    shuffleArray(selectedCardsForGame3)

    function SetColorToCard(cards,color){
      let outputData = []
      cards.forEach(card => {
        outputData.push({ ...card, "color": color },)
      });
      return outputData
    }
    
    let shuffledCards = [
      ...SetColorToCard(selectedCardsForGame1,GameSettingAtom.C1),
      ...SetColorToCard(selectedCardsForGame2,GameSettingAtom.C2),
      ...SetColorToCard(selectedCardsForGame3,GameSettingAtom.C3),
    ];

    shuffledCards.push({ src: GameSettingAtom.FindingObject, color: GameSettingAtom.C1 });

    function SetTime(color){
      switch (color) {
        case "red":
          return GameSettingAtom.T1
          case "green":
          return GameSettingAtom.T2
          case "blue":
          return GameSettingAtom.T3
        default:
          return 0
      }
    }

    let cardsWithID = shuffledCards.map((card) => ({
      ...card,
      id: Math.random(),
      time: SetTime(card.color)
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
      <Route path="/settings" element={<Settings />}/>
      <Route path="/end"  />
      
      </Routes>

      <TimeCounter seconds={seconds} setSeconds={setSeconds} />
      </BrowserRouter>
    </div>
  );
}

export default App;
