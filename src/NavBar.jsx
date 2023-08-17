import React from 'react'
import CountdownTimer from "./CountdownTimer";

import { useAtom } from 'jotai'
import { GameSettings } from "./DataManagement";


function NavBar({isRunning, setIsRunning,shuffleCards,matchNumber, setMatchNumber}) {
  
  const [GameSettingsAtom] = useAtom(GameSettings)
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
      <p style={{margin: "20px",}}> Prostory pro pokyny: {GameSettingsAtom.FindingText} </p>
      
      </div>
  )
}

export default NavBar