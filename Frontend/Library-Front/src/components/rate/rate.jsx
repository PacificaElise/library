/* eslint-disable */
import React, {useState} from "react";
import { StarIcon } from "./star";

export const Rate = ({maxRate, selectedRate, updRate}) => {
  const [hover, setHover] = useState(0);
  const renderStar = () => {
    const starsToRender = [];

    for (let i = 0; i < maxRate; i++) {
      const hovered = hover ? hover : selectedRate;

      starsToRender.push(
      <span 
        onClick={() => updRate(i + 1)}
        onMouseOver = {() => setHover(i+1)}
        onMouseLeave = {() => setHover(0)}
        >
          <StarIcon
          color = {i < hovered ? '#FFBC1F' : ''}/>
      </span>
      )
    }
    return starsToRender
  }
  return (
    <React.Fragment>
      {renderStar()}    
    </React.Fragment>
  );
}