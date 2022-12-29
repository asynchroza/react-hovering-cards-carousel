export class Event {
  title: string;
  image: string;
  description: string;
  location: string;
  startingTime: string;
  link: string;

  constructor(
    title: string = "",
    image: string = "",
    description: string = "",
    location: string = "",
    startingTime: string = "",
    link: string = ""
  ) {
    this.title = title;
    this.image = image;
    this.startingTime = startingTime;
    this.location = location;
    this.description = description;
    this.link = link;
  }
}

export class Article {
  title: string;
  link: string;
  author: string;
  image: string;

  constructor(
    title: string = "",
    author: string = "",
    link: string = "",
    image: string = ""
  ) {
    this.title = title;
    this.link = link;
    this.author = author;
    this.image = image;
  }
}

export class Custom {
  image: string;
  children: JSX.Element; 

  constructor(image: string = "", children: JSX.Element) {
    this.image = image;
    this.children = children;
  }
}
