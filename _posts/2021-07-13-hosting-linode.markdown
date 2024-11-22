---
layout: post
title: "Hosting: Linode"
date: 2021-07-13 11:15:00 -0500
published: true
tags:
- hosting
- linode
- migration
- webfaction
---
Last year, after almost a decade of using them as my host, [WebFaction][webfaction] started shutting down. They'd been sold to GoDaddy back in 2018 and had mysteriously stopped working on any feature-development about then, so it wasn't a huge surprise.

So, I bit the bullet, and switched to [Linode][linode].

This isn't entirely something I'd recommend to everyone who's used to using a service like WebFaction. WebFaction, despite being more fiddly than many hosts, still handled a lot of things for you. It ran servers and managed their configuration; you just told it that you wanted an app of type X to run, and it did.

[Linode][linode], by contrast, is a VPS host. That means you get a virtual server, and have to manage it yourself. So I'm spending $5/month for their shared 1GB plan, and it gets me a virtual machine (I picked Debian) that I have to ssh into and cope with.

Now, [Linode][linode] *does* offer [a lot of guides][linode-guides] to setting up servers, which I found very helpful. It's still a fiddly learning experience -- tuning the software to work on your VPS is a pain, and I wound up with Apache using slightly too many resources that led to a CPU spiral over a few days.

Still, if you're willing to put the work in, or just have more complex needs than "HTML is here", it's a good hosting option.

[webfaction]: https://www.webfaction.com
[linode]: https://www.linode.com/?r=f3d9aa2a781c2d2c412b3642b28d3c407a08117e (this is a referral link)
[linode-guides]: https://www.linode.com/docs/