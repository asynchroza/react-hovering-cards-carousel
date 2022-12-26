import React from "react";
import { Event, Article } from "../ObjectDefinitions";

type Props = {
  prop: Event | Article;
};

export const Card = ({ prop }: Props) => {
  if (prop instanceof Event) {
    return (
      <div className="card-container">
        <img src={prop.image} className="event-card-images" />
      </div>
    );
  } else {
    return (
      <div className="card-container">
        <h1>WORKING</h1>
      </div>
    )
  }
};
