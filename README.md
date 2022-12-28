# React Hovering Cards Carousel

React Carousel which renders cards with hover effects.

[Find on GitHub](https://github.com/asynchroza/react-hovering-cards-carousel)  
[Find on NPM](https://www.npmjs.com/package/react-hovering-cards-carousel)

<img src="https://i.ibb.co/2SRfLyp/image.png">

## How to use:

In order for the component's styling to work, you need to import `style.css`:

```javascript
import `../node_modules/react-hovering-cards-carousel/dist/style.css`
```

## `<Carousel/>`:

```javascript
<Carousel cards={events} backgroundColor={"white"} buttonsColor={"black"} />
```

- `cards` props accepts a list of type `Custom`, `Article` or `Event`:

### type `Custom`:

```javascript
# TBA
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

The Carousel component has preset values for `backgroundColor` and `buttonsColor`.  
If left unaddressed, the component is going to have a `transparent` background and `black` buttons.

If you wish to change the colors, you can achieve it by doing:

```javascript
<Carousel cards={cards} backgroundColor={"yellow"} buttonsColor={"red"}>
// you can define colors the same way you do in css (hex, rgb(), rgba())
```

## Quirks:


### <strong>Events</strong> - You may add labels for upcoming events: 

<img src="https://i.ibb.co/kmrDd3K/image.png">

`upcomgEventLabel` is an object which requires `text`, `backgroundColor` and `color`.

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

<em>Box won't get rendered if `prop.startingTime` is not a parsable `Date()`</em>
