import { useEffect, useState } from "react";
import "./App.css";
import { Carousel } from "./libs/Carousel/Carousel";
import axios from "axios";
import { Article, Event, Custom } from "./libs/Carousel/card_definitions";

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


  type CustomChildProp = {
    title: string,
    description: string
    // add additional
  }

  let CustomChild = (prop: CustomChildProp) => {
    return (
      <div>
        <h1 className="demo-style-h1">{prop.title}</h1>
        <p>{prop.description}</p>
        {/* add additional */}
      </div>
    );
  };

  let customArr = [
    new Custom("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX6zRkmS6z10q3NKKaWZlDS6KUuiD6HMF3jBmEM-uE2w&s", <CustomChild title="Example" description="This is example"/>)
  ]

  return (
    <div className="App">
      {/* <Carousel
        cards={events}
        upcomingEventLabel={{
          text: "Upcoming",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          color: "black",
        }}
        scale={1.25}
        buttonColor={"yellow"}
        buttonSpacing={20}
      /> */}
      <Carousel cards={articles} scale={1.5}/>
      {/* <Carousel cards={customArr}/> */}
    </div>
  );
}

export default TestCarousel;
