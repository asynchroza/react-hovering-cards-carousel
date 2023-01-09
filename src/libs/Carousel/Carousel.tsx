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
  buttonSpacing?: number;
  reloadOnResize?: boolean;
  scale?: number;
  upcomingEventLabel?: {
    text: string;
    backgroundColor: string;
    color: string;
  } | null;
};

enum SlidingAnimation {
  Left = "slideLeft 1s",
  Right = "slideRight 1s",
}

export const Carousel = ({
  cards,
  buttonColor = "black",
  buttonSpacing = 40,
  upcomingEventLabel = null,
  reloadOnResize = true,
  scale = 1,
}: Props) => {
  const isDesktop = useMediaQuery({
    query: `(min-width: ${1000 + (scale % 1) * 1000}px)`,
  });

  const [prevIsDesktop, setPrevIsDesktop] = useState(isDesktop);

  /*
    We need to force a reload when swapping resolution because otherwise
    the Carousel doesn't load the button logic for the Mobile version or vice verse
  */

  window.onresize = function () {
    if (isDesktop != prevIsDesktop && reloadOnResize) {
      setPrevIsDesktop(isDesktop);
      location.reload();
    }
  };

  const [position, setPosition] = useState(0);
  const [cardsLength, setCardsLength] = useState(cards.length);
  const [animation, setAnimation] = useState("none");

  const mainContainer = {
    justifyContent: "center",
    transform: `scale(${isDesktop ? scale : 1})`,
  };

  const getContainerStyle = () => {
    if (cards.length <= 3 && isDesktop) {
      return {
        width: `calc(${-SLIDING_PIXELS * cards.length})`,
        ...mainContainer,
      };
    } else {
      return {
        ...mainContainer,
      };
    }
  };

  const [currentIndex, setCurrentIndex] = useState(isDesktop ? 3 : 0); // starts with 4 images

  const isButtonVisible: boolean =
    (isDesktop && cards.length <= 4) || (!isDesktop && cards.length <= 1);

  const [leftButton, setLeftButton] = useState({
    css: isButtonVisible ? "hidden" : "arrow disabled",
    canClick: false,
  });

  const [rightButton, setRightButton] = useState({
    css: isButtonVisible ? "hidden" : "arrow right",
    canClick: !isButtonVisible,
  });

  /*  

        The component does not get rendered, if cards is empty.
        Therefore, it doesn't matter if we set an incorrect state to the buttons.
        Once the array grows (becomes > 0), then we may set the correct states.

        -> this is why we need the block below.

        This could be handled by the developer who is using the library, 
        by rendering the component only when cards.length > 0, 
        but I decided to abstract it.  

        This might come at a price ...
  */

  if (cards.length > cardsLength) {
    setCardsLength(cards.length);
    setRightButton({
      css: isButtonVisible ? "hidden" : "arrow right",
      canClick: !isButtonVisible,
    });

    setLeftButton({
      css: isButtonVisible ? "hidden" : "arrow disabled",
      canClick: false, // left button is always unclickable on initialization / reload
    });
  }

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

  if (cards.length === 0) return null;

  return (
    <div className="carousel-container" style={getContainerStyle()}>
      <FaArrowCircleLeft
        className={leftButton.css}
        onClick={slideRight}
        style={{ color: `${buttonColor}`, left: `${buttonSpacing * -1}` }}
      />
      <div className="carousel-map">
        <div
          className="carousel-map moving"
          style={{ left: `${position}px`, animation: animation }}
          key={Math.random()}
        >
          {cards.map((card, index) => (
            <Card
              prop={card}
              key={index}
              upcomingEventLabel={upcomingEventLabel}
            />
          ))}
        </div>
      </div>
      <FaArrowCircleLeft
        className={rightButton.css}
        onClick={slideLeft}
        style={{ color: `${buttonColor}`, right: `${buttonSpacing * -1}` }}
      />
    </div>
  );
};
