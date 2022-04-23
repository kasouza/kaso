---
title: "URL Shortener"
description: "Generate a shortened link"
date: "2022-04-21"
techs: ["javascript", "react", "jss"]
hasDemo: true
---
This app is quite simple, it generates a shortened version of a link inserted by the user. This is done using the [shrtco.de](https://shrtco.de/) API.

Due to the use of an API, I've had the chance to work a bit with asynchronous programming and callbacks, which is actually very straightforward to do with React, really showing how powerfull functional components and hooks can be.

Each one of the shortened links is a component by itself and takes care to display the current state of the API call, showing a loading animation while waiting for the response or the shortened link when the everything succeeds.

Another cool details about this project is the "Copy" button, that uses the Clipboard API to access the users clipboard, requiring to ask the user for permission to do this.

For styling, JSS was used and although it has the advantages of combining all the elements of a component (style, scripting and markup) in a single place and the ability to have some sort of dynamic css, I still prefer using something like Tailwind CSS or SASS.