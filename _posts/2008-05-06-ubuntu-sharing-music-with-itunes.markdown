--- 
layout: post
title: "Ubuntu: sharing music with iTunes"
excerpt: ""
wordpress_id: 38
wordpress_url: http://davidlynch.org/blog/?p=38
date: 2008-05-06 23:05:32 -05:00
tags: 
- personal
- ubuntu
- linux
- mp3
- music
- itunes
---
1. <code>sudo aptitude install mt-daapd</code>
2. Edit <code>/etc/mt-daapd.conf</code> so that <code>mp3_dir = [your music directory]</code>.  (Also any other configuration changes you might want to make; the file is well-commented.)
3. <code>sudo /etc/init.d/mt-daapd restart</code>

Really this would work on any Debian-derived distro... but I've only <em>tried</em> it on Ubuntu.

<ins>Update: It looks like mt-daapd puts an admin interface on http://localhost:3689/ (with the default password being 'mt-daapd'), which you can use to configure things like the location of your music.  So you might not even need to do any config file editing...</ins>
