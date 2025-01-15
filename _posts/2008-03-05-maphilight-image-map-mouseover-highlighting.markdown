--- 
layout: post
title: "maphilight: image map mouseover highlighting"
excerpt: ""
wordpress_id: 23
wordpress_url: https://davidlynch..org/blog/2008/03/maphilight-image-map-mouseover-highlighting/
disqus_threadid: 445428450
date: 2008-03-05 20:30:06 -06:00
tags: 
- programming
- javascript
- jquery
- canvas
- maphilight
---
**UPDATE 2011-05-04:** [Version 1.3 released]({% post_url 2011-05-04-maphilight-1-3 %}). Works in IE9. (There's a pattern here.)

**UPDATE 2010-05-22:** [Version 1.2 released]({% post_url 2010-05-22-maphilight-1-2 %}). Works in IE8.

I just released [maphilight](http://plugins.jquery.com/project/maphilight), a jQuery plugin that turns image maps into wonderful graphical masterpieces.

Image maps aren't so popular any more, for some strange reason. So a quick definition: an imagemap is an `<img>` with the `usemap` attribute, pointing to a `<map>` that describes polygons that link places within that image.

This sprung from me wanting to display pretty highlighting of countries on a map, but not wanting to mess with flash for it. It involves enough annoying fiddling with `<canvas>` (and VML, because IE is in the stone age) that I feel I'm saving other people a decent amount of work by releasing it.

* [Simple demo](/projects/maphilight/docs/demo_simple.html)
* [Pretty demo using a world map](/projects/maphilight/docs/demo_world.html)
* [Documentation](/projects/maphilight/docs)
* [Download](https://github.com/kemayo/maphilight/) (requires [jQuery](https://jquery.com))

(Tools like "[HTML-Image map Creator WYSIWYG](http://www.kolchose.org/simon/ajaximagemapcreator/)" might be handy if you want to make image maps yourself.)
