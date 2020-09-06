/******************
 *
 *
 DATA USED BY THE APP
 - DEFAULT 'INITDATA' ARE LOADED WHEN THE APP LOADS FOR THE 1ST TIME & ARE ALSO USED WHEN THE USER 'RESETS' THE APP TO START OVER FROM THE BEGINING
 - COMMONLY USED 'CATEGORY' , 'AUTHROS' ARE ALSO EXPORTED AS THE CAN BE USED ELSEWHERE IN THE APP
 *
 *
 *****************/


import {getCacheData} from "_src/utils/Cache";





/*

 */
export const CATEGORY = {
    ARTS: 'art',
    HIST: 'history',
    CALL: 'calligraphy',
    DRAW: 'drawing',
    FASH: 'fashion',
    FILM: 'film',
    APPLE: 'apple',
    CAD: 'CAD',
    CERT: 'certification',
    COMP: 'computer science',
    DATB: 'databases'
}


/*

 */
export const AUTHORS = {
    RICSIL: "Richard E. Silverman",
    KYLSIM: "Kyle Simpson",
    NICZAK: "Nicholas C. Zakas",
    ERIELL: "Eric Elliott",
    AXERAU: "Axel Rauschmayer",
    ADDOSM: "Addy Osmani",
    MARHAV: "Marijn Haverbeke",
    GLENBLO: "Glenn Block, et al.",
};



/*

 */



/*

 */
 const INITDATA = {
    "books": [
        {
            "isbn13": "9781593275846",
            "isbn10": "1593275846",
            "title": "Eloquent JavaScript, Second Edition",
            "authors": [AUTHORS.MARHAV, CATEGORY.ARTS],
            "year": "2014",
            "publisher": "No Starch Press",
            "pages": 472,
            "description": "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "categories": [CATEGORY.APPLE, CATEGORY.ARTS],
        },
        {
            "isbn13": "9781449331818",
            "isbn10": "1449331818",
            "title": "Learning JavaScript Design Patterns",
            "authors": [AUTHORS.ADDOSM],
            "year": "2012",
            "publisher": "O'Reilly Media",
            "pages": 254,
            "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
            "categories": [CATEGORY.FILM, CATEGORY.HIST],
        },
        {
            "isbn13": "9781449365035",
            "isbn10": "1449365035",
            "title": "Speaking JavaScript",
            "authors": [AUTHORS.AXERAU],
            "year": "2014",
            "publisher": "O'Reilly Media",
            "pages": 460,
            "description": "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.  This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
            "categories": [CATEGORY.DATB, CATEGORY.FASH, CATEGORY.ARTS],
        },
        {
            "isbn13": "9781491950296",
            "isbn10": "1491950296",
            "title": "Programming JavaScript Applications",
            "authors": [AUTHORS.ERIELL],
            "year": "2014",
            "publisher": "O'Reilly Media",
            "pages": 254,
            "description": "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
            "categories": [CATEGORY.ARTS, CATEGORY.CAD],
        },
        {
            "isbn13": "9781593277574",
            "isbn10": "1593277574",
            "title": "Understanding ECMAScript 6",
            "authors": [AUTHORS.NICZAK],
            "year": "2016",
            "publisher": "No Starch Press",
            "pages": 352,
            "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
            "categories": [CATEGORY.CERT, CATEGORY.FASH, CATEGORY.ARTS],
        },
        {
            "isbn13": "9781491904244",
            "isbn10": "1491904244",
            "title": "You Don't Know JS",
            "authors": [AUTHORS.KYLSIM],
            "year": "2015",
            "publisher": "O'Reilly Media",
            "pages": 278,
            "description": "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the 'You Don’t Know JS' series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.",
            "categories": [CATEGORY.HIST, CATEGORY.CALL, CATEGORY.ARTS],
        },
        {
            "isbn13": "9781449325862",
            "isbn10": "1449325862",
            "title": "Git Pocket Guide",
            "authors": [AUTHORS.RICSIL],
            "year": "2013",
            "publisher": "O'Reilly Media",
            "pages": 234,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git experience.",
            "categories": [CATEGORY.CAD, CATEGORY.CERT, CATEGORY.ARTS],
        },
        {
            "isbn13": "9781449337711",
            "isbn10": "1449337711",
            "title": "Designing Evolvable Web APIs with ASP.NET",
            "authors": [AUTHORS.GLENBLO],
            "year": "2014",
            "publisher": "O'Reilly Media",
            "pages": 538,
            "description": "Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft’s ASP.NET Web API framework. In the process, you’ll learn how design and implement a real-world Web API.",
            "categories": [CATEGORY.COMP, CATEGORY.CAD, CATEGORY.ARTS],
        }
    ]
};


/*
DATA WILL BE SERVED TO APP AT LOAD TIME
- IF DATA HAS BEEN STORED BY USER, THEN THEY WILL BE SERVED BY CACHE,
OTHERWISE DEFAULT DATA ARE SERVED
 */
export const DATA = getCacheData() || INITDATA;
