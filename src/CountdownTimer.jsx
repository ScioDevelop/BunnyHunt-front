import React, { useEffect } from "react";

import { useAtom } from "jotai";
import {
  GameSettings,
  NumberOfRounds,
  timeLeft,
  isRunning
} from "./DataManagement";

import { useNextRound } from "./useNextRound"; // Import the custom hook

//import ReactHtmlParser from 'react-html-parser';

const CountdownTimer = () => {
  const [isRunningAtom, setIsRunningAtom] = useAtom(isRunning);
  const [GameSettingsAtom] = useAtom(GameSettings);
  const [NumberOfRoundsAtom, setNumberOfRoundsAtom] = useAtom(NumberOfRounds); // use for gameSettings array walktrought

  const [timeLeftAtom, setTimeLeftAtom] = useAtom(timeLeft);

  const { nextRound } = useNextRound();

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  function ENDE() {
    setIsRunningAtom(false);
    nextRound();
  }

  useEffect(() => {
    let timer;

    if (isRunningAtom && timeLeftAtom > 0) {
      timer = setInterval(() => {
        setTimeLeftAtom((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeftAtom === 0) {
      ENDE();
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunningAtom, timeLeftAtom]);

  return (
    <div>
      {isRunningAtom ? (
        <div>
          {" "}
          {GameSettingsAtom[NumberOfRoundsAtom].ZpravaPriOdpoctu}{" "}
          {formatTime(timeLeftAtom)}
        </div>
      ) : (
        <div>{"   "}</div>
      )}
    </div>
  );
};

export default CountdownTimer;
