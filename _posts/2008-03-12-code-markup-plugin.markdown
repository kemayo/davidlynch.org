--- 
layout: post
title: Code Markup plugin
excerpt: ""
wordpress_id: 25
wordpress_url: http://davidlynch.org/blog/2008/03/code-markup-plugin/
date: 2008-03-12 10:20:58 -05:00
tags: 
- programming
- wordpress
- plugin
---
As one naturally does, I noticed that my blog wasn't validating.  It turned out that I'd forgotten to escape the <code><<</code> in the <a href="http://davidlynch.org/blog/2008/01/how-to-generate-pdfs-from-xml-using-apache-fop-in-ruby-on-rails/">Ruby on Rails PDFs example</a>.

So I installed <a href="http://www.thunderguy.com/semicolon/wordpress/code-markup-wordpress-plugin/">Code Markup</a>, a plugin that does all that escaping for me when it notices a <code><code></code> block.

It seems to Just Work, and lets me skip having to write <code>&lt;</code> all the damn time.
