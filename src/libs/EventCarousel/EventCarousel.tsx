import React from "react";
import { Event } from "../ObjectDefinitions";
import "./event_carousel.css";
import { EventCard } from "./EventCard";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useState } from "react";

type Props = {
  events: Event[];
  buttonColor?: string;
  backgroundColor?: string;
};

enum SlidingAnimation {
  Left = "slideLeft 1s",
  Right = "slideRight 1s",
}

export const EventCarousel = ({
  events,
  buttonColor = "black",
  backgroundColor = "yellow",
}: Props) => {
  const [position, setPosition] = useState(0);
  const [animation, setAnimation] = useState("none");

  const SLIDING_PIXELS = 100;

  const slideLeft = (event: React.MouseEvent<SVGAElement>) => {
    setPosition(position - SLIDING_PIXELS);
    setAnimation(SlidingAnimation.Left)
  };

  const slideRight = (event: React.MouseEvent<SVGAElement>) => {
    setPosition(position + SLIDING_PIXELS);
    setAnimation(SlidingAnimation.Right)
  };

  return (
    <div
      className="event-carousel-container"
      style={{ backgroundColor: `${backgroundColor}` }}
    >
      <FaArrowCircleLeft
        className="arrow"
        onClick={slideLeft}
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
        className="arrow right"
        onClick={slideRight}
        style={{ color: `${buttonColor}` }}
      />
    </div>
  );
};
