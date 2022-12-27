import React, { useEffect, useRef } from "react";
import { Event, Article, Custom } from "./card_definitions";
import "./carousel.css";
import { Card } from "./Card";
import { FaArrowCircleLeft, FaCalculator } from "react-icons/fa";
import { useState } from "react";
import { SLIDING_PIXELS, CARDS_MARGIN } from "./constants";
import { useMediaQuery } from "react-responsive";

type Props = {
  cards: Event[] | Article[] | Custom[];
  buttonColor?: string;
  backgroundColor?: string;
};

enum SlidingAnimation {
  Left = "slideLeft 1s",
  Right = "slideRight 1s",
}

export const Carousel = ({
  cards,
  buttonColor = "black",
  backgroundColor = "yellow",
}: Props) => {
  const [position, setPosition] = useState(0);
  const [animation, setAnimation] = useState("none");

  const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });

  // const getStartingIndex = () => {
  //   if (isDesktop) {
  //     if (cards.length <= 3) {
  //       return 0;
  //     }
  //     return 3;
  //   }

  //   return 0;
  // };

  const getContainerStyle = () => {
    if (cards.length <= 3 && isDesktop) {
      return {
        width: `calc(${-SLIDING_PIXELS * cards.length})`,
        backgroundColor: `${backgroundColor}`,
        justifyContent: "center",
      };
    } else {
      return {
        backgroundColor: `${backgroundColor}`,
      };
    }
  };

  const [currentIndex, setCurrentIndex] = useState(isDesktop? 3 : 0); // starts with 4 images

  const [leftButton, setLeftButton] = useState({
    css: "arrow disabled",
    canClick: false,
  });

  const [rightButton, setRightButton] = useState({
    css: "arrow right",
    canClick: true,
  });

  const animationRunning = useRef(false);

  const unblockTrigger = () => {
    setTimeout(() => {
      animationRunning.current = false;
    }, 750);
  };

  const slideLeft = (event: React.MouseEvent<SVGAElement>) => {
    if (animationRunning.current) return;

    if (rightButton.canClick) {
      animationRunning.current = true;
      setPosition(position - SLIDING_PIXELS);
      setAnimation(SlidingAnimation.Left);

      setLeftButton({ css: "arrow", canClick: true });

      unblockTrigger();

      if (currentIndex + 1 === cards.length - 1) {
        setRightButton({ css: "arrow right disabled", canClick: false });
      } else {
        setRightButton({ css: "arrow right", canClick: true });
      }

      setCurrentIndex(currentIndex + 1);
    }
  };

  const slideRight = (event: React.MouseEvent<SVGAElement>) => {
    if (animationRunning.current) return;

    if (leftButton.canClick) {
      animationRunning.current = true;
      setPosition(position + SLIDING_PIXELS);
      setAnimation(SlidingAnimation.Right);

      setRightButton({ css: "arrow right", canClick: true });
      setCurrentIndex(currentIndex - 1);

      unblockTrigger();

      if (-position - (SLIDING_PIXELS + CARDS_MARGIN * 2) <= 0) {
        setLeftButton({ css: "arrow disabled", canClick: false });
      } else {
        setLeftButton({ css: "arrow", canClick: true });
      }
    }
  };

  return (
    <div className="carousel-container" style={getContainerStyle()}>
      <FaArrowCircleLeft
        className={leftButton.css}
        onClick={slideRight}
        style={{ color: `${buttonColor}` }}
      />
      <div className="carousel-map">
        <div
          className="carousel-map moving"
          style={{ left: `${position}px`, animation: animation }}
          key={Math.random()}
        >
          {cards.map((card, index) => (
            <Card prop={card} key={index} />
          ))}
        </div>
      </div>
      <FaArrowCircleLeft
        className={rightButton.css}
        onClick={slideLeft}
        style={{ color: `${buttonColor}` }}
      />
    </div>
  );
};
