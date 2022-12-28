import React, { useState } from "react";
import { Event, Article, Custom } from "./card_definitions";
import { IoLogoFacebook as Facebook } from "react-icons/io";
import { HiLocationMarker as Location } from "react-icons/hi";

type Props = {
  prop: Event | Article | Custom;
  upcomingEventLabel?: {
    text: string;
    backgroundColor: string;
    color: string;
  } | null;
};

export const Card = ({ prop, upcomingEventLabel }: Props) => {
  const [overlay, setOverlay] = useState("hidden");

  const setOverlayAsVisible = () => {
    setOverlay("card-overlay");
  };

  const setOverlayAsHidden = () => {
    setOverlay("hidden");
  };

  const redirect = (url: string) => {
    window.open(url);
  };

  if (prop instanceof Event) {
    const checkUpcomingEvent = () => {
      if (upcomingEventLabel) {
        try {
          return new Date(prop.startingTime) > new Date() ? (
            <div
              className="upcoming-event-box"
              style={{
                backgroundColor: upcomingEventLabel?.backgroundColor,
                color: upcomingEventLabel?.color,
              }}
            >
              <span>{upcomingEventLabel.text}</span>
            </div>
          ) : null;
        } catch (error) {
          return null;
        }
      }
    };

    return (
      <div
        className="card-container"
        onMouseEnter={setOverlayAsVisible}
        onMouseLeave={setOverlayAsHidden}
      >
        {checkUpcomingEvent()}
        <div className={overlay}>
          <h3>{prop.title}</h3>
          <p>{prop.description}</p>
          <div className="overlay-icons-container">
            <Location
              className="card-overlay-icons"
              onClick={() => {
                redirect(prop.location);
              }}
            />
            <Facebook
              className="card-overlay-icons"
              onClick={() => {
                redirect(prop.link);
              }}
            />
          </div>
        </div>
        <img src={prop.image} className="card-images" />
      </div>
    );
  } else if (prop instanceof Article) {
    return (
      <div
        className="card-container"
        onMouseEnter={setOverlayAsVisible}
        onMouseLeave={setOverlayAsHidden}
      >
        <div className={overlay}>
          <h3>{prop.title}</h3>
          <div className="overlay-icons-container">
            <Facebook
              className="card-overlay-icons"
              onClick={() => {
                redirect(prop.link);
              }}
            />
          </div>
        </div>
        <img src={prop.image} className="card-images" />
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
