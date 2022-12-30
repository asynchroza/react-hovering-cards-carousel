# React Hovering Cards Carousel

React Carousel which renders cards with hover effects.

[Find on GitHub](https://github.com/asynchroza/react-hovering-cards-carousel)  
[Find on NPM](https://www.npmjs.com/package/react-hovering-cards-carousel)

<img src="https://i.ibb.co/2SRfLyp/image.png">

* How to use?
  * Setup
    * Import styling
  * `<Carousel/>` component
    * Properties
      * `cards`
      * `scale`
      * `reloadOnResize`
      * `upcomingEventLabel`
      * `buttonColor`
      * `buttonSpacing`
  * Types of cards
    * type `Custom`
      * How to create a JSX Element (card overlay)
      * Example with type `Custom`
    * type `Event` ([@AUBGTheHUB](https://github.com/AUBGTheHUB))
    * type `Article` ([@AUBGTheHUB](https://github.com/AUBGTheHUB))
  * Component initialization
    * Initialization of hardcoded arrays
    * Fetching from an endpoint and mapping response to specific card type
  * Quirks:
    * Show label for upcoming events ([@AUBGTheHUB](https://github.com/AUBGTheHUB))

## How to use:

In order for the component's styling to work, you need to import `style.css`:

```javascript
import `../node_modules/react-hovering-cards-carousel/dist/style.css`
```

## `<Carousel/>`:

```javascript
<Carousel cards={events} scale={1.25} buttonsBackground={"red"} reloadOnResize={false}/>
```

- `cards` props is an array of type `Custom`, `Article` or `Event` where the items are the ones getting rendered.
- `scale` (default: `1`) prop accepts a number which signifies the times the component sizes up or down depending on your needs.
- `reloadOnResize` (default: `true`) prop accepts a boolean value which would either enable or disable the window reloading behavior triggered by the component when resolution is being changed.
- `upcomingEventLabel` (optional) prop accepts an object defining a specific label which is shown when an event is upcoming. More about this in the `Quirks` section.
- `buttonColor` (default: `black`) set color of arrow buttons.
- `buttonSpacing` (default: `40`) control the space between the buttons and the main container. Value is in pixels and multiplied by `-1`. Hence values lower than > `40` bring the buttons closer to the container.

### type `Custom`:

```javascript
image: string; // <img src={prop.image}>
children: JSX.Element; // this is what gets rendered when you hover over the card
```

How to create a `JSX Element`:

```typescript
type CustomChildProp = {
  title: string;
  description: string;
  // add additional
};

let CustomChild = (prop: CustomChildProp) => {
  return (
    <div>
      <h1>{prop.title}</h1>
      <p>{prop.description}</p>
      {/* add additional */}
    </div>
  );
};
```

Additionally you may (preferably) add specific styling to your JSX Element:
```javascript
import './style.css' // either in a parent component or in the same place
// where you define the CustomChild Element


let CustomChild = (prop: CustomChildProp) => {
  return (
    <div className="container">
      <h1 className="title-header">{prop.title}</h1>
      <p className="description">{prop.description}</p>
      {/* add additional */}
    </div>
  );
};
```

Create a `<Carousel/>` using type `Custom` (see example code [here](https://github.com/asynchroza/react-hovering-cards-carousel/blob/master/src/Test__Carousel.tsx)):

```javascript

import {Custom} from 'react-hovering-cards-carousel'

.
.
.

// declare array
const arr = [
  new Custom("https://example.com", <CustomChild title="Example", description="This is an example"/>),

  new Custom("https://secondexample.uk", <CustomChild title="Example Two", description="This is the second example">)
]

.
.
.

<Carousel cards={arr}/>

```

#### <em>The types below were developed for internal use within the @AUBGTheHub organization, but you can make use of them as you wish!</em>

### type `Event`:

```javascript
title: string;
image: string; // <img src={prop.image}/>
description: string;
location: string; // url (e.g. Google Maps)
startingTime: string; // ISO String
link: string; // url (e.g. Facebook)
```

### type `Article`:

```javascript
title: string;
link: string; // url (e.g. Medium)
author: string;
image: string; // <img src={prop.image}/>
```

---

### Initialize the component:

Create a list and populate it with objects of type `Custom` | `Event` | `Article` and then pass it to `<Carousel/>`

- hardcoded items

```typescript
import "../node_modules/react-hovering-cards-carousel/dist/style.css"
import { Carousel, Custom } from "react-hovering-cards-carousel";

.
.
.

let customArr: Array<Custom> = [
    new Custom("first item", ...),
    new Custom("second item", ...),
    ...
]

return (
    <div className="container">
        <Carousel cards={customArr}/>
    </div>
)
```

- fetch items with an api request and map them ([an example with type Event](https://github.com/asynchroza/react-hovering-cards-carousel/blob/master/src/Test__Carousel.tsx)):

```javascript
 const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://dev.thehub-aubg.com/api/event",
    }).then((res) => {
      let resData: Array<unknown> = res.data.data.events;
      let temp: Array<Event> = [];

      if (resData) {
        resdata.forEach((element: any) => {
          temp.push(
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

      setEvents(temp);
      }
    });
  }, []);


    return (
    <div className="App">
      <Carousel cards={events} />
    </div>
  );

```

### `<Carousel/>` styling:

You may use hex, rgb() and rgba() values everywhere color is mentioned.

```javascript
<Carousel cards={cards} buttonColor={"red"}>
// you can define colors the same way you do in css (hex, rgb(), rgba())
```

## Quirks:

### <strong>Events</strong> - You may add labels for upcoming events:

<img src="https://i.ibb.co/kmrDd3K/image.png">

`upcomingEventLabel` is an object which requires `text`, `backgroundColor` and `color`.

- `text` is what's getting rendered in the div
- `backgroundColor` is the color of the box
- `color` is the color of the text

```typescript
<Carousel
  cards={events}
  upcomingEventLabel={{
    text: "Upcoming",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    color: "black",
  }}
/>
```

<em>Box won't get rendered if `prop.startingTime` cannot be parse as a `Date()` object.</em>
