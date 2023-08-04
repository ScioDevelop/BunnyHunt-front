import React from 'react';
import { useState, useEffect, useId } from 'react'
import './App.css'
import SingleCard from './card'
import CountdownTimer from './CountdownTimer'
import TimeCounter from './TimeCounter'

function get_random (list) {
  return list[Math.floor((Math.random()*list.length))];
}

const cardImagesRED = [
  { "src": "/img/parrot.png", type: "red" },
  { "src": "/img/chicken.png", type: "red" },
  { "src": "/img/sloth.png" , type: "red" },
  { "src": "/img/snake.png" , type: "red" },
  { "src": "/img/walrus.png" , type: "red" },
  { "src": "/img/whale.png" , type: "red" },
  { "src": "/img/zebra.png" , type: "red" },
  { "src": "/img/chick.png" , type: "red" },
  { "src": "/img/buffalo.png" , type: "red" },
  { "src": "/img/panda.png", type: "red"  },
]

const cardImagesGREEN = [
  { "src": "https://plus.unsplash.com/premium_photo-1669046586732-85f07137923a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=900&q=60", type: "green" },
  { "src": "https://images.unsplash.com/photo-1689686611078-a33b28e0a3a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60", type: "green" },
  { "src": "https://images.unsplash.com/photo-1690362156187-0eda74b8d53f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60", type: "green" },
  { "src": "https://images.unsplash.com/photo-1691000367560-b7f97ae35fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60", type: "green" },
  { "src": "https://images.unsplash.com/photo-1690983182598-32726730ccb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60", type: "green" },
  { "src": "https://images.unsplash.com/photo-1690818724344-182bc6f19709?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=900&q=60", type: "green" },
  { "src": "https://images.unsplash.com/photo-1690362156187-0eda74b8d53f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60", type: "green" },
  { "src": "https://images.unsplash.com/photo-1688233599454-55e2ea1d8bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60", type: "green" },
  { "src": "https://images.unsplash.com/photo-1688233599454-55e2ea1d8bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60", type: "green" },
  { "src": "https://images.unsplash.com/photo-1690573339641-2cf20e7f6d50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60", type: "green" },
]

const cardImagesBLUE = [
  { "src": "Mravenci mohou zdvihnout až 50krát svou váhu.",type: "blue" },
  { "src": "Šnek má 25 tisíc zubů, ale jsou velmi malé.",type: "blue" },
  { "src": "Včela třepotá křídly 200krát za vteřinu.",type: "blue" },
  { "src": "Přibližně 70% Země je pokryto vodou.",type: "blue" },
  { "src": "Ruce nemají otisky prstů.",type: "blue" },
  { "src": "Křídla kolibříka vibrují 80krát za sekundu.",type: "blue" },
  { "src": "Váš nos má schopnost rozpoznat až 1 bilion vůní.",type: "blue" },
  { "src": "Kočky mají 32 svalů v každém uchu.",type: "blue" },
  { "src": "V blízkosti sopky Stromboli stále hoří od roku 1932.", type: "blue" },
  { "src": "Nejtěžší dešťová kapka vážila 250 gramů.", type: "blue" },
  
]




function App() {
  const [cards, setCards] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0);
  const [analitic,setAnalitic] = useState([])
  const [matchNumber,setMatchNumber] = useState(1)




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

    let shuffledCardsRed = [...cardImagesRED]
    let shuffledCardsGreen = [...cardImagesGREEN]
    let shuffledCardsBlue = [...cardImagesBLUE]

    shuffleArray(shuffledCardsRed)
    shuffleArray(shuffledCardsGreen)
    shuffleArray(shuffledCardsBlue)

    let shuffledCards = [...shuffledCardsRed.slice(0,5),...shuffledCardsGreen.slice(0,5),...shuffledCardsBlue.slice(0,5)]
    
    const ranndomIndex = Math.floor(Math.random()*shuffledCards.length)
    shuffledCards[ranndomIndex]={ "src": "/img/rabbit.png", type: shuffledCards[ranndomIndex].type}

    let cardsWithID = shuffledCards.map(card => ({ ...card, id: Math.random() }))
    shuffleArray(cardsWithID)
    //console.log(cardsWithID)
    
    setCards(cardsWithID)
  }


  function handleChoice(card){
    console.log(card)
  }

  function createAnaliticReport(card, IsBunnyFound){
    let newData = analitic.push({time: seconds, objekt_type: card.type, bunnyFound: IsBunnyFound, "matchNumber":matchNumber})
    setAnalitic([... analitic])
    console.log(analitic)
  }

  useEffect(() => {
    shuffleCards()
  }, []);

  return (
    <div className="App">
      <div className="header">
      <h1>Rabbit hunt</h1>
      <h1>{matchNumber}</h1>
      
      <CountdownTimer
      setIsRunning={setIsRunning}
      isRunning={isRunning}
      shuffleCards={shuffleCards}
      setMatchNumber={setMatchNumber}
      matchNumber={matchNumber}
      >

    </CountdownTimer>
     </div>

      <div className="card-grid">
        {cards.map(card => 
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            setIsRunning={setIsRunning}
            isRunning={isRunning}
            flipped={""}
            createAnaliticReport={createAnaliticReport}
            />
        )}
      </div>

      <TimeCounter 
        seconds={seconds}
        setSeconds={setSeconds}
      />
      

    </div>
  );
}

export default App
