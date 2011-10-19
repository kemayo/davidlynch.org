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
1. `sudo aptitude install mt-daapd`
2. Edit `/etc/mt-daapd.conf` so that `mp3_dir = [your music directory]`. (Also any other configuration changes you might want to make; the file is well-commented.)
3. `sudo /etc/init.d/mt-daapd restart`

Really this would work on any Debian-derived distro... but I've only *tried* it on Ubuntu.

<ins>Update: It looks like mt-daapd puts an admin interface on http://localhost:3689/ (with the default password being 'mt-daapd'), which you can use to configure things like the location of your music. So you might not even need to do any config file editing...</ins>
