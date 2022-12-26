export class Event {
    title: string;
    image: string;
    description: string;
    location: string;
    startingTime: string;
    link: string;

    constructor(title: string = "", image: string = "", description: string = "", location: string = "", startingTime: string = "", link: string = ""){
        this.title = title;
        // url to image / directory location
        this.image = image;
        // ISO String
        this.startingTime = startingTime;
        // url in google maps
        this.location = location;
        this.description = description;
        // url in social media
        this.link = link;
    }
}

export class Article {
    title: string;

    constructor(title: string = ""){
        this.title = title;
    }
}

export class Custom {
    title: string;

    constructor(title: string = ""){
        this.title = title;
    }
}
