import React from "react";
import SingleCard from "./card";
import { useState, useEffect } from "react";

//Atom
import { useAtom } from "jotai";
import { NumberOfRounds, GameSettings, Cards, User, matchNumber, isRunning } from "./DataManagement";

function Game({
  NextRound,
}) {
  const [analitic, setAnalitic] = useState([]);
  const [milliseconds, setMilliseconds] = useState(0);
  const [GameSettingsAtom] = useAtom(GameSettings);
  const [NumberOfRoundAtom,setNumberOfRoundAtom] = useAtom(NumberOfRounds);
  const [CardsAtom, setCardsAtom] = useAtom(Cards);
  const [UserAtom] = useAtom(User);
  const [matchNumberAtom] = useAtom(matchNumber) // Use for counting mateches
  const [isRunningAtom, setIsRunningAtom] = useAtom(isRunning);

  // milliseconds counter for analitic data
  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);
    }, 10);
    return () => clearInterval(interval);
  }, [milliseconds]);

  function handleChoice(card) {
    console.log(card);
  }
  const backendUrl = import.meta.env.URL_BACKEND;
  function sendAnaliticalReport(sendData) {
    try {
      
      fetch(backendUrl+"/analitic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(sendData)
        });

    } catch (error) {
      console.log("error happends:  " + error);
    }
  }

  function createAnaliticReport(card, IsBunnyFound) {
    const { id, ...rest } = card;

    let newData = {
      user: UserAtom,
      time: milliseconds,
      selectedCard: rest,
      bunnyFound: IsBunnyFound,
      matchNumber: matchNumberAtom,
      gameName: GameSettingsAtom[NumberOfRoundAtom].GameName,
    };
    analitic.push(newData);
    setAnalitic([...analitic]);
    console.log(analitic);

    sendAnaliticalReport(newData);
  }

  useEffect(() => {
    NextRound()
    if(GameSettingsAtom[NumberOfRoundAtom].KonecKola === "afterTimeStart"){
      setIsRunningAtom(true)
    }
  }, [NumberOfRoundAtom]);

  return (
    <div
      className="card-grid"
      style={{
        gridTemplateColumns:
          "repeat(" +
          GameSettingsAtom[NumberOfRoundAtom].HraciPlocha[0] +
          ", minmax(auto, auto))",
      }}
    >
      {CardsAtom.map((card) => (
        <SingleCard
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={""}
          createAnaliticReport={createAnaliticReport}
        />
      ))}
    </div>
  );
}

export default Game;
