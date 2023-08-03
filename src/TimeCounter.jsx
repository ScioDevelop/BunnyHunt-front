import React, { useState, useEffect } from 'react';

const TimeCounter = ({seconds,setSeconds}) => {

    // useEffect hook to start the timer when the component mounts
    useEffect(() => {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []);
  
    // Convert the seconds into hours, minutes, and seconds
    const formatTime = (totalSeconds) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
  
    return (
      <></>
    );
  };
  
  export default TimeCounter;