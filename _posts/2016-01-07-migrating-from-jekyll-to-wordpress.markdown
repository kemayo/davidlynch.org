---
layout: post
title: "Migrating from Jekyll to WordPress"
date: 2016-01-07 01:01:00 -0500
published: true
tags:
- jekyll
- migration
- php
- plugin
- wordpress
---
Funnily enough, there aren't all that many resources for people who're moving _from_ Jekyll _to_ WordPress. I took some advice from [a post by Fabrizio Regini](http://fabrizioregini.info/blog/2014/11/02/migrate-your-blog-from-jekyll-to-wordpress-in-3-steps/), but had to modify it a bit, so here's what I figured out...

My starting point was a Jekyll-based site [stored on github](https://github.com/kemayo/davidlynch.org). Comments were stored using Disqus.

As a first step, I installed WordPress on my hosting. This was, as they like to boast, very easy.

Next I had to get all my existing content into that WordPress install. I decided the easiest way to do this was to use the [RSS import plugin](https://wordpress.org/plugins/rss-importer/) that WordPress recommends. So I added [an RSS export file](https://github.com/kemayo/davidlynch.org/blob/master/export.xml) to my Jekyll site and ran Jekyll to have it build a complete dump of all my posts which I could use.

Here I ran into a problem. I'd set up my new WordPress site on PHP 7... and the RSS importer wasn't able to run because it was calling a removed function. It was just a magic-quotes-disabling function, so I tried editing the plugin to remove it. However, after doing this I found that running the importer on my completely-valid (I checked) RSS file resulted in every single post having the title and contents of the final post in the file. So, plugin debugging time!

While doing this I discovered that the RSS importer was written using regular expressions to parse the XML file. Although, yes, this is about as maximally compatible as possible, I decided that it was better not to go down the rabbit hole of debugging that, and just rewrote the entire feed-parsing side of it to use PHP's built-in-since-PHP-5 SimpleXML parser. This fixed my title/contents problem.

My version of the plugin is [available on github](https://github.com/kemayo/wp-rss-importer). I can't say that I tested it on anything besides the specific RSS file that I generated, but it should be maintaining the behavior of the previous plugin.

With all my posts imported, I went through and did a little maintenance:

*   The import gave me post slugs which were all auto-generated from the title, while some of mine in Jekyll had been customized a bit, so I updated those to keep existing URLs working.
*   All images in posts needed to be updated. I went through and fixed these up by uploading them through WordPress.
*   Some markup in posts needed to be fixed. Mostly involving <code> tags.

Next came importing comments from Disqus. I tried just installing the Disqus plugin and letting it sync, but it seems that relies on you having WordPress post IDs associated with your comments... which I naturally didn't. So I went out and found [a Disqus comment importer plugin](https://wordpress.org/plugins/disqus-comments-importer/)... which, much like the RSS importer, was broken. It expects a version of the Disqus export file which was current around 5 years ago, when it was last updated.

Thus we have [my version of the Disqus comment importer plugin](https://github.com/kemayo/wp-disqus-importer). It tries to work out the ID of your posts by looking at the URL. This works pretty well, but I did have to edit a few of the URLs in the export file to make sure they matched my current permalink structure. If you've never changed your permalinks, you should be good without that step.

Migration: complete.