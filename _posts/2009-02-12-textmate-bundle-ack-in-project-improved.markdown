--- 
layout: post
title: "TextMate bundle: Ack in Project (improved)"
excerpt: ""
wordpress_id: 63
wordpress_url: http://davidlynch.org/blog/?p=63
date: 2009-02-12 21:54:46 -06:00
tags: 
- programming
- textmate
- ack
- bundle
---
I use <a href="http://macromates.com/">TextMate</a> for work.  It's a good editor, doesn't get in my way, and I take advantage of relatively few of its nifty features.

One <em>problem</em> with TextMate is that its built-in search is very slow, especially across a large project.  Since I work with a full checkout of the deviantART source code, searches can take a while.

So I started using <a href="http://github.com/protocool/ack-tmbundle/tree/master">Ack in Project</a>, a TextMate bundle that uses <a href="http://petdance.com/ack/">ack</a> to search your project.  (Ack is a nifty little tool that combines grep and find, along with a number of useful optimizations for searching checked-out source code.)

However, Ack in Project doesn't expose a very useful part of ack's functionality, which is the ability to search just particular filetypes.  This has occasionally been a pain -- some words appear commonly in PHP and JS files, but I only care about them in the PHP.

So I spent a little while this evening adjusting Ack in Project to let you choose a file type to search.

<img src="http://davidlynch.org/blog/wp-content/uploads/2009/02/picture-9.png" alt="My Ack in Project tweak" title="my-ack-in-project" width="561" height="268" class="size-full wp-image-67" />

My version is up on <a href="http://github.com/kemayo/ack-tmbundle/tree/master">github</a>.

If you'd like to use it, do this:

<pre><code class="prettyprint">cd ~/Library/Application\ Support/TextMate/Bundles
git clone git://github.com/kemayo/ack-tmbundle.git Ack.tmbundle</code></pre>

(It was my first time messing with tm_dialog, so I'm not necessarily confident about how I did it. But it works!)
