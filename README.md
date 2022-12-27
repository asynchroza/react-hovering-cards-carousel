# React Hovering Cards Carousel (TypeScript)

<img src="https://i.ibb.co/2SRfLyp/image.png">

## How to use:

In order for the Component's styling to work, you need to import `style.css`:

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
    image: string; # <img src={prop.image}/>
    description: string;
    location: string; # url (e.g. Google Maps)
    startingTime: string; # ISO String
    link: string; # url (e.g. Facebook)
```

### type `Article`:

```javascript
    title: string;
    link: string; # url (e.g. Medium)
    author: string; 
    image: string; # <img src={prop.image}/>
```

---

### Initialize the component:
Create a list and populate it with objects of type `Custom` | `Event` | `Article` and then pass it to `<Carousel/>`


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

### `<Carousel/>` styling:

The Carousel component has preset values for `backgroundColor` and `buttonsColor`.  
If left unaddressed, the component is going to have a `transparent` background and `black` buttons. 

If you wish to change the colors, you can achieve it by doing:

```javascript
<Carousel cards={cards} backgroundColor={"yellow"} buttonsColor={"red"}>
// you can define colors same way you do in css (hex, rgb(), rgba())
```