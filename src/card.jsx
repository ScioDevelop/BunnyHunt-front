import { useState, useRef, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import GifPlayer from "./GifPlayer";
import { useNextRound } from "./useNextRound";

import { useAtom } from "jotai";
import {
  GameSettings,
  NumberOfRounds,
  Attempts,
  AttemptsColor,
  isRunning
} from "./DataManagement";

function SingleCard({
  card,
  createAnaliticReport,
}) {
  const [flip, setFlip] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [barTime, setBarTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const [circles, setCircles] = useState([]);

  const intervalRef = useRef();
  const timerIdRef = useRef();

  const [GameSettingsAtom] = useAtom(GameSettings);
  const [NumberOfRoundsAtom] = useAtom(NumberOfRounds);

  const [AttemptsAtom, setAttemptsAtom] = useAtom(Attempts);
  const [AttemptsColorAtom, setAttemptsColorAtom] = useAtom(AttemptsColor);
  
  const [isRunningAtom, setIsRunningAtom] = useAtom(isRunning);

  const { nextRound } = useNextRound();

  const startTimer = () => {
    clearInterval(intervalRef.current);
    setBarTime(0);
    intervalRef.current = setInterval(() => {
      setBarTime((prevTimer) => prevTimer + 10); // Increment by 10ms (adjust as needed)
    }, 10); // Set the interval to 10ms (adjust as needed)
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setBarTime(0);
  };

  const handleMouseDown = () => {
    startTimer();
    setIsHolding(true);

    if (isRunningAtom) {
      createAnaliticReport(card, true);
    } else {
      createAnaliticReport(card, false);
    }

    timerIdRef.current = setTimeout(() => {
      setIsHolding(false);

      let newAttempts = AttemptsAtom + 1;
      setAttemptsAtom(newAttempts);

      let newAttemptsColor = AttemptsColorAtom;
      newAttemptsColor[card.color] = newAttemptsColor[card.color] + 1;
      setAttemptsColorAtom(newAttemptsColor);

      if (GameSettingsAtom[NumberOfRoundsAtom].KonecKola === "find") {
        if (card.src === GameSettingsAtom[NumberOfRoundsAtom].Goal?.src) {
          setIsExploding(true);
          setFlip(true);
          stopTimer();

          const redirectTimeout = setTimeout(() => {
            nextRound();
          }, 3000);
        } else {
          setFlip(true);
          stopTimer();
        }
      }

      if (GameSettingsAtom[NumberOfRoundsAtom].KonecKola === "afterTime") {
        if (card.src === GameSettingsAtom[NumberOfRoundsAtom].Goal?.src) {
          setIsRunningAtom(true);
          setIsExploding(true);
          setFlip(true);
          stopTimer();
        } else {
          setFlip(true);
          stopTimer();
        }
      }

      if (GameSettingsAtom[NumberOfRoundsAtom].KonecKola === "afterAttempts") {
        if (
          GameSettingsAtom[NumberOfRoundsAtom].afterAttemptsCount ===
          AttemptsAtom + 1
        ) {
          setFlip(true);
          stopTimer();
          setIsExploding(true);
          setAttemptsAtom(0);
          setAttemptsColorAtom({ red: 0, green: 0, blue: 0 });

          nextRound();
        } else {
          setFlip(true);
          stopTimer();
        }
      }

      if (
        GameSettingsAtom[NumberOfRoundsAtom].KonecKola ===
        "afterSpecificColorAttempts"
      ) {
        if (
          GameSettingsAtom[NumberOfRoundsAtom].afterAttemptsCount ===
          AttemptsColorAtom[
            GameSettingsAtom[NumberOfRoundsAtom].afterSpecificColorAttemptsColor
          ]
        ) {
          setFlip(true);
          stopTimer();
          setIsExploding(true);
          setAttemptsAtom(0);
          setAttemptsColorAtom({ red: 0, green: 0, blue: 0 });

          nextRound();
        } else {
          setFlip(true);
          stopTimer();
        }
      }

      if(GameSettingsAtom[NumberOfRoundsAtom].KonecKola === "afterTimeStart"){
        setFlip(true);
        stopTimer();
      }

    }, card.time); // time of card adjusment
  };

  const handleMouseUp = () => {
    clearTimeout(timerIdRef.current);
    setIsHolding(false);
    stopTimer();
    setFlip(false);
  };

  const handleImageDragStart = (e) => {
    e.preventDefault();
  };

  let divStyleBigImage = {
    position: "relative",
    backgroundColor: "#1d1d1d",
    width: "100%",
    // height: "100%",
    overflow: "hidden", // Add this property to hide overflow
  };

  let divStyleText_SmallImage = {
    position: "relative",
    backgroundColor: "#1d1d1d",
    width: "100%",
  };

  let imgStyleBigImage = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    objectFit: "cover", // Use 'cover' to make the image fill the container, cropping if necessary
    width: "100%",
    height: "100%",
  };

  let imgStyleText_SmallImage = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    objectFit: "fill",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    width: "auto",
    height: "90%",
  };

  function genCircles() {
    const newElements = [];

    for (let i = 0; i < Math.round(card.time / 1000); i++) {
      newElements.push(
        <svg
          key={i}
          className="circless"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            fill-opacity="0.369755245"
          >
            <circle id="Oval" fill="#000000" cx="50%" cy="50%" r="15"></circle>
          </g>
        </svg>
      );
    }

    setCircles(newElements);
  }

  function ChangeCircles(change) {
    const newElements = [];

    for (let i = 0; i < Math.round(card.time / 1000) - change; i++) {
      newElements.push(
        <svg
          key={i}
          className="circless"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            fill-opacity="0.369755245"
          >
            <circle id="Oval" fill="#000000" cx="50%" cy="50%" r="15"></circle>
          </g>
        </svg>
      );
    }

    setCircles(newElements);
  }

  useEffect(() => {
    genCircles();
  }, []);

  useEffect(() => {
    const elapsedSeconds = Math.floor(barTime / 1000); // Calculate elapsed seconds
    ChangeCircles(elapsedSeconds); // Generate circles based on elapsed seconds
  }, [barTime]);

  return (
    <div className="card">
      <div className={flip ? "flipped" : "card-size"}>
        <div className="card-container front">
          <div
            className={
              card.src === GameSettingsAtom[NumberOfRoundsAtom].Goal?.src
                ? "backOfCardRabbit"
                : "backOfCard" + card.color
            }
            style={
              card.type === "image" ? divStyleBigImage : divStyleText_SmallImage
            }
          >
            {isExploding && (
              <ConfettiExplosion
                duration={3000}
                style={imgStyleText_SmallImage}
              />
            )}

            {card.type === "text" ? (
              <b className="card-size" style={imgStyleText_SmallImage}>
                {card.src}
              </b>
            ) : card.type === "gif" ? (
              <GifPlayer
                gifSrc={card.src}
                cardColor={card.color}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <img
                src={card.src}
                style={
                  card.type === "image"
                    ? imgStyleBigImage
                    : imgStyleText_SmallImage
                }
              />
            )}
          </div>
        </div>

        <div className="card-container back">
          {flip ? (
            <></>
          ) : (
            <div className="circle-container card-size">{circles}</div>
          )}

          <img
            className="back"
            src={"/img/cover-" + card.color + ".svg"}
            alt="cover"
            style={{ cursor: "pointer" }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onDragStart={handleImageDragStart}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
