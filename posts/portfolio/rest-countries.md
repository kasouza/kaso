---
title: "REST Countries"
description: "Lookup informations about a country"
date: "2022-04-21"
techs: ["typescript", "react", "tailwind"]
hasDemo: true
---
REST Countries is a web app where you can search for a country and see some informations about it. The UI is very simple and clean with o dark mode switch so you don't have to burn your beautiful eyes while trying to find out how many people live in Kenya!

All the data comes from the [restcountries.com](https://restcountries.com/) API. Right now, after the very first request, all the data is cached in the user's local storage, never to be update again, just to avoid unecessary calls to the API. In a production scenario a better cache management could (and should) totally be done.

The search was implemented with a basic JS array filter method on the countries list. Not a very efficient and smart method, but works okay and withoy a lot of added complexity. The filter for regions works the same way. I nice addition to a possible future refactor could be a "real time search", where while the user types, the countries are updated.

For the styling I chose to go with Tailwind CSS for its ease of use and great improvement in the development speed. Working with Tailwind is very satisfying, in minutes you can have a nice responsive page without having to deal with random px values around your code or media queries. Oh and it's very simple to implement a dark mode switch using it, take a look [here](https://tailwindcss.com/docs/dark-mode)!

Oh and I can't forget about TypeScript. There's not much to say about, I just can't live without it anymore, that's it. Just by using TS your code gets much better intelisense, and if you use it the right way, a LOT of bugs can be caught before even happening, it's almost magic!