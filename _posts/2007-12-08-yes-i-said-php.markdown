--- 
layout: post
title: Yes, I said PHP
excerpt: ""
wordpress_id: 6
wordpress_url: http://davidlynch.org/blog/2007/12/yes-i-said-php/
date: 2007-12-08 20:48:06 -06:00
tags: 
- programming
---
I mentioned that I got my start programming with PHP. Depending on the crowd you're in, this can be a bit of an unsavory thing to admit to. Especially if you're in the hip crowd, with their Django on Ruby or whatever.

Why's that?

Well, PHP sucks. In numerous ways. Some of them are a matter of taste, but others are not.

1. It has no namespaces.

   PHP is a very big language now. It has many modules. Its standard library contains many thousands of functions, all of which live in one big shared namespace. This is more an elegance issue than anything else, but it's the sort of thing that really bugs a lot of people.

   Without namespacing it's necessary to make function names more complicated to reflect what they're intended for. So `stripos` has to convey that (a) it's intended for use on strings, and (b) what it does to them. This wouldn't have been so bad if the various module authors had stuck to a consistent naming scheme. Which leads me to...

2. It has no consistent function naming scheme.

   Let's take three functions: `strip_tags`, `stripslashes`, and `stripos`. `strip_tags` has an _, and `stripslashes` doesn't. `stripos` doesn't strip anything, it's actually "find <i>pos</i>ition of first occurrence of a case-<i>i</i>nsensitive <i>str</i>ing". You can imagine how this starts to be irritating after a while.

3. It's easy to write insecure code.

   Register globals" used to be the bugbear here. It automatically sticks the contents of every global variable into the global scope. Which means that if you go to `http://example.com/insecure.php?foo=haxxor` then there'd be a variable called `$foo` containing `"haxxor"`.

   But register globals is off by default now. Although most hosting companies will re-enable it for compatibility with crap apps. So.

   The database functions available are rather low-featured, and the "obvious" approach to putting together queries is just to stick user input into a string. It takes extra effort to (a) realize that you need to check input, and (b) actually check it. Thus newbies are unlikely to be protected.

   I'm not saying that it's impossible to write secure code. However, insecurity is rather the default. Sites written in PHP are predisposed towards SQL injection attacks, and various manipulations.

There are a lot more reasons that people complain about PHP. Google will tell you of them. Suffice it to say that the problems I listed are the ones that matter to me.

Despite these complaints, PHP has its good points.

Notably, it's very easy to get into. You can stick some special tags into an HTML document, and *wham!* you've written a dynamic website. You don't have to think about models, views, controllers, or whatever.

PHP is great for the beginner, so long as you understand its flaws.
