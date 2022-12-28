import { useEffect, useState } from "react";
import "./App.css";
import { Carousel } from "./libs/Carousel/Carousel";
import axios from "axios";
import { Article, Event } from "./libs/Carousel/card_definitions";

function TestCarousel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

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

      setEvents(events);
    });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://dev.thehub-aubg.com/api/article",
    }).then((res) => {
      let resdata: Array<unknown> = res.data.data.data;

      let temp: Array<Article> = [];

      if (resdata) {
        resdata.forEach((element: any) => {
          temp.push(
            new Article(
              element.title,
              element.author,
              element.mediumlink,
              element.banner
            )
          );
        });
      }

      setArticles(temp);
    });
  }, []);

  return (
    <div className="App">
      <Carousel
        cards={events}
        upcomingEventLabel={{
          text: "Upcoming",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          color: "black",
        }}
      />
      <Carousel cards={articles} backgroundColor={"yellow"} />
    </div>
  );
}

export default TestCarousel;
