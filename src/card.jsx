import { useState, useRef } from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import VerticalFillingBar from "./VerticalFillingBar";

function SingleCard({
  card,
  handleChoice,
  setIsRunning,
  isRunning,
  createAnaliticReport,
}) {
  const [flip, setFlip] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [barTime, setBarTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const intervalRef = useRef();
  const timerIdRef = useRef();

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
    timerIdRef.current = setTimeout(() => {
      setIsHolding(false);
      if (card.src === "/img/rabbit.png") {
        setBarTime(2000)
        setIsExploding(true);
        setIsRunning(true);
        setFlip(true);
        stopTimer();
      } else {
        setBarTime(2000)
        setFlip(true);
        stopTimer();
      }
    }, 2000); // 2 seconds (adjust as needed)
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
    width: "280px",
    height: "280px",
    overflow: "hidden", // Add this property to hide overflow
  }

  let divStyleText_SmallImage = { position: "relative", backgroundColor: "#1d1d1d", width: "280px", height: "280px" }

  let imgStyleBigImage = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    objectFit: "cover", // Use 'cover' to make the image fill the container, cropping if necessary
    width: "100%",
    height: "100%",
  }

  let imgStyleText_SmallImage = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    objectFit: "fill",
  }

  return (
    <div className="card">
      <div className={flip ? "flipped" : ""}>
        <div className="card-container front">
          <div
            style={card.type === "green"? divStyleBigImage : divStyleText_SmallImage}
          >
            {isExploding && <ConfettiExplosion duration={3000} style={imgStyleText_SmallImage}/>}
            <img
              className={card.type === "green" ? "greenCardFront" : ""}
              src={card.type === "blue" ? "" : card.src}
              alt={card.type === "blue" ? card.src : card.src}
              style={card.type === "green"? imgStyleBigImage : imgStyleText_SmallImage }
            />
          </div>
        </div>

        <div className="card-container back">
       
       {flip ? <></>: <VerticalFillingBar fillPercentage={(barTime/2800)*100}/>}
        <img
          className="back"
          src={"/img/cover-" + card.type + ".svg"}
          alt="cover"
          style={{  cursor: "pointer"}}
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
