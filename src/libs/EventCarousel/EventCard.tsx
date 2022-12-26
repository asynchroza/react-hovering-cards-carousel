import React from "react";
import { Event } from "../ObjectDefinitions";

type Props = {
  event: Event;

};

export const EventCard = ({ event }: Props) => {
  return (
    <div className="event-card-container">
      <img src={event.image} className="event-card-images"/>
    </div>
  );
};
