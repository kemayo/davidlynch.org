--- 
layout: post
title: Thoughts on Ruby on Rails after one day of work
excerpt: ""
wordpress_id: 15
wordpress_url: http://davidlynch.org/blog/2008/01/thoughts-on-ruby-on-rails-after-one-day-of-work/
date: 2008-01-09 14:30:01 -06:00
tags: 
- programming
- ruby
- rails
---
I started looking at <a href="http://www.rubyonrails.org">Rails</a> (leading to <a href="http://davidlynch.org/blog/2008/01/rails-20-scaffolding/">my talking about scaffolding</a>) because I wanted to try writing my next work-project in it.

I don't know about others... but I hate learning a language/framework in isolation from a project.  Writing an insipid tutorial project that I don't care about doesn't <em>involve</em> me, and so I don't learn as well.  Also, the applications written alongside tutorials tend to be very carefully chosen to hit all the good parts of a framework, while ignoring the rough spots.  Thus I've historically viewed "prototyping my next project" as a great time to pick up something new.

So.  I started Rails tutorials on Friday, didn't touch it at all over the weekend, and by mid-morning on Monday I had my proof-of-concept app.  I'm storing legal documents described in XML, allowing people to fill in some defined fields on them, then generating custom PDFs/RTFs/PNGs/whatevers using <a href="http://xmlgraphics.apache.org/fop/">Apache FOP</a>.  (That sounds more complex than it is.  I'll post an example later.)

Rails itself is being reasonably unobtrusive, which I approve of.  I had to do minor research into how to set up custom mime types for response formats, but it turned out to be quite simple.
