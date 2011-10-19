--- 
layout: post
title: svn synonym
excerpt: ""
wordpress_id: 9
wordpress_url: http://davidlynch.org/blog/2007/12/svn-synonym/
date: 2007-12-11 09:07:50 -06:00
tags: 
- programming
- version-control
- svn
---
I'd like to take a moment to (a) completely alienate my audience, and (b) ruin my credibility. I will do this by discussing the semantics of a particular operation of the [Subversion](http://subversion.tigris.org/) version control system, and explaining how poorly I initially understood it.

It took me a while to realize how `svn merge` should be used. My intuitive sense of the usage of the command diverged significantly from its actual use.

When I think of it as "merge" the syntax that intuitively appears is `svn merge [source] [target]`, with the intent of merging "source" into "target".

This led to my attempting to merge from branch HEAD to trunk HEAD, and be puzzled at the lack of effect.

I find that everything fits together if I think of `svn merge` as a synonym for `svn repeat`. You're asking for the changes between two revisions to be applied to the current working copy.

Thus `svn merge branches/coolfeature trunk` doesn't do anything *because it doesn't describe any changes*.

What's required is `svn merge branches/coolfeature@73 branches/coolfeature@HEAD`, which takes the changes made to the coolfeature branch between revision 73 and the latest revision, and applies them to the working copy you're currently in.

(It's much shorter to write this as: `svn merge -r 73:HEAD branches/coolfeature`)

The awkward bit is finding out when you should start merging from (the "73" in my example). To do this you have to read the logs and find either the revision where you created the branch or the last revision you merged from, whichever is more recent.

All this should become irrelevant shortly, though. Subversion 1.5 ([according to an aside in this developer blog post](http://blog.red-bean.com/sussman/?p=79)) will automatically track much merge metadata so the requirement to specify revision ranges of changes to merge should be eliminated in the common case. I look forward to it.
