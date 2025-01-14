---
layout: post
title: "Raking Jekyll"
date: 2011-10-27 01:11:43 -0500
published: true
disqus_threadid: 454722873
tags:
- programming
- jekyll
- ruby
- rake
---
I've never really touched `rake` before, but since [switching to Jekyll][switching] I'm finding that it's becoming an essential part of my workflow. In the limited area of blogging, at least.

`rake` is a version of `make` in which you define all your targets in Ruby. Because practically anything would be an improvement over [`Makefile` syntax][makefile], this is pretty easy to work with. I'm not a huge fan of shell scripting at the best of times, so mixing it in with something else is... not desirable. I still find Ruby less intuitive than Python, but that's my prejudices talking.

To elaborate... what does posting a new entry look like for me?

1. `rake server` to start up an automatically-rebuilding local webserver copy of my blog
2. `rake post[raking-jekyll]` to make a new post with the YAML front matter boilerplate
3. Actually edit the newly created post in an editor
4. `rake deploy` to rsync the local copy to my hosting over ssh

Any part of my routine which looks like it might be scriptable has been replaced with a `rake` target. For example, the `post` target:

1. Copies a template file
2. Names it according to the current date and provided title
3. Adds an expanded version of the current date into its YAML front matter so sorting will work correctly if I post multiple times a day

Since I rarely know the current date without having to look it up, that certainly saves me some effort.

Here's [my Rakefile][rakefile], if you want to use anything from it. It's probably not properly idiomatic Ruby, but it does at least work.

[rakefile]: https://github.com/kemayo/davidlynch.org/blob/master/Rakefile
[switching]: http://davidlynch.org/blog/2011/10/jekyll/
[makefile]: http://locklessinc.com/articles/makefile_tricks/ "this is sort of cheating as a bad example"
