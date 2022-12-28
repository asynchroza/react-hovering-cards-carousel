import React, { useState } from "react";
import { Event, Article, Custom } from "./card_definitions";
import { IoLogoFacebook as Facebook } from "react-icons/io";
import { HiLocationMarker as Location } from "react-icons/hi";

type Props = {
  prop: Event | Article | Custom;
  upcomingEventLabel?: {
    text: string,
    backgroundColor: string,
    color: string
  };
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

    const checkUpcomingEvent = (ISODateString: string): boolean => {
      if(!upcomingEventLabel) return false;

      try {
        return new Date(ISODateString) > new Date() ? true : false;
      } catch (error) {
        return false;
      }
  };

    return (
      <div
        className="card-container"
        onMouseEnter={setOverlayAsVisible}
        onMouseLeave={setOverlayAsHidden}
      >
        {checkUpcomingEvent(prop.startingTime)? <div className="upcoming-event-box"><span>Upcoming</span></div> : null}
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
