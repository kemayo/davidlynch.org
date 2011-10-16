--- 
layout: post
title: Topsy turvy
excerpt: ""
wordpress_id: 28
wordpress_url: http://davidlynch.org/blog/?p=28
date: 2008-03-20 20:57:30 -05:00
tags: 
- programming
- javascript
- jquery
- ie
- standards
---
A bug report for <a href="http://plugins.jquery.com/project/maphilight">maphilight</a> lead to me becoming aware of a fascinating quirk in IE.  A quirk in which IE holds to published standards with fanatical zeal, contrary to everything one might have come to expect, and far in excess of Firefox/Opera/Safari.

When you use the <code>.innerHTML</code> property to add an element to the DOM, IE will fire an "unknown runtime error" if that element is incorrectly nested.  So trying to place a <code><div></code> inside a <code><p></code> (as was the case in the bug report) will error very unhelpfully.

Surprising behavior.

Anyway, this led to the release of <a href="http://plugins.jquery.com/files/maphilight-1.1.1.tar.gz">maphilight 1.1.1</a>.  (Which also includes an official minified version of the file, for convenience's sake.)
