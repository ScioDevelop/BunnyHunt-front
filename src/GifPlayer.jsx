import React, { useRef, useEffect } from 'react';
import freezeframe from 'freezeframe';

const GifPlayer = ({ gifSrc, cardColor }) => {
  const gifContainerRef = useRef(null);

  useEffect(() => {
    const gifElement = gifContainerRef.current;
    const ff = new freezeframe(gifElement); // Use 'new' to instantiate the class

    return () => {
      ff.destroy(); // Clean up the freezeframe instance when the component unmounts
    };
  }, []);


  return (
    <div ref={gifContainerRef} >
      <img src={gifSrc} alt="GIF"/>
    </div>
  );
};

export default GifPlayer;