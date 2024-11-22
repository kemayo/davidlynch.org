---
layout: post
title: "Wordpress Again"
date: 2015-12-29 21:33:00 -0500
published: true
tags:
- jekyll
- migration
- wordpress
---
I haven't been updating this site very often. Upon reflection, I decided that this is in part because the Jekyll workflow that I [switched to][jekyll-switch] was... inconvenient.

It would be possible to hack around this. I could have written some sort of simple web-app which generated a new post, committed it to git, pushed it to github, built the site, and sync'd it onto my hosting. That'd keep the ridiculous performance / security benefits of a static site, while still letting me make quick updates from wherever I happen to be. It'd even be fairly easy, at least to get something basic working.

But. I don't really want to do that. The point of using a system like Jekyll or (before it) Wordpress is to offload that particular bit of work onto someone else, who can pay attention to all of those details for me.

So, here I am on Wordpress again. Hopefully, after a bit more than four years, I won't find myself [getting hacked][hacked] again. :-P

Why Wordpress again? Well...

It's really popular. This does count for something. Automattic likes to point out that it around a quarter of the public web runs on it. This means there's a lot of resources available.

To keep some of what I liked from Jekyll, I'm using Automattic's Jetpack plugin. This gets me a lot of the fancy features from Wordpress.com, including letting me keep using Markdown to write these posts. I'm also using the WP-Super-Cache plugin, because it seems that even now running uncached Wordpress is just asking for trouble.

I'll write another post soon about how to migrate from Jekyll to Wordpress. There were a few bumps along the way.

[jekyll-switch]: {% post_url 2013-04-05-hosting-switch %}
[hacked]: {% post_url 2011-12-09-vulnerable %}