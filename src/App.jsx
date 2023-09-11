import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";

import MenuPage from "./MenuPage";
import Game from "./GameCards";
import EndPage from "./EndPage";

import { BrowserRouter, Routes, Route } from "react-router-dom"

import { useAtom } from 'jotai'
import { GameSettings,NumberOfRounds, Cards, User, timeLeft } from "./DataManagement";

const backendUrl = import.meta.env.VITE_URL_BACKEND;

function App() {
  const [CardsAtom,setCardsAtom] = useAtom(Cards)
  const [GameSettingAtom,setGameSettingAtom] = useAtom(GameSettings)
  const [NumberOfRoundsAtom] = useAtom(NumberOfRounds)
  const [UserAtom,setUserAtom] = useAtom(User)
  const [timeLeftAtom,setTimeLeftAtom] = useAtom(timeLeft)
  // shuffle cardsAtom for new game

  const FetchData = () => {
    fetch(backendUrl+"/game/")
          .then((response) => response.json())
          .then((data) => {
            setCardsAtom(data[NumberOfRoundsAtom].Karticky);
            if(data[NumberOfRoundsAtom].KonecKola === "afterTimeStart" || data[NumberOfRoundsAtom].KonecKola == "afterTime"){
              setTimeLeftAtom(data[NumberOfRoundsAtom].KonecKolaTime)
            }
            setGameSettingAtom(data)
        });
  }

  const passphrase_words_nouns = [
    "puppy",
    "kitten",
    "sunshine",
    "smile",
    "rainbow",
    "cupcake",
    "butterfly",
    "candy",
    "laughter",
    "giggles",
    "flower",
    "bunny",
    "hug",
    "sweetie",
    "dream",
    "cherish",
    "friend",
    "sparkle",
    "sunset",
    "love",
  ]
  const passphrase_words_adjectives = [
    "silly",
    "playful",
    "cheerful",
    "goofy",
    "quirky",
    "fun",
    "whimsical",
    "zany",
    "amusing",
    "joyful",
    "adorable",
    "cuddly",
    "lovable",
    "smiley",
    "bubbly",
    "giggly",
    "snuggly",
    "chirpy",
    "lively",
    "huggable",
]

  const genUser = () => {
    function getRandomItemFromArray(array) {
      if (array.length === 0) {
        return null; // Return null for an empty array
      }
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }

    setUserAtom( getRandomItemFromArray(passphrase_words_adjectives) + "-" + getRandomItemFromArray(passphrase_words_nouns) )
  }

  const NextRound = () => {
    console.log("nextRound",GameSettingAtom[NumberOfRoundsAtom].Karticky)
    setCardsAtom(GameSettingAtom[NumberOfRoundsAtom].Karticky);

    if(GameSettingAtom[NumberOfRoundsAtom].KonecKola === "afterTimeStart" || GameSettingAtom[NumberOfRoundsAtom].KonecKola == "afterTime"){
      setTimeLeftAtom(GameSettingAtom[NumberOfRoundsAtom].KonecKolaTime)
    }
  }

  useEffect(() => {
    FetchData();
    genUser()
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      
      { GameSettingAtom.length>0 ?<NavBar NextRound={NextRound}/> : <></> }
      
      <Routes>
      <Route path="*"  />
      <Route path="/" element={ GameSettingAtom.length>0 ? <MenuPage/> : <></>}/>
      <Route path="/game" element={ <Game NextRound={NextRound}/>  } />
      <Route path="/end"  element={ <EndPage />} />
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export const FetchData = () => {
  const [CardsAtom,setCardsAtom] = useAtom(Cards)
  const [GameSettingAtom,setGameSettingAtom] = useAtom(GameSettings)
  const [NumberOfRoundsAtom] = useAtom(NumberOfRounds)
  fetch(backendUrl+"/game/")
        .then((response) => response.json())
        .then((data) => {
          console.log(data)

          if(data[NumberOfRoundsAtom].KonecKola === "afterTimeStart" || GameSettingAtom[NumberOfRoundsAtom].KonecKola == "afterTime"){
            setTimeLeftAtom(data[NumberOfRoundsAtom].KonecKolaTime)
          }

          setCardsAtom(data[NumberOfRoundsAtom].Karticky);
          setGameSettingAtom(data)
      });
}


export default App;
