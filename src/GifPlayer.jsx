import React, { useRef, useEffect } from 'react';
import freezeframe from 'freezeframe';

const GifPlayer = ({ gifSrc }) => {
  const gifContainerRef = useRef(null);

  useEffect(() => {
    const gifElement = gifContainerRef.current;
    const ff = new freezeframe(gifElement); // Use 'new' to instantiate the class

    return () => {
      ff.destroy(); // Clean up the freezeframe instance when the component unmounts
    };
  }, []);


  return (
    <div ref={gifContainerRef} className='greenBorder'>
      <img src={gifSrc} alt="GIF" className='greenBorder'/>
    </div>
  );
};

export default GifPlayer;