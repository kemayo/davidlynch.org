--- 
layout: post
title: Fixing sortForce in jQuery's tablesorter
excerpt: ""
wordpress_id: 21
wordpress_url: http://davidlynch.org/blog/2008/02/fixing-sortforce-in-jquerys-tablesorter/
disqus_threadid: 445428442
date: 2008-02-05 14:49:47 -06:00
tags: 
- programming
- javascript
- jquery
---
[jQuery](http://www.jquery.com) has a [table-sorting plugin](http://tablesorter.com/docs/ tablesorter), part of their [official UI project](http://ui.jquery.com/). It's quite a nice table-sorting library, handling the common cases, with options making it configurable to suit many people's needs.

*However*, I ran into a problem when using it in a project. The documentation and the functionality don't quite line up.

It has an option, sortForce, which its documentation says you can use to "add an additional forced sort that will be appended to the dynamic selections by the user". This is a handy concept -- it lets you, say, keep records ordered by name, regardless of which other criteria the user chooses to sort by.

The problem is that it actually *prepends* the sort to the user's selection, which means that the user is restricted to sorting within the forced sort. (This is also a potentially useful tool; it's just not what the documentation indicates.)

So I wrote up [a patch](http://davidlynch.org/js/jquery.tablesorter.sortForce_optimal.patch jQuery Tablesorter sortForce patch) that fixes this, along with a few other niggling issues with sortForce. (Its interaction with the user sorting by multiple columns, and it locking the forced-sort column in one sort direction.)  To preserve backwards-compatibility I added a new option, sortAppend, to provide the documented behavior.

I also submitted the patch to the maintainer, so hopefully it can get incorporated.

<ins>2008-08-27: My patch was incorporated as of version 2.0.2, so it's all good.</ins>
<ins>2009-03-17: But bits of it weren't applied, so it can't be said to have been fixed. Oh well. I'll resubmit.</ins>
