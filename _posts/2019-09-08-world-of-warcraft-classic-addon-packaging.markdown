---
layout: post
title: "World of Warcraft Classic addon packaging"
date: 2019-09-08 11:46:00 -0500
published: true
tags:
- continuous integration
- game
- github
- version-control
- world-of-warcraft
- wow
---
UPDATE: there's a sequel to this post, which tells you [how to do this with GitHub Actions instead][next-post].

If you're writing an addon which needs to work in just the retail version of WoW, or just in Classic, this post doesn't really apply to you. But if you want to maintain versions of your addon that work in both environments, you may want some tooling around that. Or you might just want to handle your own packaging, in which case this will also help.

### The Environment

World of Warcraft addon development has been heavily shaped by [WowAce](https://www.wowace.com)/[CurseForge](https://www.curseforge.com/wow/addons), which popularized a continuous-integration style of development. You start a project, it gives you a code repository, and it automatically packages up the contents of that repository for distribution. It also lets you tag releases, to give addon users stable points to work with.

Curseforge supports having retail and Classic versions of an addon living in the same project, but _doesn't_ support any way of packaging that up automatically. It'll package up the current state of the `master` branch of your repository, and flag it as classic/retail depending on the TOC metadata. This makes keeping a dual release impractical.

### Why not just keep entirely separate projects?

It's so much more wooooooork.

But seriously, Classic is based on a fairly recent version of the WoW client, and is nearly completely API-compatible with the retail version. This means that most addons are going to need fairly minor tweaks to work in both. A long-lived `classic` branch with the necessary tweaks and cherry-picked future feature updates is very practical here.

### Run your own packager

The BigWigs addon, for various historical reasons, have written [their own version](https://github.com/BigWigsMods/packager) of the WowAce addon-packager script. It supports everything we want to do, unlike the standard WowAce packager.

You need to add some metadata to your addon's TOC file so the packager script knows where to upload it. Find your project ID in the sidebar of your project page, and add a line like this:

```
## X-Curse-Project-ID: [your-project-id]
```

Technically, you can stop at this point, download the packager, and manually run the entire process from the command line. But again, that's a lot of work, and I'd rather keep the continuous deployment workflow. If you'd rather go do that, instructions are [here](https://github.com/BigWigsMods/packager#using-releasesh).

For the rest of this I'm going to aim for continuous deployment via keeping your addon in a GitHub repository, and running the packager through Travis-CI.

### GitHub

Make a repository for your addon on GitHub. [Import](https://help.github.com/en/articles/importing-a-git-repository-using-the-command-line) the existing code to there by going to your current checkout of the code and doing:

```
$ git remote set-url origin [your-github-url]
$ git push --mirror origin
```

Now go to your addon's source settings on WowAce/CurseForge and switch it to point to your new github repo. This will disable all the normal automatic-packaging behavior, so our next step will get that back.

### Travis

Add a new file to the top level of your repository: `.travis.yml`

```
language: minimal

script:
  - curl -s https://raw.githubusercontent.com/BigWigsMods/packager/master/release.sh | bash

notifications:
  email:
    on_success: never
    on_failure: always
```

You can expand this if you want to perform further checks. I [run luacheck on everything](https://github.com/kemayo/wow-silverdragon/blob/master/.travis.yml) to make sure there's no likely errors, for instance.

Get a [Travis CI](https://travis-ci.org/) account. You can sign in with your GitHub account, and it'll have access to your repositories.

![Repositories list]({{ "/blog/images/2019/09/repo-list.png" | relative_url }})

Enable your addon's repository, and then go into its settings. Disable "Build pushed pull requests".

Go to the [CurseForge API tokens page](https://www.curseforge.com/account/api-tokens) and generate an API token.

In the "Environment Variables" section of the Travis settings, add one called `CF_API_KEY` with the value you just generated.

You're now back to having continuous integration. Every time you push a commit to your github repo, the packager will run and upload an alpha build to your project. Release builds will be triggered by tags, just like they were when you were on CurseForge.

### But what about Classic?

Depending on your addon, the amount of changes you need to make will vary. If you can make a version that works simultaneously in retail and classic, or only needs minor tweaks...

#### Single branch

All you'll need to do is adjust your TOC file a bit:

```
#@retail@
## Interface: 80200
#@end-retail@
#@non-retail@
# ## Interface: 11302
#@end-non-retail@
```

...and adjust your `.travis.yml` so that the `script` section is:

```
script:
  - curl -s https://raw.githubusercontent.com/BigWigsMods/packager/master/release.sh | bash
  - curl -s https://raw.githubusercontent.com/BigWigsMods/packager/master/release.sh | bash -s -- -g 1.13.2
```

Now every time you push, a retail and classic build will be triggered. The TOC will be adjusted for each build so the correct `Interface` version is listed.

#### Multiple branch

You may need more extensive changes, or just prefer to avoid assorted feature-detection conditionals in your addon. If so, a long-lived `classic` branch is an option.

Make the branch:

```
$ git checkout -b classic
```

...and adjust your `.travis.yml` so that the `script` section is:

```
script:
  - curl -s https://raw.githubusercontent.com/BigWigsMods/packager/master/release.sh | bash -s -- -g 1.13.2
```

Now update your addon for classic, and whenever you push this branch, a new release will be uploaded for classic only.

For common changes, remember that you can cherry-pick patches between branches like so:

```
$ git commit -m "Important cleanup of stuff for retail"
[master cec3e72] Important cleanup of stuff for retail
$ git checkout classic
$ git cherry-pick cec3e72
```

...though you might need to resolve some conflicts.

### I want WoWInterface too!

The BigWigs packager will upload to WoWI as well. Unfortunately, WoWI doesn't let you have versions for retail/classic in the same addon, so you'll need to start a new addon for your classic branch. Once you have that, update each branch's TOC with:

```
## X-WoWI-ID: [wowi-addon-id]
```

You can find the addon ID in the URL of your addon.

If you're using the single-branch setup above, you'll need to override the ID for one of them. You can do that in `.travis.yml` by finding the retail/classic script call and adding `-w [wowi-addon-id]` to it.

Now go to the [WoWInterface API token page](https://www.wowinterface.com/downloads/filecpl.php?action=apitokens) and generate a token. Add it to your Travis-CI environment variables as `WOWI_API_TOKEN`.

WoWInterface only supports release versions of addons, so it'll only upload there whenever you push a tag.

UPDATE: there's a sequel to this post, which tells you [how to do this with GitHub Actions instead][next-post].

[next-post]: {% post_url 2020-09-19-world-of-warcraft-addon-packaging-but-with-github-actions-this-time %}