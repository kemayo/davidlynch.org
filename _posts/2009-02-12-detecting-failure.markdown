--- 
layout: post
title: Detecting failure
excerpt: ""
wordpress_id: 58
wordpress_url: https://davidlynch..org/blog/?p=58
date: 2009-02-12 01:11:01 -06:00
tags: 
- programming
- javascript
- cross-browser
---
I warn you in advance that this post does not end with a resolution of my problems.

For reasons relating to dynamic loading of javascript dependencies, I wanted to find a way to tell:

1. When a script tag finishes loading a file
2. Whether that file was successfully loaded

For various reasons, I didn't want to add cruft into the files being loaded -- no appending a function call to the end of every file, or anything.

Now, the finishes-loading case turns out to be pretty easy, albeit with some quirky cross-browser ramifications:

{% highlight js %}
var eax, load;
eax = document.createElement('script');
eax.setAttribute('type', 'text/javascript');
eax.setAttribute('src', src);
load = function(e) {
    // FF/Safari get the `load` handler, IE gets the `readystatechange` handler.
    // IE doesn't fire 'load' for JS (but does for CSS...)
    if(!eax.readyState || eax.readyState == 'complete' || eax.readyState == 'loaded') {
        // IE6 stalls at 'loaded' sometimes
        alert('loaded!');
        // remove these listeners for everyone, because it's
        // easier than testing everything to find out whether it's needed.
        removeEventListener(eax, 'readystatechange', arguments.callee);
        removeEventListener(eax, 'load', arguments.callee);
    }
};
addEventListener(eax, 'load', load); // FF/Safari get this
addEventListener(eax, 'readystatechange', load); // IE gets this
{% endhighlight %}

It's a horrible mish-mash of events, obviously, but it works. Insofar as it goes.

Working out whether the load was *successful* turns out to be the hard part.

In Firefox it's very easy. The `load` event doesn't fire if there are problems loading the JS file, and a `error` event fires instead. This is *lovely*.

In Safari the `load` event doesn't fire if there are problems, but there's no other sign given. So I could probably fake this with a `setTimeout` set to a reasonable length -- not perfect, but good enough for most cases.

In IE the `readystatechange` event fires away regardless. It's here that I'm stuck -- I can't see any way to tell, in the `readystatechange` handler whether the script tag was really loaded without problems.

Since IE represents an unfortunately large component of deviantART's users, half-working failure detection isn't going to cut it. Especially since all the developers mainly use Firefox/Safari, and wouldn't expect IE to behave differently.

So for now I'm going with verifying that the script tag loaded something, and says it's complete. I'll keep my eyes out for a way to work around IE...
