---
layout: post
title: "Maphilight for jQuery 1.9.0"
date: 2013-01-21 15:49:37 -0600
tags:
- programming
- javascript
- jquery
- canvas
- maphilight
---
jQuery 1.9 was [released][jq19release] recently, and removed [some things][jq19upgrade] that have long been labeled as deprecated. This broke maphilight slightly, since it was still doing a few checks on `$.browser`.

I've just fixed that. As always, [the latest version is available on github][maphub].

[jq19release]: http://blog.jquery.com/2013/01/15/jquery-1-9-final-jquery-2-0-beta-migrate-final-released/
[jq19upgrade]: http://jquery.com/upgrade-guide/1.9/
[maphub]: https://github.com/kemayo/maphilight