---
layout: post
title: "Vulnerable"
date: 2011-12-09 00:15:41 -0600
published: true
tags:
- security
- dreamhost
- wordpress
- timthumb
---
One of my sites got hacked. How?

1. My wife tried out a number of WordPress themes while setting up her blog a year or two ago.
2. One of them contained something called timthumb.php, which [just this August was found to have a great big security vulnerability][timthumb].
3. Someone exploited this vulnerability, probably by [scanning for every possible theme that contained it][scan] and put a cracker console in the cache directory of that theme.
4. They used this console to find and edit every .htaccess on that user account to include a some malicious code. (This was several sites, because I was lazy.)
5. It redirected to a quite nasty URL whenever a referrer from a longish list of search engines was seen.

So that's not terribly nice. I take some small comfort in knowing that [at least I have a lot of company][extent]. Also, I feel validated in [moving off WordPress][jekyll].

The cracker console was actually quite interesting. If you're curious, you can [see it on this gist, slightly expanded for readability][console-gist] (or [just a screenshot][console-screen]).

It was obfuscated by being a big string that ran through `preg_replace` using the `e` flag, which executes the result. Yes, this is a genuinely _insane_ feature. That turned some unicode-escaped characters at the beginning into `eval(gzinflate(base64_decode('`, which revealed the rest of the huge string to be a base64 encoded gzipped blob of source code.

The lesson I'm taking from this is: security is hard to enforce when themes that non-technical people are expected to use can contain executable code. Or even technical people... I wouldn't have caught that if I'd been looking for a WordPress theme.

[timthumb]: http://blog.sucuri.net/2011/08/timthumb-php-security-vulnerability-just-the-tip-of-the-iceberg.html
[scan]: http://www.planetmike.com/2011/09/09/timthumb-php-vulnerability-scans/
[extent]: http://blog.sucuri.net/2011/10/timthumb-php-mass-infection-aftermath-part-i.html
[jekyll]: {% post_url 2011-10-18-jekyll %}
[console-gist]: https://gist.github.com/1450516
[console-screen]: http://fc03.deviantart.net/fs71/f/2011/342/8/a/haxxor_by_kemayo-d4iki5x.png