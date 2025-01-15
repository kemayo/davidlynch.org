--- 
layout: post
title: Niche WoW news
excerpt: ""
wordpress_id: 13
wordpress_url: https://davidlynch..org/blog/2008/01/niche-wow-news/
date: 2008-01-03 09:14:12 -06:00
tags: 
- programming
- world-of-warcraft
---
<blockquote cite="http://www.wowinterface.com/forums/showthread.php?threadid=13953">* NEW - freeSlots, bagType = GetContainerNumFreeSlots(bagIndex) -- Returns the number of free slots in a bag, and the type of items that can go in the bag. For bagType, 0 means any item can go in the bag.
* NEW - bagType = GetItemFamily(itemID | "name" | "itemLink") -- When used with a container, this returns the type of container. When used with an item, it returns the type of container the item can go in. However, bagType is a bitflag, so GetItemFamily for something that could go in a quiver (bagType 1) and an ammo pouch (bagType 2) would return 3. A bag that can hold both arrows and bullets would also return 3.</blockquote>

This does mark the first time I've asked for API functionality and had it implemented. :D
