---
layout: post
title: "Why didn't I respond to your pull request?"
date: 2017-01-12 18:34:00 -0500
published: true
tags:
- continuous integration
- github
- testing
---
I have some fairly popular open source packages up on GitHub. Happily, I get people submitting pull requests, adding features or fixing bugs. It's great when this happens, because people are doing work that I don't want to do / haven't gotten to yet / didn't think of.

...but I'm pretty bad at responding to these. They tend to languish for a while before I get to them. There's a decent number which I've never even replied to.

Why is this?
------------

Fundamentally, it's because reviewing a pull request is potentially a lot of work... and the amount of work isn't necessarily obvious up-front. This means I only tend to do reviews for anything which isn't obviously trivial when I'm feeling energetic and like I have a decent amount of free time.

First, there's some common potential problems which might turn up:

1.  It does something I don't want to include in the project. This is the only outright deal-breaker. Project owner's prerogative.
2.  It doesn't work. This happens more often than you'd think, generally because the submitter has written code for the exact use-case they had, and hasn't considered what will happen if someone tries to use it in a different way.
    
3.  It works, but not in the way I want it to. For instance, it might behave inconsistently with existing features, and I'd want it adjusted to match.
    
4.  It should be written differently. This tends to include feedback like "you should use this module" / "this code should really go over here" / "this duplicates code".
    
5.  It has coding style violations. Things like indentation, variable names, or trailing whitespace. These aren't functional problems, but I still don't want to merge them, because I'd just have to make another commit to fix them myself.
    

Once I've read the patch and given this feedback, which might itself take a while since design feedback and proper testing that exercises all code paths isn't necessarily quick, I'll respond asking for changes. Then there's an unknown wait period while the submitted finds time to respond to those changes. Best-case for me, they agree with everything I said, make all requested changes perfectly, and update their pull request with them! Alas, people don't always think I'm a font of genius, so there's an unknowable amount of back-and-forth needed to find a compromise position we both agree on. This _generally_ involves enough time between responses that the specifics of the patch aren't in my head any more, so I have to repeat the review process each time.

What can I do better?
---------------------

One obvious fix: delegate more. Accept more people onto projects and give them commit access, so I don't have to be the bottleneck. I'm bad at doing this, because my projects tend to start as "scratch my itch" tasks, and I worry about them drifting away from code I'm personally happy with. Plus, I feel that if the problem is "I don't review patches promptly", "make someone else do it instead" is perhaps disingenuous as a response. :D

So, low-hanging fruit...

Coding style violations, despite being trivial, are probably the most common sources of a patch sitting unmerged as I wait for someone to respond to a request to fix them. This is kind of my fault, because I have a bad habit of not _documenting_ the coding style I expect to be used in my projects, relying on people writing consistent code by osmosis. Demonstrably, this doesn't _work_.

As such, I'm starting to add continuous integration solutions like [Travis](https://travis-ci.org/) to [my projects](https://travis-ci.org/kemayo/). Without any particular work on my part, this lets me automatically warn contributors about coding style concerns which can be linted for, via tools like [flake8](http://flake8.pycqa.org/en/latest/) or [editorconfig](http://editorconfig.org/). If their editing environment is set up for it, they'll get feedback as they write their patch... and if not, they'll be told on GitHub when a pull request fails the tests, and don't have to wait for me to get back to them about it.

[![Build Status](https://travis-ci.org/kemayo/sublime-text-git.svg?branch=master)](https://travis-ci.org/kemayo/sublime-text-git)

The "it doesn't work" issue can be worked into this framework as well, with a greater commitment to writing tests on my part. If my project is already well-covered, I can have the CI build check test coverage, and thus require that contributors are providing tests that cover at least most of what they're submitting, and don't break existing functionality.

This should reduce me to having to _personally_ respond to a smaller set of "how should this be written?" issues, which I think will help.