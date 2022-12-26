import React from "react";
import { Event } from "../ObjectDefinitions";
import "./event_carousel.css";
import { EventCard } from "./EventCard";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useState } from "react";

type Props = {
  events: Event[];
};

export const EventCarousel = ({ events }: Props) => {
  const [position, setPosition] = useState(0);

  return (
    <div className="event-carousel-container">
      <FaArrowCircleLeft className="arrow" />
      <div className="event-carousel-map">
        <div
          className="event-carousel-map moving"
          style={{ transform: `translateX(${position}px)` }}
        >
          {events.map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
        </div>
      </div>
      <FaArrowCircleLeft className="arrow right" />
    </div>
  );
};
