import { useState, useRef } from "react";
import ConfettiExplosion from 'react-confetti-explosion';

function SingleCard({
  card,
  handleChoice,
  setIsRunning,
  isRunning,
  createAnaliticReport,
}) {
  const [flip, setFlip] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  
  // function handleClick() {
  //   handleChoice(card)
  //   setFlip(true)
  // }

  const [isActivated, setIsActivated] = useState(false);
  const timerIdRef = useRef(null);

  const handleMouseDown = () => {
   
    // Analitic Data Creation
    if (card.src == "/img/rabbit.png") {
      createAnaliticReport(card, true);
    } else {
      createAnaliticReport(card, isRunning);
    }
    
    
    timerIdRef.current = setTimeout(() => {
      if (card.src == "/img/rabbit.png") {
        setIsExploding(true)
        setIsRunning(true);
        setFlip(true);
        return;
      }
      setFlip(true);
    }, 2000); // 700 milliseconds = 0,7 second
  };

  const handleMouseUp = () => {
    clearTimeout(timerIdRef.current);
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

        <img
          className="back"
          src={"/img/cover-" + card.type + ".svg"}
          alt="cover"
          style={{ cursor: "pointer" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onDragStart={handleImageDragStart}
        />

      </div>
    </div>
  );
}

export default SingleCard;
