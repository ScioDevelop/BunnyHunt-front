import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './card'
import CountdownTimer from './CountdownTimer'
import TimeCounter from './TimeCounter'

const cardImages = [
  { "src": "/img/rabbit.png", type: "red"},
  { "src": "/img/parrot.png", type: "red" },
  { "src": "/img/chicken.png", type: "red" },
  { "src": "/img/chicken.png", type: "red" },
  { "src": "/img/chicken.png", type: "red" },
]

function App() {
  const [cards, setCards] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0);
  const [analitic,setAnalitic] = useState([])
  const [matchNumber,setMatchNumber] = useState(1)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
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
        {cards.map(card => (
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

      <TimeCounter 
        seconds={seconds}
        setSeconds={setSeconds}
      />
      

    </div>
  );
}

export default App
