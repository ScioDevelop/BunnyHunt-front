import React, { useState, useEffect } from "react";

import { useAtom } from 'jotai'
import { GameSettings } from "./DataManagement";

const CountdownTimer = ({isRunning,setIsRunning,shuffleCards, matchNumber, setMatchNumber}) => {
  const [GameSettingsAtom] = useAtom(GameSettings)  
  const [timeLeft, setTimeLeft] = useState(GameSettingsAtom.nextTimmer);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
    useEffect(() => {
      let timer;
  
      if (isRunning && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        
      }
  
      return () => {
        clearInterval(timer);
      };
    }, [isRunning, timeLeft]);
    
    function nextRound(){
      setIsRunning(false);
        setTimeLeft(GameSettingsAtom.nextTimmer)
        setMatchNumber(matchNumber + 1)
        shuffleCards()
        console.log("Time runs down");
  }
  
    return (
      <div>
        {isRunning ?
        <p style={{marginLeft: "20px"}}> králíček nalezen! další kolo za {formatTime(timeLeft)} {timeLeft===0 ? <button onClick={() => nextRound()}>Další kolo</button> :<></>}</p>
          : <p style={{marginLeft: "20px"}}>                      </p>
      }
      </div>
    );
  };
  
  export default CountdownTimer;