import React from 'react'
import CountdownTimer from "./CountdownTimer";

function NavBar({isRunning, setIsRunning,shuffleCards,matchNumber, setMatchNumber}) {
  return (
    <div className="header">
        <h1>Rabbit hunt</h1>
        <h1>{matchNumber==0 ? "" :matchNumber}</h1>

        <CountdownTimer
          setIsRunning={setIsRunning}
          isRunning={isRunning}
          shuffleCards={shuffleCards}
          setMatchNumber={setMatchNumber}
          matchNumber={matchNumber}
        ></CountdownTimer>
      </div>
  )
}

export default NavBar