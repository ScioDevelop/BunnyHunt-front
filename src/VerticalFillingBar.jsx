import React, { useState } from 'react';
import './VerticalFillingBar.css'; // Import the CSS file for styling

const VerticalFillingBar = ({ fillPercentage }) => {
  return (
    <div className="vertical-filling-bar" style={{ opacity: `${fillPercentage}%`,  backgroundColor: "black"}}>
      {/* <div
        className="fill"
        style={{ height: `${fillPercentage}%` }}
      ></div> */}
    </div>
  );
};

export default VerticalFillingBar;