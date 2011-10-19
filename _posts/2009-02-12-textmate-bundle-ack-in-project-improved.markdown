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
I use [TextMate](http://macromates.com/) for work. It's a good editor, doesn't get in my way, and I take advantage of relatively few of its nifty features.

One *problem* with TextMate is that its built-in search is very slow, especially across a large project. Since I work with a full checkout of the deviantART source code, searches can take a while.

So I started using [Ack in Project](http://github.com/protocool/ack-tmbundle/tree/master), a TextMate bundle that uses [ack](http://petdance.com/ack/) to search your project. (Ack is a nifty little tool that combines grep and find, along with a number of useful optimizations for searching checked-out source code.)

However, Ack in Project doesn't expose a very useful part of ack's functionality, which is the ability to search just particular filetypes. This has occasionally been a pain -- some words appear commonly in PHP and JS files, but I only care about them in the PHP.

So I spent a little while this evening adjusting Ack in Project to let you choose a file type to search.

<img src="/blog/images/2009/02/picture-9.png" alt="My Ack in Project tweak" title="my-ack-in-project" width="561" height="268" class="size-full wp-image-67" />

My version is up on [github](http://github.com/kemayo/ack-tmbundle/tree/master).

If you'd like to use it, do this:

{% highlight console %}
$ cd ~/Library/Application\ Support/TextMate/Bundles
$ git clone git://github.com/kemayo/ack-tmbundle.git Ack.tmbundle
{% endhighlight %}

(It was my first time messing with tm_dialog, so I'm not necessarily confident about how I did it. But it works!)
