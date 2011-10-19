--- 
layout: post
title: Yahoo! Pipes is awesome
excerpt: ""
wordpress_id: 8
wordpress_url: http://davidlynch.org/blog/2007/12/yahoo-pipes-is-awesome/
date: 2007-12-10 13:55:21 -06:00
tags: 
- blogroll
- programming
---
I like [Dan Savage's column](http://thestranger.com/savage) in the Seattle newspaper The Stranger. He also writes a blog for them. However, his entries are all mixed in with a great many other people's entries, and there's only an RSS feed for the amalgam.

This wasn't a problem, because his entries were output at the bottom of the most-recent-column page, as well. But that seems to have stopped.

So I was faced with a dilemma. I wanted to read his entries without subscribing to a high-traffic blog.

I considered writing my own feed filterer, registering filtr.com, and trying to get bought out by Google. Then it occurred to me that I should check whether someone beat me to it.

Googling for "feedfilter" (the first thing that came to mind) got me to [the feedfilter project on Google Code](http://code.google.com/p/feedfilter/). I thought to myself "this is only 'a java program running as a CGI'... I bet it's not hip enough for Google". But then I noticed that link to [Yahoo! Pipes](http://pipes.yahoo.com/). I checked it out, and my dreams of being a web2.0 billionaire died.

It turns out that Yahoo! Pipes is totally rad.

Not so much for what it does, as for how it does it. They have put the effort into making a really good GUI. It reminds me of Lego Mindstorms, or more recently of Automator for Mac OS X.

It's this lovely system of connecting components together. I just had to pick a feed source, connect it to a filter, tell the filter I only wanted items whose author was "Dan Savage", and hook it up to the output.

<img src="/blog/images/2007/12/pipes.png" alt="three components: a feed, a filter, and output" />

Now [my custom feed](http://pipes.yahoo.com/pipes/pipe.info?_id=WKTRnmen3BGSeUJ49YS63A) works, and is providing me with much useful content in my Google Reader.

(I would like to acknowledge that this is old hat. Pipes was released months ago, and I even noticed people talking about it at the time. I didn't realize quite how *useful* it is until I encountered this need, though.)
