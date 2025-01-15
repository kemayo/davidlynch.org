--- 
layout: post
title: Smart Home in TextMate
excerpt: ""
wordpress_id: 74
wordpress_url: https://davidlynch..org/blog/?p=74
date: 2009-03-28 01:59:41 -05:00
tags: 
- programming
- ruby
- textmate
- bundle
---
I really like "smart home" behavior in text editors. That is, I like it when pressing the "home" key first moves the cursor to the start of the indented text on that line, and then to the very beginning of the line on a second press.

I go out of my way to enable this behavior, where possible. For instance, I wrote a [gedit plugin](http://github.com/kemayo/gedit-smarthome/tree/master) to get it working properly in gedit, the Gnome text editor.

Unfortunately, TextMate is a harder nut to crack. I worked out the following as a TextMate command, and bound it to command-left:

{% highlight ruby %}
#!/usr/bin/ruby
current_line = ENV['TM_LINE_NUMBER']
current_column  = ENV['TM_LINE_INDEX'].to_i
whitespace_column = /^(\s*)/.match(ENV['TM_CURRENT_LINE'])[1].length + 1

column = if current_column == 0 or current_column > whitespace_column
           whitespace_column
         else
           0
         end

`open "txmt://open?line=#{current_line}&column=#{column}"`
{% endhighlight %}

It works, but is far too slow to be usable for me. There's a perceptible lag of probably around 100-200ms between hitting the shortcut and the cursor moving.

I think this is an unavoidable limitation of TextMate's approach to letting commands navigate within the file. It has to spawn a process to run the command, and the command then spawns a process to run the OSX command `open` which handles a `txmt://` protocol that TextMate has registered with the OS. There's some inherent inefficiency there.

(Writing a command with pure shell scripting doesn't help, incidentally. It's slightly faster, but still not enough to be worth it.)
