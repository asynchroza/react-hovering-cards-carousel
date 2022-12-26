import { useEffect, useState } from "react";
import "./App.css";
import { EventCarousel } from "./libs/EventCarousel/EventCarousel";
import axios from "axios";
import { Event } from "./libs/ObjectDefinitions";

function EventsCarouselTest() {
  const [data, setData] = useState([new Event()]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://dev.thehub-aubg.com/api/event",
    }).then((res) => {
      let resdata: Array<unknown> = res.data.data.events;
      let events: Array<Event> = [];

      if (resdata) {
        resdata.forEach((element: any) => {
          events.push(
            new Event(
              element.title,
              element.banner,
              element.description,
              element.locationlink,
              element.startdate,
              element.facebooklink
            )
          );
        });
      }

      setData(events)
    });
  }, []);

  return <div className="App">{<EventCarousel events={data}/>}</div>;
}

export default EventsCarouselTest;
