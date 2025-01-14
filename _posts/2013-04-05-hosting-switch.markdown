---
layout: post
title: "Hosting Switch"
date: 2013-04-05 00:05:15 -0500
disqus_threadid: 1188408139
tags:
- hosting
- webfaction
- dreamhost
---
Recently I switched my personal hosting from [Dreamhost][dreamhost] to [WebFaction][webfaction]. I'd been butting up against the resource limits on Dreamhost's cheap plan for ages, and an annoying multi-day outage was the last straw.

The outage was actually pretty interesting, in its way. I discovered that all sites served from a particular user account were having their host processes instantly killed. Okay, I assumed that I was being hit by some crazy-aggressive spider, and I'd have to go throttle something. Then I tried to `ssh` in, and discovered that my login shell got insta-killed. Problem.

Eventually, via their web panel, I migrated all the sites on that user account to a different user account, and thus discovered that there was no unusual load at all. The process killer had just gone mad, and was killing any process owned by that user, without any reason. Dreamhost did eventually restore access to that account, but it took something like three days.

In that time I did a bit of research about alternatives! [WebFaction][webfaction] came highly recommended from some of my coworkers and had a 60 day money back guarantee, so I felt they were worth a shot. They've turned out to work very well.

What I get out of this is:

* Less resource constraints. For one thing... CPU and memory consumed by the server-wide Apache/MySQL/Postgres instances don't count against your plan limits.
* Less heavily-loaded servers. [This article](http://gustavonarea.net/blog/posts/server-load-dreamhost-vs-webfaction/ "Despite being five years old...") is accurate, from my own tests.
* Focus on long-running apps. Dreamhost was very much a PHP host. You _could_ run other stuff on it, but it clearly wasn't what they intended.
* Memcache installed on all servers. Thank `$deity`.

I've lost:

* A bit of hand-holding. Dreamhost was pretty good at doing things for you with a checkbox, like redirecting `www` to the subdomainless domain if you wanted. With webfaction I had to write my own little www-remover app for it. (Which was simple, but still.)
* Sites hosted under multiple user accounts. I always liked that as an extra little burst of security.
* (Related to that last point...) a collection of cracker backdoor scripts that had been installed via some compromised WordPress themes and eventually been neutered by me.

All in all, I think I'd still recommend Dreamhost to relatively non-technical people. If all you want is to host a generic PHP package, WebFaction is going to be confusing.

One final note: it having been a long time since I last switched hosting plans (I'd been on Dreamhost since 2005), I was slightly amused to notice that it took me longer to bzip up a multi-gig database dump than it probably would have to just scp the uncompressed file across.

[dreamhost]: http://dreamhost.com/
[webfaction]: http://www.webfaction.com?affiliate=kemayo "I get a referral bonus if you click this"