import React, { useState } from "react";
import { Event, Article, Custom } from "./card_definitions";

type Props = {
  prop: Event | Article | Custom;
};

export const Card = ({ prop }: Props) => {
  // api/event

  const [overlay, setOverlay] = useState("hidden");

  const setOverlayAsVisible = () => {
    setOverlay("card-overlay");
  };
  const setOverlayAsHidden = () => {
    setOverlay("hidden");
  };

  if (prop instanceof Event) {
    return (
      <div
        className="card-container"
        onMouseEnter={setOverlayAsVisible}
        onMouseLeave={setOverlayAsHidden}
      >
        <div className={overlay}>
          <h3>{prop.title}</h3>
        </div>
        <img src={prop.image} className="card-images" />
      </div>
    );
  }

  // api/article
  else if (prop instanceof Article) {
    return (
      <div className="card-container">
        <h1>WORKING</h1>
      </div>
    );

    // for external use
  } else {
    return (
      <div className="card-container">
        <h1>WORKING</h1>
      </div>
    );
  }
};
