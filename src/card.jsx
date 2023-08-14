import { useState, useRef, useEffect } from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import VerticalFillingBar from "./VerticalFillingBar";
import GifPlayer from './GifPlayer';

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
  
  const [circles, setCircles] = useState([]);

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
    
    if(isRunning){
      createAnaliticReport(card,true)
    }else{
      createAnaliticReport(card,false)
    }

    timerIdRef.current = setTimeout(() => {
      setIsHolding(false);
      if (card.src === "/img/rabbit.png") {
        setBarTime(card.time)
        setIsExploding(true);
        setIsRunning(true);
        setFlip(true);
        stopTimer();
      } else {
        setBarTime(card.time)
        setFlip(true);
        stopTimer();
      }
    }, card.time); // 2 seconds (adjust as needed)
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

  let divStyleText_SmallImage = { position: "relative", backgroundColor: "#1d1d1d", width: "280px" }

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

  function genCircles(){
    const newElements = [];

    for (let i = 0; i < Math.round(card.time/1000); i++) {
      newElements.push(<svg key={i} width="55px" height="55px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.369755245">
          <circle id="Oval" fill="#000000" cx="50%" cy="50%" r="15"></circle>
      </g>
      </svg>);
    }
    
    setCircles(newElements);
  }

  useEffect(() => {
    genCircles()
  }, []);
  

  return (
    <div className="card">
      <div className={flip ? "flipped" : ""}>
        <div className="card-container front">
          
          <div className={card.src === "/img/rabbit.png" ? "backOfCardRabbit" : "backOfCard"+card.color}
            style={card.color === "green"? divStyleBigImage : divStyleText_SmallImage}
          >
            {isExploding && <ConfettiExplosion duration={3000} style={imgStyleText_SmallImage}/>}
            
            { card.color==="blue" ? <b style={imgStyleText_SmallImage}>{card.src}</b> : 
              
              card.src.slice(-3) === "gif"?
              <GifPlayer gifSrc={card.src} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
              :
              <img
              className={card.color === "green" ? "greenCardFront" : ""}
              src={card.src}
              alt={card.src}
              style={card.color === "green"? imgStyleBigImage : imgStyleText_SmallImage }
              />
              
            }

          </div>
        </div>

        <div className="card-container back">
        
        {flip ? <></> : <div className="circle-container back">{circles}</div>}
    
    
    {flip ? <></> : <VerticalFillingBar fillPercentage={barTime / (card.time + 800) * 100} />}
    
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
