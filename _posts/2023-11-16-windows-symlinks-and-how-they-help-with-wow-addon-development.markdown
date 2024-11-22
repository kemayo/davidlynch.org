---
layout: post
title: "Windows symlinks and how they help with WoW addon development"
date: 2023-11-16 00:53:00 -0500
published: true
tags:
- version-control
- world-of-warcraft
---
The Battle.net client has a very irritating bug that only really affects people who're actively developing World of Warcraft addons on Windows: it can get stuck checking whether the game client needs to be updated, stopping you from launching the game. If you've ever seen it stick on "Updating" with its status message just saying "Initializing..." for minutes at a time, followed by it asking for you to approve admin permissions for the client so it can try again (regardless of whether it already has them), then you've been bitten by this bug.

I'm told it's because of some sort of interaction with the (hidden) .git folders (and the vast number of files contained within them) in addons that've been checked out for development. Fortunately, there's a way to keep your source-controlled addon development practices while also stopping the Battle.net client from getting stuck, and that is: [Windows symlinks](https://blogs.windows.com/windowsdeveloper/2016/12/02/symlinks-windows-10/).

What's a symlink? It's short for "symbolic link", and it's a way to tell your operating system that file or directory should pretend to be in multiple places at once. In practice, it's a useful tool to either organize files that other programs need to look at, or to avoid having to manually synchronize changes between files.

In the case of World of Warcraft, for whatever reason -- presumably some specifics of the exact choice of file-monitoring APIs Blizzard chose to use -- if you make your addon directories into symbolic links to another place that you've checked them out, it'll stop the Battle.net client from getting confused.

You may want to read a longer explanation of all the details about [symbolic links and what you might need to do to enable them](https://www.howtogeek.com/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/), but as a quick summary:

1. Create a new directory for your development checkouts of addons to live. I'll use `c:\src\wow\` for these examples.
1. Move all your existing checked out addons there. You can leave other addons that _aren't_ a git checkout where they've always lived. (I think it's handy for getting a quick overview of what's yours, honestly.)
1. Create the symbolic links, by opening a command prompt and typing something like this for each of your addons: `mklink /D "C:\World of Warcraft\_retail_\Interface\Addons\MyAddon" "C:\src\wow\MyAddon"`

### Automating that

Now, I found myself with a classic programmer problem of wanting to avoid a very tedious task: typing almost the same mklink command 41 times in a row. As such, I spent longer than the tedious option would have taken to write [a script that'll do it for me][link-script]. Fortunately, it'll also serve as documentation for me on what to do next time I need a new addon checked out. 🤩

Personally, I use [WSL to run Linux tools on my Windows machine](https://learn.microsoft.com/en-us/windows/wsl/install) for development purposes, and so I naturally went for a bash script. I could totally have kept it all inside pure Windows and written a batch script or similar, but that sounds quite awful and so I didn't.

A lot of the time writing this stemmed from the important complication: the WSL / Linux ln command will not create a Windows symbolic link. As such, I had to learn how to call out to cmd.exe and also to convert WSL file paths into Windows file paths. I'd never had to do this before, so it was time well spend.

The result is [this `link.sh` script][link-script]. When run from inside your development addons folder, it'll make a symbolic link in the main WoW addons folder to every addon you have checked out there. Feel free to use it if you want, just note that you may need to change the WoW install location that's hardcoded at the top of the script.

[link-script]: https://gist.github.com/kemayo/de9d4db00cea5bb59c86ab2cb0aea709