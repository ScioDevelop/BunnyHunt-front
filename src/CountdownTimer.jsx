import React, { useState, useEffect } from "react";

const CountdownTimer = ({isRunning,setIsRunning,shuffleCards, matchNumber, setMatchNumber}) => {
    const [timeLeft, setTimeLeft] = useState(30);
  
    useEffect(() => {
      let timer;
  
      if (isRunning && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setIsRunning(false);
        setTimeLeft(30)
        setMatchNumber(matchNumber + 1)
        shuffleCards()
        console.log("Time runs down");
      }
  
      return () => {
        clearInterval(timer);
      };
    }, [isRunning, timeLeft]);
  
  
    return (
      <div>
        {isRunning ?
        <p style={{marginLeft: "20px"}}> králíček nalezen! další kolo za 00:{timeLeft}</p>
          : <p style={{marginLeft: "20px"}}>                      </p>
      }
      </div>
    );
  };
  
  export default CountdownTimer;