--- 
layout: post
title: Intrepidly lacking
excerpt: ""
wordpress_id: 46
wordpress_url: http://davidlynch.org/blog/?p=46
date: 2008-11-01 16:15:29 -05:00
tags: 
- personal
- programming
- ubuntu
---
I updated my desktop to the new Ubuntu release (Intrepid Ibix)

This is mostly good, but I discovered a problem as a side-effect of them improving their mouse support. Now that my mouse is auto-detected with all its buttons, the side-button no longer defaults to being a middle-click. I *like* having the side-button do middle clicks.

So, no problem, I thought. I'll just go rebind it. There is doubtless something in the mouse settings that lets me adjust this -- I mean, Windows generally handles this fine, so surely Ubuntu will be at least equivalent.

This turned out to not be true.

After a lot of searching, I found the community documentation for [the Logitech Marblemouse USB](https://help.ubuntu.com/community/Logitech_Marblemouse_USB), which (sort of) discusses how to remap buttons.

So I ran:
`$ xinput set-button-map "Logitech USB Gaming Mouse" 1 8 3 4 5 6 7 2 9`

This didn't remap it, per se. It swapped clicking the mouse wheel and clicking the side-button.

(I'm not certain that this will persist through a reboot. I might need to meddle with .Xmodmap.)

It's a weird place to be lacking what I consider basic functionality.
