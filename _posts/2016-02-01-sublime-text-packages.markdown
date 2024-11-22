---
layout: post
title: "Sublime Text packages: working in 2 and 3"
date: 2016-02-01 10:28:00 -0500
published: true
tags:
- plugin
- python
- sublime-text
---
I maintain the [Git package for Sublime Text](https://github.com/kemayo/sublime-text-git). It's [popular](https://packagecontrol.io/packages/Git), which is kind of fun and also occasionally stressful. I recently did a major refactor of it, and want to share a few tips.

I needed to refactor it because, back when the Sublime Text 3 beta came out, I had made a branch of the git package to work with ST3, and was thus essentially maintaining two versions of the package, one for each major Sublime version. This was problematic, because all new features needed to be implemented twice, and wound up hurting my motivation to work on things.

Why did I feel the need to branch the package? Well...

### The Problem

Sublime Text is currently suffering from a version problem. There's the official version, Sublime Text 2, and the easily available beta version, Sublime Text 3. They're both in widespread use. This division has ground on for around three years now, and is a pain to deal with.

It's annoying, as a plugin developer, because of a few crucial [differences](https://www.sublimetext.com/docs/3/porting_guide.html):

Sublime Text 2:

*   Uses Python 2.7.
*   Puts all package contents into a shared namespace.

Sublime Text 3:

*   Uses Python 3.3.
*   Puts all package contents into a module named for the package.
*   Has some new APIs, removes some old APIs.

...yes, the Sublime Text 2 / 3 situation is an annoyingly close parallel to the general Python 2 / 3 situation that is itself a subset of the Sublime problem. I prefer less irony in my life.

#### Python

[What changed in Python 3](https://docs.python.org/3/whatsnew/3.0.html) is a pretty well-covered topic, which I'm not going to go into here.

Suffice it to say that the changes are good, but introduce some incompatibilities which need code to be carefully written if it wants to run on both versions.

#### Imports

If your plugin is of any size at all, you probably have multiple files because separation of code into manageable modules is good. Unfortunately, the differing way that packages are treated in ST2 vs ST3 makes referring to these files difficult.

In Sublime Text 2, all files in packages are in a great big "sublime" namespace. Any package can `import` modules from any other package, perhaps accidentally.

For instance, in ST2...

```python
import comment
```

...gets us the `Default.comment` module, which provides the built-in "toggle comment on a line" functionality. Unless some other package has a `comment.py`, in which case who what we'll get becomes order-of-execution dependent.

Note the fun side-effect of this: if any package has a file which shares a name with anything in the standard library, it'll "shadow" that and any other package which then tries to use that part of the standard library will break.

Because of these drawbacks, Sublime Text 3 made the very sensible decision to make every package its own module. That is, to get that `comment` module, we need to do:

import Default.comment

This is better, and makes it harder to accidentally break other packages via your own naming conventions. However, it does cause compatibility problems in two situations:

1.  You want to access another package
2.  You want to use relative imports to access files in your own package

The latter case, this is something which behaves differently depending on whether you're inside a module or not.

```python
# ST2:
from git import GitTextCommand, GitWindowCommand, git_root
from status import GitStatusCommand

# ST3:
from .git import GitTextCommand, GitWindowCommand, git_root
from .status import GitStatusCommand
```

#### Editing text

In Sublime Text 2 you had to call `edit = view.begin_edit(...)` and `view.end_edit(edit)` to group changes you were making to text, so that undo/redo would bundle them together properly.

In Sublime Text 3, these were removed, and any change to text needs to be a `sublime_plugin.TextCommand` which will handle the edit-grouping itself without involving you.

### The Solution (sort of)

If you want to write a plugin that works on both versions, you have to write Python that runs on 2 and 3, and has to play very carefully around relative imports.

#### Python 2 / 3

A good first step here is to stick this at the top of all your Python files:

```python
from __future__ import absolute_import, unicode_literals, print_function, division
```

This gets Python 2 and 3 mostly on the same page; you can largely just write for Python 3 and expect it to work in Python 2. There's still some differences to be aware of, mostly in areas where the standard library was renamed, or when you're dealing with points where the difference between `bytes` and `str` actually _matters_. But these are workable-around.

For standard library reshuffling, checking exceptions works:

```python
try:
    # ST3
    from http.client import HTTPConnection
except ImportError:
    # ST2
    from httplib import HTTPConnection
```

If your package relies on something which changed more deeply, more extensive branching might be required.

#### Imports

If you want to access another module, as above, this is a sensible enough place to just check for exceptions.

```python
try:
    # ST3
    from Default import comment
except ImportError:
    # ST2
    import comment
```

You could check for the version of Sublime, of course, but the duck-typing approach here seems more Pythonic to me.

When accessing your own files, what made sense to me was to make it consistent by moving your files into a submodule, which means that the "importing a file in the same module" case is all you ever have to think about.

Thus: move everything into a subdirectory, and make sure there's an `__init__.py` within it.

There's one drawback here, which is that Sublime only notices commands that are in top-level package files. You can work around this with a `my_package_commands.py` file, or similar, which just imports your commands from the submodule:

```python
try:
    # Python 3
    from .git.core import GitInitCommand, GitFooCommand
    from .git.add import GitAddCommand
except (ImportError, ValueError):
    # Python 2
    from git.core import GitInitCommand, GitFooCommand
    from git.add import GitAddCommand
```

There's one last quirk to this, which only applies to _you_ during package development: Sublime Text only reloads your plugin when you change a top-level file. Editing a file inside the submodule does nothing, and you have to restart Sublime to pick up the changes.

I noticed that Package Control has some code to get around this, so I [copied its approach](https://github.com/kemayo/sublime-text-git/blob/master/git_commands.py) in my top-level command-importing file, making it so that saving that file will trigger a reload of all the submodule contents. It has one minor irritation, in that you have to manually list files in the right order to satisfy their dependencies. Although one could totally work around this, I agree with the Package Control author that it's a _lot_ simpler to just list the order and not lose oneself in metaprogramming.

#### Editing text

_Fortunately_, `sublime_plugin.TextCommand` exists in Sublime Text 2, with the same API signature as in Sublime Text 3, so all you have to do here is wrap all text-edits into a `TextCommand` that you execute when needed.

### Conclusion

Getting a package working in Sublime Text 2 and 3 simultaneously is entirely doable, though there are some nuisances involved, which is appropriate given that "run in Python 2 and 3 simultaneously" is a subset of the problem. That said, if you do what I suggest here, it should largely work without you having to worry about it.