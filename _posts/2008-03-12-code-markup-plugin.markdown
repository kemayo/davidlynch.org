--- 
layout: post
title: Code Markup plugin
excerpt: ""
wordpress_id: 25
wordpress_url: https://davidlynch..org/blog/2008/03/code-markup-plugin/
date: 2008-03-12 10:20:58 -05:00
tags: 
- programming
- wordpress
- plugin
---
As one naturally does, I noticed that my blog wasn't validating. It turned out that I'd forgotten to escape the `<<` in the [Ruby on Rails PDFs example]({% post_url 2008-01-09-how-to-generate-pdfs-from-xml-using-apache-fop-in-ruby-on-rails %}).

So I installed [Code Markup](http://www.thunderguy.com/semicolon/wordpress/code-markup-wordpress-plugin/), a plugin that does all that escaping for me when it notices a `<code>` block.

It seems to Just Work, and lets me skip having to write `&amp;lt;` all the damn time.
