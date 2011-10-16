--- 
layout: post
title: "maphilight: image map mouseover highlighting"
excerpt: ""
wordpress_id: 23
wordpress_url: http://davidlynch.org/blog/2008/03/maphilight-image-map-mouseover-highlighting/
date: 2008-03-05 20:30:06 -06:00
tags: 
- programming
- javascript
- jquery
- canvas
- maphilight
---
<strong>UPDATE 2011-05-04:</strong> <a href="http://davidlynch.org/blog/2011/05/maphilight-1-3/">Version 1.3 released</a>. Works in IE9. (There's a pattern here.)

<strong>UPDATE 2010-05-22:</strong> <a href="http://davidlynch.org/blog/2010/05/maphilight-1-2/">Version 1.2 released</a>. Works in IE8.

I just released <a href="http://plugins.jquery.com/project/maphilight">maphilight</a>, a jQuery plugin that turns image maps into wonderful graphical masterpieces.

Image maps aren't so popular any more, for some strange reason.  So a quick definition: an imagemap is an <code><img></code> with the <code>usemap</code> attribute, pointing to a <code><map></code> that describes polygons that link places within that image.

This sprung from me wanting to display pretty highlighting of countries on a map, but not wanting to mess with flash for it.  It involves enough annoying fiddling with <code><canvas></code> (and VML, because IE is in the stone age) that I feel I'm saving other people a decent amount of work by releasing it.

<a href="http://davidlynch.org/js/maphilight/docs/demo_simple.html">Simple demo</a>
<a href="http://davidlynch.org/js/maphilight/docs/demo_world.html">Pretty demo using a world map</a>
<a href="http://davidlynch.org/js/maphilight/docs">Documentation</a>
<a href="http://davidlynch.org/js/maphilight/jquery.maphilight.js">Download</a> (requires <a href="http://jquery.com">jQuery</a>)

(Tools like "<a href="http://www.kolchose.org/simon/ajaximagemapcreator/">HTML-Image map Creator WYSIWYG</a>" might be handy if you want to make image maps yourself.)
