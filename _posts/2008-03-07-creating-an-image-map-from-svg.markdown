--- 
layout: post
title: Creating an image map from SVG
excerpt: ""
wordpress_id: 24
wordpress_url: http://davidlynch.org/blog/2008/03/creating-an-image-map-from-svg/
date: 2008-03-07 10:55:43 -06:00
tags: 
- programming
- python
- jquery
- svg
---
I was asked how I made <a href="http://davidlynch.org/js/maphilight/docs/demo_world.html">the map</a> in my examples earlier.

I wrote <a href="http://davidlynch.org/toys/svg2imagemap.zip">a small script</a> to do it.  (The script is quite limited -- I only made it complete enough to handle the SVG files I was using.  Others might break it.  Also, it requires pyparsing... and hoo-boy is that slow.)

Example!

Wikipedia is good for this, and has provided me with the example file I'll use, <a href="http://en.wikipedia.org/wiki/Image:Map_of_USA_with_state_names.svg">a map of the USA</a>.  If you have some GIS data already, I believe that ArcGIS 9.2 has native SVG support, or it looks like you can convert ESRI shapefiles with <a href="http://www.carto.net/papers/svg/utils/shp2svg/">shp2svg</a>.

My example file is filled with all sort of crud that isn't a definition of state boundaries, though, so I need to get just that.  Perusing it (in a text editor or a SVG editor like Inkscape) reveals that all the state borders are in a group named "States".  Helpful!

So I run my script: <code>svg2imagemap.py Map_of_USA_with_state_names.svg 960 593 States</code>

(The "960 593" is the size of the image I'm creating from the SVG file.)

This creates an html file named [svg name].html, so Map_of_USA_with_state_names.html.  It only contains the area tags, so I dump them into an image map in a page set up like the one in the other examples...

And we get: <a href="http://davidlynch.org/js/maphilight/docs/demo_usa.html">A map of the USA</a>.

<b>Just to disclaim again: That script is unlikely to be immediately useful for any particular SVG image.  You would almost certainly need to tweak it significantly to make it work for your purposes.  But it's a good start, at least.</b>

<b>One last time: I make no guarantee of this script working on an arbitrary SVG file. At best it's an example of an approach to take. If you use it, expect to have to debug how it interacts with your particular file.</b>
