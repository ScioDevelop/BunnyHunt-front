import React from 'react'
import CountdownTimer from "./CountdownTimer";

const numberData = ["počáteční kolo", "prví", "druhé", "třetí", "čtvrté", "páté", "šesté"] 

function NavBar({isRunning, setIsRunning,shuffleCards,matchNumber, setMatchNumber}) {
  return (
    <div>
    <div className="header">
        <h1>Rabbit hunt</h1>
        <h1>{matchNumber==0 ? "" : matchNumber + ".kolo"}</h1>

        <CountdownTimer
          setIsRunning={setIsRunning}
          isRunning={isRunning}
          shuffleCards={shuffleCards}
          setMatchNumber={setMatchNumber}
          matchNumber={matchNumber}
        ></CountdownTimer>
      
      </div>
      <p style={{margin: "20px",}}> Prostory pro pokyny: Hledej králíčka </p>
      
      </div>
  )
}

export default NavBar