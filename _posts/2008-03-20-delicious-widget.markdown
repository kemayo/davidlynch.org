--- 
layout: post
title: del.icio.us widget
excerpt: ""
wordpress_id: 26
wordpress_url: http://davidlynch.org/blog/?p=26
date: 2008-03-20 11:21:45 -05:00
tags: 
- programming
- javascript
- wordpress
- delicious
- widget
---
I couldn't find a WordPress widget that produced output similar to <a href="http://del.icio.us/help/linkrolls">del.icio.us's linkrolls script</a>.  (You <em>can</em> just put their script into a Text widget, but its output doesn't always mesh well with WordPress themes -- it hardcodes h2s, and so forth.)

The <a href="http://automattic.com/code/widgets/">Automattic example widget</a> came close, but was a bit lacking on the customization front.

<a href="http://rick.jinlabs.com/code/delicious/">del.icio.us for WordPress</a> also came close, but I disagree with having your server fetch the RSS feed, instead of using the perfectly good JSON API.

So I took the Automattic widget, hacked some extra features into it, made it configurable, and you can now see it in my sidebar.  Well, footer currently.  It's a theme thing.

If you want it yourself, here's the link:  <a href='http://wordpress.org/extend/plugins/delicious-plus/'>del.icio.us plus</a>

<ins>Edit on 2008-03-27: This is now in the wordpress.org plugins repository.</ins>
<ins>Edit on 2008-04-16: Version 1.1 released, granting multiple widget instances.</ins>
