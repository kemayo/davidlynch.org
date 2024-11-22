---
layout: post
title: "World of Warcraft addon packaging but with GitHub Actions this time"
date: 2020-09-19 16:22:00 -0500
published: true
tags:
- continuous integration
- game
- github
- github-actions
- version-control
- world-of-warcraft
- wow
---
I wrote about addon-packaging [a year ago][last-post], mostly in the context of wanting to package addons for Classic. Since then, the environment has shifted a bit due to [Overwolf buying Curse][curse-bought], and also [GitHub Actions][github-actions] being released.

There's no particular reason to think Overwolf will be any worse a steward of Curse and its addon-tooling than Twitch was, but controlling one's own packaging and thus being able to easily shift to other platforms if needed appeals.

If you're sticking your addon on GitHub anyway, it seems to make some sense to use GitHub Actions rather than (lightly) abusing Travis' continuous-integration features for something which is only continuous-integration if you squint at it.

### Basic setup

You need to have an addon which is configured for the BigWigs packager to know what it's doing. The [previous post][last-post] walks you through that -- just don't do the "Travis" part.

### Making actions

Much like Travis was controlled by a `.travis.yml` file, Actions are defined in your repo in a `.github/workflows/` directory. GitHub will walk you through making one on the website, or you can just make the file and commit it.

Create `.github/workflows/package.yml`:

```
name: Package Addon

on:
  push:
    branches: [ main ]
    tags: [ '*' ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Create Package
        uses: BigWigsMods/packager@master
        env:
           CF_API_KEY: ${{ secrets.CF_API_KEY }}
           WOWI_API_TOKEN: ${{ secrets.WOWI_API_TOKEN }}
           GITHUB_OAUTH: ${{ secrets.GITHUB_TOKEN }}
```

You'll need to configure those secrets, which you can do through the "settings" page of your repo. The [previous post][last-post] walks you through generating the relevant API keys. You can skip the GitHub one, as Actions magically gives you a token for that.

And... that's it. Every time you push a commit or tag to this repo, the BigWigs packager will run and upload the addon to the sites you've configured API and TOC keys for.

EDIT 2021-07-13: the bigwigs packager has an official action now, so I replaced the use of `curl` to fetch the script.

[last-post]: {% post_url 2019-09-08-world-of-warcraft-classic-addon-packaging %}
[curse-bought]: https://blizzardwatch.com/2020/06/23/overwolf-buys-curseforge-addons/
[github-actions]: https://github.com/features/actions