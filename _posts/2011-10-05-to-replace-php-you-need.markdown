--- 
layout: post
title: To replace PHP you need
excerpt: ""
wordpress_id: 161
wordpress_url: http://davidlynch.org/blog/?p=161
date: 2011-10-05 16:20:17 -05:00
tags: 
- programming
- php
---
(Expanding slightly on my response to <a href="http://news.ycombinator.com/item?id=3077031">this HN thread</a>.)

First: to be on all shared hosting everywhere. I.e. you need to be really easy to install, and preferably not involve long-running processes that shared hosts might choke on.

Second: to be beginner friendly. No requirement of understanding MVC, or running commands in a shell (hi RoR!). Pure instant gratification. Someone's first step into using PHP is likely going to be "I want the current date in the footer of my page", or "I want a random image on my homepage", or something like that. Anything like that you can handle by taking your existing page and dropping a tiny snippet in where you want the change to happen. <?=date('Y')?> is a potent thing to someone who has never programmed before.

Note: For point 2 many of the things serious programmers hate about PHP are actually advantages. All the functions in one big namespace? That's great! A newbie doesn't have to try to understand `<? import datetime; print datetime.date('Y'); ?>`.

It's easy to replace PHP for serious developers. We like advanced features, and care about a sane default library. We're willing to use complex tools to get a payoff.

It's hard to replace PHP for non-programmers who just want to tweak their static page in notepad so it has one cool new feature, or install a blogging package on their cheapo shared hosting.

To sum up: if you don't address both of these points then you haven't killed PHP. You're competing with Python or Ruby or whatever. PHP will carry right on ignoring you, because you're not addressing its fundamental use case.
