import React, { useEffect } from "react";
import { Event } from "../ObjectDefinitions";
import "./event_carousel.css";
import { EventCard } from "./EventCard";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useState } from "react";
import { SLIDING_PIXELS, CARDS_MARGIN } from "./Constants";

type Props = {
  events: Event[];
  buttonColor?: string;
  backgroundColor?: string;
};

enum SlidingAnimation {
  Left = "slideLeft 1s",
  Right = "slideRight 1s",
}

enum Button {
  Left,
  Right,
}

export const EventCarousel = ({
  events,
  buttonColor = "black",
  backgroundColor = "yellow",
}: Props) => {
  const [position, setPosition] = useState(0);
  const [animation, setAnimation] = useState("none");
  const [leftButton, setLeftButton] = useState({
    css: "arrow disabled",
    canClick: false,
  });
  const [rightButton, setRightButton] = useState({
    css: "arrow right",
    canClick: true,
  });

  const SLIDING_WINDOW_LENGTH =
    (events.length * (SLIDING_PIXELS + 2 * CARDS_MARGIN)) / 2; // in pixels

  const slideLeft = (event: React.MouseEvent<SVGAElement>) => {
    if (rightButton.canClick) {
      setPosition(position - SLIDING_PIXELS);
      setAnimation(SlidingAnimation.Left);
      setLeftButton({ css: "arrow", canClick: true });

      if (-position >= SLIDING_WINDOW_LENGTH + SLIDING_PIXELS) {
        setRightButton({ css: "arrow right disabled", canClick: false });
      } else {
        setRightButton({ css: "arrow right", canClick: true });
      }
    }
  };

  const slideRight = (event: React.MouseEvent<SVGAElement>) => {
    if (leftButton.canClick) {
      setPosition(position + SLIDING_PIXELS);
      setAnimation(SlidingAnimation.Right);

      setRightButton({ css: "arrow right", canClick: true });

      if (-position - (SLIDING_PIXELS + CARDS_MARGIN * 2) <= 0) {
        setLeftButton({ css: "arrow disabled", canClick: false });
      } else {
        setLeftButton({ css: "arrow", canClick: true });
      }
    }
  };

  return (
    <div
      className="event-carousel-container"
      style={{ backgroundColor: `${backgroundColor}` }}
    >
      <FaArrowCircleLeft
        className={leftButton.css}
        onClick={slideRight}
        style={{ color: `${buttonColor}` }}
      />
      <div className="event-carousel-map">
        <div
          className="event-carousel-map moving"
          style={{ left: `${position}px`, animation: animation }}
          key={Math.random()}
        >
          {events.map((event, index) => (
            <EventCard event={event} key={index} />
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
