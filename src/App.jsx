import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { useState } from "react";
import frontOfCards from './imputs.js';

import MenuPage from "./MenuPage";
import Game from "./GameCards";
import EndPage from "./EndPage";

import { BrowserRouter, Routes, Route } from "react-router-dom"

import TimeCounter from "./TimeCounter";

import { useAtom } from 'jotai'
import { GameSettings,NumberOfRounds } from "./DataManagement";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [analitic, setAnalitic] = useState([]);
  const [cards, setCards] = useState([]);
  const [matchNumber, setMatchNumber] = useState(0);
  
  const [GameSettingAtom] = useAtom(GameSettings)
  const [NumberOfRoundsAtom] = useAtom(NumberOfRounds)

  let CardsToUse = [] // variable thats hodls all cards to use in round

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
    console.log(NumberOfRoundsAtom)

    let numberOfCardsInBoard= Number(GameSettingAtom[NumberOfRoundsAtom].HraciPlocha[0]) * Number(GameSettingAtom[NumberOfRoundsAtom].HraciPlocha.slice(-1))
    let countCards = 0
    GameSettingAtom[NumberOfRoundsAtom].Karticky.forEach((element) => countCards += element.count )
    
    //need to add random
    GameSettingAtom[NumberOfRoundsAtom].Karticky.forEach((element) => {
      
      function getRandomItemFromArray(array) {
        if (array.length === 0) {
          return null; // Return null for an empty array
        }
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex]*1000;
      }

      const min = 0;
      const max = frontOfCards[element.data].length - 1;

      for (let index = 0; index < element.count; index++) {
      const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min

      let data = { ...frontOfCards[element.data][randomIndex], color: element.color, time: getRandomItemFromArray(element.time), id: Math.random()}
      CardsToUse.push(data)
      }
    })
    
    if(CardsToUse !== numberOfCardsInBoard){
      console.log("error")
      CardsToUse = CardsToUse.slice(0,numberOfCardsInBoard)
    }

    if(GameSettingAtom[NumberOfRoundsAtom].Goal){  
        const remove = CardsToUse.pop()
        CardsToUse.push(GameSettingAtom[NumberOfRoundsAtom].Goal)
    }
    
    shuffleArray(CardsToUse);
    setCards(CardsToUse);

    // if (numberOfCardsInBoard%3===0){
    //   SliceRed = numberOfCardsInBoard/3
    //   SliceBlue = numberOfCardsInBoard/3
    //   SliceGreen = numberOfCardsInBoard/3
    // } else {
    //   if( (numberOfCardsInBoard-1)%3!==0){
    //     difference=2
    //   }
    //   SliceRed = (numberOfCardsInBoard-difference)/3
    //   SliceBlue = (numberOfCardsInBoard-difference)/3
    //   SliceGreen = (numberOfCardsInBoard-difference)/3
    // }

    // function linksToCardData(setOflinks,type){
      
    //   let outputData = []
      
    //   setOflinks.forEach(link => {
    //     outputData.push({ "src": link, "type": type },)
    //   });

    //   return outputData
    // }

    // let shuffledCardsRed = [... cardImages.cardImagesRED];
    // let shuffledCardsGreen = [...cardImages.cardImagesGREEN, ...linksToCardData(cardImages.cardGifs ,"gif")];
    // let shuffledCardsBlue = [...cardImages.cardImagesBLUE];

    // shuffleArray(shuffledCardsGreen)
    // shuffleArray(shuffledCardsBlue)
    // shuffleArray(shuffledCardsRed)

    // let selectedCardsForGame1 = shuffledCardsRed.slice(0, SliceRed-1)
    // let selectedCardsForGame2 = shuffledCardsGreen.slice(0, SliceGreen)
    // let selectedCardsForGame3 = shuffledCardsBlue.slice(0, SliceBlue)
    
    // shuffleArray(selectedCardsForGame1)
    // shuffleArray(selectedCardsForGame2)
    // shuffleArray(selectedCardsForGame3)

    // function SetColorToCard(cards,color){
    //   let outputData = []
    //   cards.forEach(card => {
    //     outputData.push({ ...card, "color": color },)
    //   });
    //   return outputData
    // }
    
    // let shuffledCards = [
    //   ...SetColorToCard(selectedCardsForGame1,GameSettingAtom.C1),
    //   ...SetColorToCard(selectedCardsForGame2,GameSettingAtom.C2),
    //   ...SetColorToCard(selectedCardsForGame3,GameSettingAtom.C3),
    // ];

    // shuffledCards.push({ src: GameSettingAtom.FindingObject, color: GameSettingAtom.C1 });

    // function SetTime(color){
    //   switch (color) {
    //     case "red":
    //       return GameSettingAtom.T1
    //       case "green":
    //       return GameSettingAtom.T2
    //       case "blue":
    //       return GameSettingAtom.T3
    //     default:
    //       return 0
    //   }
    // }

    // let cardsWithID = shuffledCards.map((card) => ({
    //   ...card,
    //   id: Math.random(),
    //   time: SetTime(card.color)
    // }));

    
    // shuffleArray(cardsWithID);
    // //console.log(cardsWithID)

    // setCards(cardsWithID);
  };

  return (
    <div className="App">
      <BrowserRouter>
      
      <NavBar isRunning={isRunning} setIsRunning={setIsRunning} shuffleCards={shuffleCards} matchNumber={matchNumber} setMatchNumber={setMatchNumber}/>
      
      <Routes>
      <Route path="*"  />
      <Route path="/" element={<MenuPage />}/>
      <Route path="/game" element={<Game isRunning={isRunning} setIsRunning={setIsRunning} cards={cards} setAnalitic={setAnalitic} analitic={analitic} shuffleCards={shuffleCards} matchNumber={matchNumber} setMatchNumber={setMatchNumber}/>} />
      <Route path="/end"  element={ <EndPage />} />
      
      </Routes>

      <TimeCounter seconds={seconds} setSeconds={setSeconds} />
      </BrowserRouter>
    </div>
  );
}

export default App;
