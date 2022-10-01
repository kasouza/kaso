---
title: KSHTTP
description: "A HTTP library written in C++"
date: "2022-04-21"
techs: ["cpp"]
---
KaSouza's HTTP is probably the most different project in this portfolio, it isn't even for the Web! Well, actually it kinda is, but not in the frontend and also isn't a backend app, but actually a library to write servers!

It's far from something like Apache or Nginx, with just basic features, such as middlewares and basic routing.

For now it only works for Linux and maybe Mac (i'm not sure to be honest), but surely not on Windows, because of the different API's used (winsocket x socket API), but I really want to make this project cross-platform in the future.

This is probably the project I've had the most fun building and really plan on continue to develop and maybe even make it somewhat production-ready in the future. Although it is usable right now, and you can even make something usefull, it is very far from complete, especially in the optimization side.

Some of the stuff I plan on adding:
- Caching
- Multithreading
- Optimizations for the header parsing
- Conform better to the HTTP standard
