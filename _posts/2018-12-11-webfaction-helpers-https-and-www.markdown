---
layout: post
title: "WebFaction helpers: HTTPS and www"
date: 2018-12-11 23:44:00 -0500
published: true
tags:
- hosting
- webfaction
---
I like [WebFaction][webfaction], and have been using them for years now, but I'm the first to admit they're a bit less... friendly... in some regards than many hosts.

I referenced a few of these unfriendly matters [back when I mentioned switching to them][switch], with an offhand "so I solved that". But I've decided to go into a little more detail now on one of these issues -- common site redirections. Specifically, adding / removing `www` from your URL, and enforcing HTTPS on a domain.

Other simple hosts I've used have just had a checkbox for these features in your settings. For WebFaction, however, you need to write your own mini-application to handle it. When I say "mini", I mean it -- all you need is the bare minimum of an app configured enough that it'll interpret an `.htaccess` file.

I'll assume from here that you're familiar with the general WebFaction terminology, and the distinction between "application", "domain", and "website".

### Remove www

Make a new application with type "Static" and subtype "Static/CGI/PHP-7.2".

Name the application `redirect_www`.

SSH in, and in the application directory create a file called `.htaccess` with the contents:

```
RewriteEngine on

RewriteCond %{HTTPS} =on
RewriteRule ^(.*)$ - [env=proto:https]
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ - [env=proto:http]

RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ %{ENV:proto}://%1%{REQUEST_URI} [R=301,QSA,NC,L]
```

This is more complicated than it strictly has to be, because it checks and remembers whether the site is on HTTP/S without you needing to explicitly configure it or make multiple versions of the application. I wanted something generic, because I have a bunch of different websites hosted.

An "add www" application is a fairly simple modification to this.

Assign it to a new website, with the domain `www.whatever-your-domain-is.com`.

### Enforce HTTPS

Make a new application with type "Static" and subtype "Static/CGI/PHP-7.2".

Name the application `redirect_https`.

SSH in, and in the application directory create a file called `.htaccess` with the contents:

```
RewriteEngine On

RewriteRule ^\.well-known/ - [NC,L]

RewriteCond %{HTTPS} !on [NC]
RewriteCond %{HTTP:X-Forwarded-SSL} !on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

This will redirect so long as HTTPS isn't already enabled, ignoring the `.well-known` subdirectory which is required to not be redirected for things like letsencrypt certificate renewal.

Assign this application to a non-secure website with the same domain as a secure website you're hosting.

[webfaction]: https://www.webfaction.com/?aid=41101 "totally an affiliate link"
[switch]: {% post_url 2013-04-05-hosting-switch %}