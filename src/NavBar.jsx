import React from 'react'
import CountdownTimer from "./CountdownTimer";

import { useAtom } from 'jotai'
import { GameSettings, NumberOfRounds } from "./DataManagement";
//import ReactHtmlParser from 'react-html-parser';

function NavBar({isRunning, setIsRunning,matchNumber, setMatchNumber}) {
  
  const [GameSettingsAtom] = useAtom(GameSettings)
  const [NumberOfRoundsAtom] = useAtom(NumberOfRounds)
  
  return (
    <div>
    <div className="header">
        <div> {GameSettingsAtom[NumberOfRoundsAtom].NazevHry} {matchNumber==0 ? "" : (NumberOfRoundsAtom+1) + GameSettingsAtom[NumberOfRoundsAtom]?.TextZaCislem}</div>
        
        { isRunning ? <div> {GameSettingsAtom[NumberOfRoundsAtom].ZpravaNaKonciKola} </div> : <div></div>}
        <div>{GameSettingsAtom[NumberOfRoundsAtom].ProstorProPokyn } </div>
        
        <CountdownTimer
          setIsRunning={setIsRunning}
          isRunning={isRunning}
          setMatchNumber={setMatchNumber}
          matchNumber={matchNumber}
        ></CountdownTimer>
      
      </div>
      
      </div>
  )
}

export default NavBar