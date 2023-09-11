import React from 'react'
import CountdownTimer from "./CountdownTimer";

import { useAtom } from 'jotai'
import { GameSettings, NumberOfRounds, matchNumber, isRunning } from "./DataManagement";
//import ReactHtmlParser from 'react-html-parser';

function NavBar({}) {
  
  const [GameSettingsAtom] = useAtom(GameSettings)
  const [NumberOfRoundsAtom, setNumberOfRoundsAtom] = useAtom(NumberOfRounds) // use for gameSettings array walktrought
  const [matchNumberAtom,setmatchNumberAtom] = useAtom( matchNumber ) // Use for counting mateches
  const [isRunningAtom, setIsRunningAtom] = useAtom(isRunning);
  
  return (
    <div>
    <div className="header">
        <div> {GameSettingsAtom[NumberOfRoundsAtom].NazevHry} {matchNumber>0 ? "" : (matchNumberAtom) + GameSettingsAtom[NumberOfRoundsAtom]?.TextZaCislem}</div>
        
        { isRunningAtom ? <div> {GameSettingsAtom[NumberOfRoundsAtom].ZpravaNaKonciKola} </div> : <div></div>}
        <div>{GameSettingsAtom[NumberOfRoundsAtom].ProstorProPokyn } </div>
        
        <CountdownTimer></CountdownTimer>
      
      </div>
      
      </div>
  )
}

export default NavBar