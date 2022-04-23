---
title: "WVim"
description: "A vim clone for the web"
date: "2022-04-21"
techs: ["html", "css", "javascript"]
hasDemo: true
---
WVim (WebVim) is a very simple clone of the famous Vim text editor, but with just some basic features. I never pretended to make an actual full-fledged Vim clone with this project, it was made just for the fun of doing it and to see if I actually could do something.

By the Time I developed this, I was very interested in rich text editors and wondered if I could make one. I was also very into using and tweaking Vim, so I thought "Why not make a Vim clone?". And here it is!

The code is structured using some big objects that manage one part of the app, the BufferManager manages buffers, the DOMManager manages the DOM and so on. As this projects ain't very big, this turned out to be a nice way to organize it and this structure may even be used for larger project with some changes to it.

Anyway, I've had quite a fun time developing this and wasn't a very hard project to put together, apart from how hard can be to align the cursor to the letters. Turns out the best way I found to solve this issue was to wrap the letter the cursor should be in (ask the CursorManager where it is) and add some style to it.

Maybe using the canvas element I could've achieved something even better, but not using it actually made me think on different ways to use HTML and CSS to achive some nice results. This is actually a good exercise to see how powerfull these two can be together and how many cool thing we can build using just these two simple tools, obviously with the help of our friend Javascript!