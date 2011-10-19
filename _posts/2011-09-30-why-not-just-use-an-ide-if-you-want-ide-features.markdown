--- 
layout: post
title: Why not just use an IDE if you want IDE features?
excerpt: ""
wordpress_id: 147
wordpress_url: http://davidlynch.org/blog/?p=147
date: 2011-09-30 22:34:35 -05:00
tags: 
- programming
- editor
- ide
---
After I [posted](http://davidlynch.org/blog/2011/09/sublime-text-2-git-plugin/) about my [Sublime Text 2 git plugin](https://github.com/kemayo/sublime-text-2-git/wiki) I got one response which I thought was worth responding to.

<blockquote cite="http://www.reddit.com/r/programming/comments/ktmh5/a_git_plugin_for_sublime_text_2/c2nbsth">That looks helpful, but I often wonder why not just use an IDE if you want IDE features.</blockquote>

Obviously I have a bias here, but I'll try to be fair to IDEs...

An IDE is an editor that does a lot of things, many of them well. If there's something you want to do it'll almost certainly let you do it, but if you're not happy with some basic element of how it works then you're stuck having to find a new IDE. (Yes, I know, many IDEs have plugins available, but I've never had that much luck with them.)

IDEs also tend to be built with a workflow in mind. If you conform to that workflow then they'll be good to you, but you want to deviate from it you may have to fight with your tools.

A lightweight-but-extensible editor (e.g. Sublime, TextMate, vi, and so on) tends to focus on having a *really good* editing experience. So you start with good editing, and then you pick and choose the "IDE features" that you want to mix in. If part of the editor doesn't work how you want you might have to find a new plugin for it, but since it's not a massive and complicated system it's likely to be easier to find that plugin.

Neither is necessarily better, but they do tend to appeal to different types of developer. Web developers, needing to work with a number of different file types, and not generally having complicated build system requirements, gravitate towards the lightweight editors.

<b>UPDATE:</b> To be clear, I'm not saying either is better. It's a matter of personal choice and situation. As someone who mostly does web development in dynamic languages, I like using a fairly lightweight editing environment. If I wrote in Java I'm sure I'd be singing the praises of IntelliJ/Eclipse/whatever, because I understand that Java is almost impossible to write well *without* an IDE.
