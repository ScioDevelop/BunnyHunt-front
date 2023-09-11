// useNextRound.js (Custom Hook)
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import {
  GameSettings,
  NumberOfRounds,
  Attempts,
  AttemptsColor,
  timeLeft,
  matchNumber,
  Cards,
  isRunning
} from "./DataManagement";
const backendUrl = import.meta.env.VITE_URL_BACKEND;

export function useNextRound() {
  const [GameSettingsAtom, setGameSettingAtom] = useAtom(GameSettings);
  const [NumberOfRoundsAtom, setNumberOfRoundsAtom] = useAtom(NumberOfRounds);
  const [AttemptsAtom, setAttemptsAtom] = useAtom(Attempts);
  const [AttemptsColorAtom, setAttemptsColorAtom] = useAtom(AttemptsColor);
  const [matchNumberAtom, setmatchNumberAtom] = useAtom(matchNumber);
  const [CardsAtom, setCardsAtom] = useAtom(Cards);
  const [timeLeftAtom, setTimeLeftAtom] = useAtom(timeLeft);
  const [isRunningAtom, setIsRunningAtom] = useAtom(isRunning);

  const navigate = useNavigate();

  const nextRound = () => {   
    if (NumberOfRoundsAtom + 1 === GameSettingsAtom.length) {
      if (GameSettingsAtom[NumberOfRoundsAtom].NextGame) {
        try {
          fetch(
            backendUrl + "/game/" +
              GameSettingsAtom[NumberOfRoundsAtom].NextGame
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setGameSettingAtom(data);
              setNumberOfRoundsAtom(0);
              setmatchNumberAtom(matchNumberAtom + 1);
              setCardsAtom(data[0].Karticky);
              
              if(data[NumberOfRoundsAtom].KonecKola == "afterTime"){
                setTimeLeftAtom(data[NumberOfRoundsAtom].KonecKolaTime)
              }
              console.log("heloo");
              if(data[NumberOfRoundsAtom].KonecKola === "afterTimeStart"){
                setTimeLeftAtom(data[NumberOfRoundsAtom].KonecKolaTime)
                console.log("helooo")
                setIsRunningAtom(true)
              }

            });
  
          return;
        } catch (error) {
          return navigate("/end");
        }
      }
      return navigate("/end");

    } else {
      //next round
      setAttemptsAtom(0);
      setAttemptsColorAtom({ red: 0, green: 0, blue: 0 });
      setmatchNumberAtom(matchNumberAtom + 1);
      setNumberOfRoundsAtom(NumberOfRoundsAtom + 1);
    }
  };

  return { nextRound };
}
