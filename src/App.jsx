import { useState } from 'react'
import './App.css'
import SingleCard from './card'

const cardImages = [
  { "src": "/img/bear.png" },
  { "src": "/img/buffalo.png" },
  { "src": "/img/chick.png" },
  { "src": "/img/chicken.png" },
  { "src": "/img/cow.png" },
  { "src": "/img/crocodile.png" },
  { "src": "/img/dog.png" },
  { "src": "/img/duck.png" },
  { "src": "/img/elephant.png" },
  { "src": "/img/frog.png" },
  { "src": "/img/giraffe.png" },
  { "src": "/img/goat.png" },
  { "src": "/img/gorilla.png" },
  { "src": "/img/hippo.png" },
  { "src": "/img/horse.png" },
  { "src": "/img/monkey.png" },
  { "src": "/img/narwhal.png" },
  { "src": "/img/owl.png" },
  { "src": "/img/panda.png" },
  { "src": "/img/parrot.png" },
  { "src": "/img/penguin.png" },
  { "src": "/img/pig.png" },
  { "src": "/img/rabbit.png" },
  { "src": "/img/rhino.png" },
  { "src": "/img/sloth.png" },
  { "src": "/img/snake.png" },
  { "src": "/img/walrus.png" },
  { "src": "/img/whale.png" },
  { "src": "/img/zebra.png" },
  { "src": "https://media1.giphy.com/media/U0rz7AM59TgiioHUTH/giphy.gif?ep=v1_gifs_related" },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }

  function handleChoice(card){
    console.log(card)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={ ""}
            />
        ))}
      </div>

    </div>
  );
}

export default App
