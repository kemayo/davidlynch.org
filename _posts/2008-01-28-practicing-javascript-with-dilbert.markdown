--- 
layout: post
title: Practicing JavaScript with Dilbert
excerpt: ""
wordpress_id: 20
wordpress_url: http://davidlynch.org/blog/2008/01/practicing-javascript-with-dilbert/
date: 2008-01-28 08:53:16 -06:00
tags: 
- programming
- javascript
- ajax
- jquery
- dilbert
---
I [discovered](http://dilbertblog.typepad.com/the_dilbert_blog/2008/01/dilbert-widget.html) that there was a [flash widget](http://widget.dilbert.com/) displaying Dilbert archives in color, back to the start of 2007.

Naturally I thought to myself "aha, there must be an XML data feed somewhere in that!"  Some light flash-decompilation later, I discovered that I was right.

I then seized on this as a learning opportunity, and wrote a much better viewer, in boring old JavaScript. Why is it better?  Because it doesn't require Flash, and is not limited to one panel at a time, that's why.

[My Dilbert viewer, can you view it?](http://toys.davidlynch.org/dilbert/)

Caveats:
1. It's perfect in Firefox3 and Safari. Sundays aren't *quite* right in IE7; the first and last buttons are missing in Opera. All else is untested.
2. For some reason, the widget seems to get different feeds for the last week or two, which means this viewer is a week behind. I suspect user-agent sniffing, but have not yet been motivated to work out what a flash-player's user-agent is.

Things learned:
1. Cross-domain xmlhttprequest requiring a proxy is a pain, and has no obvious benefit.
2. [jQuery](http://www.jquery.com) is still awesome.
3. Forgetting to take out debug statements that rely on FireBug when uploading is dumb of me.
4. Decompiling these things is complex -- the embed code provided loads a .swf, which loads a .swf, which finally loads the actual widget that displays the comics.

<ins>Update: I worked out the cause of the weird out-of-sync-ness I observed between the data files I received and the content seen in the official widget. The lesson is not to trust the data feed when it tries to tell you which domain to look at; it includes a &lt;Domain&gt; tag, which seems like a perfect complement to the domain-less URLs given in the strip descriptions. However, that domain contains files that are several weeks out of date. So I just hardcoded the "real" URL.</ins>

<ins>They finally released this stuff to the main Dilbert site, so I just went through and fixed up the viewer to use the appropriate new feed format. Darn changes.</ins>
