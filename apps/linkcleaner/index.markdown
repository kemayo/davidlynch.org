---
layout: default
title: "LinkCleaner"
subtitle: "cleans links"
---
![Logo](LinkCleaner-256.png)
![menu screenshot](screenshot-menu.png)

LinkCleaner soothes my deep and often-unsatisfied need for cleanliness and a lack of unnecessary junk, particularly in things I want to share with others.

It’s a macOS menubar app. It sits there and watches as you copy things, then springs into action when you copy a URL.

It takes a URL like this: `https://www.example.com/page?utm_content=buffercf3b2&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer`

...and leaves you with just this: `https://www.example.com/page`

It strips out the common tracker cruft like utm_ parameters, but it also knows some special details about a few popular sites and will apply custom rules to them.

# Frequently Asked Questions
## What if I want to copy the tracker-laden URL?

LinkCleaner will let it through if you copy the same URL twice in a row.

Alternately: open the menu, uncheck "Run automatically", and then copy the URL.

## Which sites have special handling?

* Amazon
* Twitter

# Privacy policy
LinkCleaner collects and transmits no personal data at all.

LinkCleaner does watch your clipboard, but pays attention solely to URLs, and keeps no record of them.
