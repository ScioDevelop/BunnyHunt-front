import { useState, useRef } from "react";

function SingleCard({ card, handleChoice }) {
  const [flip,setFlip] = useState(false)

  // function handleClick() {
  //   handleChoice(card)
  //   setFlip(true)
  // } 

  const [isActivated, setIsActivated] = useState(false);
  const timerIdRef = useRef(null);

  const handleMouseDown = () => {
    timerIdRef.current = setTimeout(() => {
      setFlip(true);
    }, 700); // 700 milliseconds = 0,7 second
  };

  const handleMouseUp = () => {
    clearTimeout(timerIdRef.current);
    setFlip(false);
  };

  const handleImageDragStart = (e) => {
    e.preventDefault();
  };
  
  return (
        <div className="card" style={{width:"280px",height: "280px"}}>
        <div>
          {flip? 
          <div 
            width="300px"
            height="300px"
            style={{display: "flex", backgroundColor: "white", width: "280px",height: "280px", alignItems: "center", justifyContent: "center",overflow: "hidden"}}
          >
              <img
              className="front"
              src={card.src}
              alt="card front"
              style={{objectFit: "fill"}}
              /></div>
          :
          <img 
            className="back"
            src="/img/cover.svg"
            alt="cover"
            style={{ cursor: 'pointer' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onDragStart={handleImageDragStart}
            />}
        </div>
      </div>
    );
  }

export default SingleCard