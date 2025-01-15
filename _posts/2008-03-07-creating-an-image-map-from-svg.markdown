--- 
layout: post
title: Creating an image map from SVG
excerpt: ""
wordpress_id: 24
wordpress_url: https://davidlynch..org/blog/2008/03/creating-an-image-map-from-svg/
disqus_threadid: 445428459
date: 2008-03-07 10:55:43 -06:00
tags: 
- programming
- python
- jquery
- svg
---
I was asked how I made [the map](/projects/maphilight/docs/demo_world.html) in my examples earlier.

I wrote [a small script](/toys/svg2imagemap.zip) to do it. (The script is quite limited -- I only made it complete enough to handle the SVG files I was using. Others might break it. Also, it requires pyparsing... and hoo-boy is that slow.)

Example!

Wikipedia is good for this, and has provided me with the example file I'll use, [a map of the USA](http://en.wikipedia.org/wiki/Image:Map_of_USA_with_state_names.svg). If you have some GIS data already, I believe that ArcGIS 9.2 has native SVG support, or it looks like you can convert ESRI shapefiles with [shp2svg](http://www.carto.net/papers/svg/utils/shp2svg/).

My example file is filled with all sort of crud that isn't a definition of state boundaries, though, so I need to get just that. Perusing it (in a text editor or a SVG editor like Inkscape) reveals that all the state borders are in a group named "States". Helpful!

So I run my script: `svg2imagemap.py Map_of_USA_with_state_names.svg 960 593 States`

(The "960 593" is the size of the image I'm creating from the SVG file.)

This creates an html file named [svg name].html, so Map_of_USA_with_state_names.html. It only contains the area tags, so I dump them into an image map in a page set up like the one in the other examples...

And we get: [A map of the USA](/projects/maphilight/docs/demo_usa.html).

**Just to disclaim again: That script is unlikely to be immediately useful for any particular SVG image. You would almost certainly need to tweak it significantly to make it work for your purposes. But it's a good start, at least.**

**One last time: I make no guarantee of this script working on an arbitrary SVG file. At best it's an example of an approach to take. If you use it, expect to have to debug how it interacts with your particular file.**
