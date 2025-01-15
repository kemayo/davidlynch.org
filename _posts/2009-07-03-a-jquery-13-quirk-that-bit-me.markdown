--- 
layout: post
title: A jQuery 1.3 quirk that bit me
excerpt: ""
wordpress_id: 84
wordpress_url: https://davidlynch..org/blog/?p=84
disqus_threadid: 445428555
date: 2009-07-03 14:58:04 -05:00
tags: 
- programming
---
deviantART just upgraded to jQuery 1.3, and we found an undocumented jQuery change that broke some things.

The behavior of the `:enabled` selector changed. Before it selected all enabled form elements, now it selects all enabled *and non-hidden* form elements. This bit us, because we were using jQuery to assemble some form elements to submit over xmlhttprequest... and now some hidden fields weren't getting included.

This means that if you were using `:enabled`, you now need to use `:not(:disabled)` to get the old behavior.

A bit of googling turned up that [this is a deliberate change, to match the behavior of querySelectorAll](http://www.nabble.com/Re%3A-Selector-%3Aenabled-no-longer-finds-hidden-elements-p21743026s27240.html) in browsers that have implemented it. I'd disagree with the phrasing John Resig used, "more standards compliant", since "enabled" has a specific meaning in the standards.

This should really have been in [the release notes](http://docs.jquery.com/Release:jQuery_1.3)...
