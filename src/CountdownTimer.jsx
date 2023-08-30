import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAtom } from 'jotai'
import { GameSettings, NumberOfRounds, timeLeft } from "./DataManagement";
//import ReactHtmlParser from 'react-html-parser';

const CountdownTimer = ({isRunning,setIsRunning, matchNumber, setMatchNumber}) => {
  
  const [GameSettingsAtom] = useAtom(GameSettings)
  const [NumberOfRoundsAtom, setNumberOfRoundsAtom] = useAtom(NumberOfRounds)
  const navigate = useNavigate();

  const [timeLeftAtom, setTimeLeftAtom] = useAtom(timeLeft);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
    useEffect(() => {
      let timer;
  
      if (isRunning && timeLeftAtom > 0) {
        timer = setInterval(() => {
          setTimeLeftAtom((prevTime) => prevTime - 1);
        }, 1000);
      } else if (timeLeftAtom === 0) {
        
      }
  
      return () => {
        clearInterval(timer);
      };
    }, [isRunning, timeLeftAtom]);
    
    function nextRound(){
        if(NumberOfRoundsAtom+1 === GameSettingsAtom.length){
          //konec hry
          console.log(NumberOfRoundsAtom,GameSettingsAtom.length)
          return navigate("/end");

        }else {
          const NewData = NumberOfRoundsAtom + 1
          setNumberOfRoundsAtom(NewData);

          setIsRunning(false);
          setTimeLeftAtom(GameSettingsAtom[NewData]?.KonecKolaTime ?? 10)
          console.log("Time runs down");
        }
  }
  
    return (
      <div>
        {isRunning ?
        <div> {GameSettingsAtom[NumberOfRoundsAtom].ZpravaPriOdpoctu} {formatTime(timeLeftAtom)} {timeLeftAtom===0 ? <button onClick={() => nextRound()}>Další kolo</button> :<></>}</div>
          : <div>{"   "}</div>
      }
      </div>
    );
  };
  
  export default CountdownTimer;