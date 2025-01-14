--- 
layout: post
title: Rails 2.0 Scaffolding
excerpt: ""
wordpress_id: 14
wordpress_url: http://davidlynch.org/blog/2008/01/rails-20-scaffolding/
disqus_threadid: 445428406
date: 2008-01-04 08:00:01 -06:00
tags: 
- programming
- ruby
- rails
---
I'm learning [Ruby on Rails](http://www.rubyonrails.org/) starting with 2.0. This is occasionally problematic, as it was only released a few days ago, and the tutorials are still all for 1.2.

So, to help others, something not mentioned in [the release notes](http://weblog.rubyonrails.org/2007/12/7/rails-2-0-it-s-done), which causes errors if you're following [the official tutorial](http://wiki.rubyonrails.org/rails/pages/TutorialScaffolding).

Scaffolding has changed.

The 1.2 way was to stick `scaffold :modelname` into a controller.

The 2.0 way is to run `./script/generate scaffold ModelName field1:type field2:type field3:type` on the command line.

The new way is more useful, I think, as it reduces the initial hurdle of moving from a scaffolded controller to a slightly custom one. It gives you controllers filled with code ready to be tweaked, and sets up a migration to create your model. You're left with a working site filled with examples of how to do things in rails, instead of a magical "scaffold :foo".

It's just that it's a wee bit undocumented.

An aside: I felt that I needed to post this because googling for "rails 2.0 scaffolding" didn't actually produce anything *helpful* on the first page or so. Lots of talk about [whether it's ideologically pure](http://stevengharms.net/?p=1065), but not so much on the "this is how to do it" front.

[Update: I get the impression, from seeing others talk about this, that it's not so much that scaffolding has changed as that one scaffolding option has been removed. It looks like the scaffold generator was there pre-2.0, and the only change is that `scaffold :Foo` is no longer available. Still breaks every "getting started with Rails" article I've ever seen, though. :P ]
