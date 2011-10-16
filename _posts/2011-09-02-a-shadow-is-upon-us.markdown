--- 
layout: post
title: A shadow is upon us
excerpt: ""
wordpress_id: 137
wordpress_url: http://davidlynch.org/blog/?p=137
date: 2011-09-02 19:16:52 -05:00
tags: 
- programming
- javascript
- jquery
- canvas
- maphilight
- shadows
- github
---
Other people contributing to my projects is often the cause of my improving them. This is because people tend to contribute something that works for the case they care about, without necessarily testing how it combines with the rest of the product. There's nothing wrong with this. They did some work and wanted to give it back; that's how open source should work.

A case in point here is how shadows just got added to [maphilight](https://github.com/kemayo/maphilight). A [pull request](https://github.com/kemayo/maphilight/pull/10) was submitted for a commit that added shadow support for rectangles in canvas only. I accepted the request because, hey, that's a nice improvement, and it seemed to work. But I wasn't really happy with rectangles-only.

So, I started fiddling with it. I had, for whatever reason, never touched shadows in canvas before. In fact, it's been quite a while since I did the research into canvas that was involved in writing maphilight in the first place.

Looking at [the commit](https://github.com/Raven24/maphilight/commit/ee12efe020e1dcb6c3a6a9cc337ac9c59c6cca08) I see that the shadows have been implemented with a combination of clipping regions and redrawing the shape with some shadow options on the path.

{% highlight javascript %}
// [Regular shape drawing happens here]

// Clip regions
context.beginPath();
context.rect(0, 0, canvas.width, canvas.height);
context.rect(200, 200, 100, 100);
context.closePath();
context.clip();

// Shadow drawing
context.beginPath();
context.rect(200, 200, 100, 100);
context.closePath();
context.shadowColor = "rgba(0,0,0,1)";
context.fill();
context.stroke();
{% endhighlight %}

Now, I'm confused by the clipping being done, since I've never seen it work quite like that before. It's drawing a rectangle around the whole canvas, then another around the rectangle we're shadowing, and telling it to clip. So I do a bit of testing, and I find that this isn't doing what I think the submitter meant it to.

I think they wanted it to set up a clip region only outside the shape, so that the shadows they drew wouldn't appear inside it. However, in practice it seems that it's just adding the two rectangles together and leaving us with a clip region the size of the whole canvas. It's possible that this *did* work in another browser, but not in Chrome where I was testing...

Since subtractive clipping obviously wasn't the answer, I looked into `globalCompositeOperation` to clean up after the fill. It turned out that `destination-out` was the operation I needed to empty my shape. Also, because the shadow-drawing had been added after the regular shape, I had to move it to be before that, otherwise the shadow was being drawn on top of the stroke and cleaning it up would wipe out the fill.

{% highlight javascript %}
// So we now have...

// Shadow drawing
context.beginPath();
context.rect(200, 200, 100, 100);
context.closePath();
context.shadowColor = "rgba(0,0,0,1)";
context.fill();
context.stroke();

context.save();
context.globalCompositeOperation = "destination-out";
context.beginPath();
context.rect(200, 200, 100, 100);
context.closePath();
context.fillStyle = "rgba(0,0,0,1);";
context.fill();
context.restore();

// [Regular shape drawing happens here]
{% endhighlight %}

Okay! Now we have outline shadows.

But, another issue with this method: it'd fill and stroke on the shape, regardless of the settings you were using. If you had no fill / stroke it'd use the default (flat black) settings, which are ugly. Also, it harmed your opacity settings -- the stroke and fill were being done twice. So when I added a shadow to a strokeless mostly-transparent rectangle I noticed that it gained a thin black outline, and was darker than it should have been.

I messed around a little bit with trying to erase the fill or stroke, but eventually decided that this was more hassle than it was worth. What wound up being the simplest option was drawing the shape massively off the edge of the canvas, and using shadow offsets to cast the shadow into the right spot.

{% highlight javascript %}
// Just the shadow part this time
context.beginPath();
context.rect(200 + 9001, 200 + 9001, 100, 100);
context.closePath();
context.shadowOffsetX = -9001;
context.shadowOffsetY = -9001;
context.shadowColor = "rgba(0,0,0,1)";
context.fill();
context.stroke();
{% endhighlight %}

Now we had a shadow that didn't involve drawing anything stroking or filling onto the canvas near our existing shape. At this point I had [completely rewritten the code I'd merged in](https://github.com/kemayo/maphilight/commit/eeeff8ade3262e49585a36ba63b5159e5fb9eaa6). About the only thing remaining was the option names Raven24 had chosen.

I went ahead and added some options for whether the shadow was cast inside or outside the shape, since I could see reasons for both, and added some overrides for whether it'd be casting from the fill or the stroke, since the varying possible configurations made it difficult to reliably guess which would look better.

I still didn't add it to non-canvas. Largely because now that IE has finally given in and implemented canvas I view that as being a dead branch. Needs to keep working, and any major changes have to be ported over... but minor display differences are somewhat acceptable. Also, I don't have access to IE right now, since I'm away from home. If I ever have reason to look into shadows in VML I'm sure I'll add it in then, for the heck of it.

You can [see all this in action on the demo page](http://davidlynch.org/js/maphilight/docs/demo_features.html) if you're interested.

And that's how community involvement improves things. :D
