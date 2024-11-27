---
layout: default
title: Dive Into Addons
sitename: Dive Into Addons
subtitle: "it's actually pretty easy"
---
World of Warcraft addons are sort of difficult to start writing. There are a few barriers to entry. First, you need to learn Lua. Second, you need to learn how WoW uses Lua.

It's hard to get a feel for how the addon system works. You'll find yourself following instructions in tutorials that don't explain what's necessary and what's not. Then there's a jump from "hello world" to something useful.

It's worse if you're being introduced to it through a framework. Ace2 is a wonderful thing, which makes my life much easier... but it's full of magic things that happen and that you just have to take on faith.

This is not a basic, simple tutorial. I'm going to take a small addon and vivisect it. I'll explain how everything fits together, and why some choices were made. Hopefully when I'm done you'll have a greater understanding of addons in general.

I have no intention of explaining anything about the WoW API that isn't directly relevant. You want that, go to [the wiki](https://warcraft.wiki.gg/wiki/API). You may find [Programming in Lua](http://www.lua.org/pil/) useful as a much more thorough presentation of Lua than I'll provide.

So. The addon. I have chosen OpenAll. Because I wrote it, and it's a useful combination of minimalism and utility which will require touching on disparate topics to understand. Also, it deals with one of the more painful areas to write an addon for: the mailbox. The mail API is crap. Crap, crap, crap. I'll explain why later.

There are only two files in this addon, and you can download them [here](https://github.com/kemayo/wow-openall).  (2024 note: though you'll have to go a long way back to find the exact versions described in this tutorial)

OpenAll.toc:
```sh
## Interface: 20100
## Title: OpenAll
## Notes: Open all your mail
## Author: Kemayo
## Version: 1
## X-Category: Mail
## LoadManagers: SupplyAndDemand, ForkliftGnome
## X-S&D-AtMail: true
## X-LoadOn-Mailbox: true

OpenAll.lua
```

OpenAll.lua:
```lua
local deletedelay, t = 0.5, 0
local takingOnlyCash = false
local button, button2, waitForMail, doNothing, openAll,
	openAllCash, openMail, lastopened, stopOpening, onEvent
local _G = _G
local baseInboxFrame_OnClick
function doNothing() end
function openAll()
	if GetInboxNumItems() == 0 then return end
	button:SetScript("OnClick", nil)
	button2:SetScript("OnClick", nil)
	baseInboxFrame_OnClick = InboxFrame_OnClick
	InboxFrame_OnClick = doNothing
	for i = 1, 7 do _G["MailItem" .. i .. "ButtonIcon"]:SetDesaturated(1) end
	button:RegisterEvent("UI_ERROR_MESSAGE")
	openMail(GetInboxNumItems())
end
function openAllCash()
	takingOnlyCash = true
	openAll()
end
function openMail(index)
	if not InboxFrame:IsVisible() or index == 0 then return stopOpening() end
	local _, _, _, _, money, COD, _, hasItem = GetInboxHeaderInfo(index)
	if money > 0 then
		TakeInboxMoney(index)
	elseif (not takingOnlyCash) and hasItem and COD <= 0 then
		TakeInboxItem(index)
	end
	local items = GetInboxNumItems()
	if items > 1 and index < items + 1 then
		lastopened = index
		t = 0
		button:SetScript("OnUpdate", waitForMail)
	else
		stopOpening()
	end
end
function waitForMail()
	t = t + arg1
	if t > deletedelay then
		button:SetScript("OnUpdate", nil)
		local _, _, _, _, money, _, _, hasItem = GetInboxHeaderInfo(lastopened)
		if money > 0 or ((not takingOnlyCash) and hasItem) then --deleted or bumped
			openMail(lastopened)
		else
			openMail(lastopened - 1)
		end
	end
end
function stopOpening()
	button:SetScript("OnUpdate", nil)
	button:SetScript("OnClick", openAll)
	button2:SetScript("OnClick", openAllCash)
	if baseInboxFrame_OnClick then
		InboxFrame_OnClick = baseInboxFrame_OnClick
	end
	for i = 1, 7 do _G["MailItem" .. i .. "ButtonIcon"]:SetDesaturated(nil) end
	button:UnregisterEvent("UI_ERROR_MESSAGE")
	takingOnlyCash = false
end

function onEvent(frame, event, arg1, arg2, arg3, arg4)
	if event == "UI_ERROR_MESSAGE" then
		if arg1 == ERR_INV_FULL then
			stopOpening()
		end
	end
end
local function makeButton(id, text, w, h, x, y)
	local button = CreateFrame("Button", id, InboxFrame, "UIPanelButtonTemplate")
	button:SetWidth(w)
	button:SetHeight(h)
	button:SetPoint("CENTER", InboxFrame, "TOP", x, y)
	button:SetText(text)
	return button
end
button = makeButton("OpenAllButton", "Take All", 60, 25, -50, -410)
button:SetScript("OnClick", openAll)
button:SetScript("OnEvent", onEvent)
button2 = makeButton("OpenAllButton2", "Take Cash", 60, 25, 20, -410)
button2:SetScript("OnClick", openAllCash)
```

...overwhelming, no?  Let's start from the top.

When World of Warcraft loads it looks through your addon folder ({wowdir}/Interface/Addons). In every directory there it looks for a file with the same name as that directory and a .toc extension. If it finds one, that's an addon.

The .toc (Table Of Contents) file tells World of Warcraft about your addon. At a minimum the .toc tells WoW what it's called and which files to load.

Lines that start with `#` are comments. Lines starting with `##` are special comments that WoW scans for descriptive information.

Let's look at OpenAll.toc's comments again:

```sh
## Interface: 20100
## Title: OpenAll
## Notes: Open all your mail
## Author: Kemayo
## Version: 1
## X-Category: Mail
## LoadManagers: SupplyAndDemand, ForkliftGnome
## X-S&D-AtMail: true
## X-LoadOn-Mailbox: true
```

`Interface` says what version of WoW this addon was written for. In this case, `20100` translates to 2.1. You have to explicitly tell WoW to load addons with an interface version older than the current one.

`Title`, `Author`, `Notes`, and `Version` are all self-explanatory.

`LoadManagers` is slightly complicated. It tells WoW that if any of the addons it lists are present then this addon should be load on demand, meaning that it won't be loaded until something else asks for it. If none of those addons are present then this addon is loaded all the time.

Comments that start with `X-` aren't used directly by WoW for anything. They're just ways of telling other addons things about your addon, even when it's not loaded. These are saying that it's a Mail addon, and giving some instuctions to the aforementioned LoadManagers about when they should load this addon.

The next part of OpenAll.toc is rather short.

```sh
OpenAll.lua
```

That's a list of all the files that make up OpenAll, one per line. Like I said, this is a minimal addon.

Not that it matters here, but these files are loaded in the order you list them. So if you want to refer to something from one file in another, pay attention here.

There's not really anything else that you need to know about .toc files, so we're moving on to the far more complicated topic of Lua.

```lua
local deletedelay, t = 0.5, 0
```

It's just the first line, and already there are five new concepts for us: variables, assignment, types, scope, and blocks.

<b>Variables</b> are like named lockers that you can put things in to retrieve later.

<b>Assignment</b> is the process that you use to put things into a variable. It uses the `=` symbol. You can assign several values to several variables at once if you put multiple values separated by a `,`.

That means that after `local deletedelay, t = 0.5, 0` we now have two variables, `deletedelay` and `t`. `deletedelay` contains the value `0.5`, while `t` contains the value `0`.

Note that a variable containing `0` or `false` is not the same as a variable that has not yet been assigned to; variables that have not yet been assigned to contain the special value `nil`.

In fact, `0`, `false`, and `nil` are all of different data <b>types</b>. There are only a few types in Lua, so I'm just going to go ahead and list them here:

* `nil` - the absence of useful data, the value of an unassigned variable
* Boolean - `true` or `false`
* Numbers - 0, 1, 2, 3, 4, 5, 17.435, 99... you get the idea.
* Strings - text, expressed in "quotation marks", of 'either' "type".
* Tables - bundles of data, assigned to a single variable (`t = {1,2,3,4,5}`)
* Functions - pieces of Lua that are <b>callable</b> (I'll come back to this)

<b>Scope</b> describes who can see a variable. It's sort of complicated if you've never dealt with it before.

In Lua the default scope is <b>global</b>, which means that everything can see (and change) it. This is not always a good thing -- if you're using a global variable there's no guarantee that some other addon won't just overwrite whatever you put in it, because you're both using the same common name (like, say, `t`). This leads to things breaking in ways that are profoundly non-obvious.

So there is a way to declare that only things in the current <b>block</b> can affect a variable. To do so you declare it as <b>local</b>.

I need to quickly digress and explain what a <b>block</b> is, and then I can give you an example of how this works.

A <b>block</b> is a unit of code that all has the same scope. There are a lot of ways to start a block, but for now I'm just going to explain one: `do ... end`. Everthing between `do` and `end` is in a single block.

Blocks can be nested (put inside each other). Local variables in a block can be accessed by blocks within that block.

The current file is a block.

So:

```lua
local topLevel = 'hello'
do
	local i = 1
	print(topLevel) -- prints 'hello'
end
print(i) -- prints 'nil', not '1'
```

As you might imagine, it's good practice to make everything that doesn't need to be accessed by anyone else `local`.

You can see all this used over the next few lines of the file:

```lua
local takingOnlyCash = false
local button, button2, waitForMail, doNothing, openAll,
	openAllCash, openMail, lastopened, stopOpening, onEvent
local baseInboxFrame_OnClick
local _G = _G
```

You will notice that declaring something as `local` without assigning anything to it immediately is possible.

A lot of things are being declared as local here so I don't have to worry about declaring functions in any particular order further down.

The last line looks weird, but is just a way of bringing something global into the local scope. Some authors like to do this for a slight performance optimization -- it takes less time to look up a variable's value if it's local.

`_G` is a magic variable. It's a table representing the global environment. So these two statements are exactly equivalent in their effect:

```lua
someName = 'George'
_G["someName"] = 'George'
```

This is useful in the case where you want to access a global variable whose name you don't know yet, as you'll see later.

```lua
function doNothing() end
```

Our first function!  Those of you with a background in programming or maths will know that a function is a way to apply a series of steps to a given input. If you didn't know that... I just told you. The process of applying a function to some inputs is called "calling" it.

This one, as you might guess from the name, does nothing. It still introduces us to the function declaration syntax, however, which is: `function [name]([arguments]) [function code] end`.

Here's a really simple function that actually does something:

```lua
local function addTogether(a, b)
	return a + b
end
print(addTogether(5, 2)) -- prints '7'
```

`return` ends a function, declaring that whatever you told it to return is the result of the function.

Note that `function foo() end` means the same as `foo = function() end`. The latter is a more accurate way of expressing what you're doing -- creating a function, and placing it in a variable.

A function is also a block.

I'm going to jump to the very bottom of OpenAll.lua now, because it'll make more sense that way. Trust me.

```lua
local function makeButton(id, text, w, h, x, y)
	local button = CreateFrame("Button", id, InboxFrame, "UIPanelButtonTemplate")
```

`makeButton` is a convenience function, written so I don't have to write out the exact same code twice to create and position two buttons. This lets me pass the only differences between then as arguments.

In `makeButton` we see our first WoW API functions being used. [CreateFrame](https://warcraft.wiki.gg/wiki/API_CreateFrame), well, creates a [frame](https://warcraft.wiki.gg/wiki/UIOBJECT_Frame). A frame is the basic component of the WoW interface. It can represent pretty much anything. In this case we're creating a type of frame called a `Button`, which is a child of `InboxFrame`, and is positioned relative to the top of `InboxFrame`.

`button` is produced by `CreateFrame`. `button` is a frame. In fact, a frame is just a table, as discussed briefly above. Tables are used for a lot of things in Lua, especially things where other languages would use "classes" or "objects".

A table is created by using a pair of curly braces (`{ }`), and consists of a set of key-value pairs. You can access values from the table in two ways:

```lua
local t = {}
t.somevalue = 1
t["value with a space"] = 17
```

Anything that can be held in a variable can be a table key or value. *Anything*. Other tables, functions, whatever.

```lua
	button:SetWidth(w)
	button:SetHeight(h)
	button:SetPoint("CENTER", InboxFrame, "TOP", x, y)
	button:SetText(text)
	return button
end
```

Here we see new syntax again. It's just a shortcut for calling a function in a table... `button:SetHeight(h)` means exactly the same thing as `button.SetHeight(button, h)`

As I said, tables are often used where other languages would use "objects". Frames are an example of this -- they're a bundle of related functions and data that are used to manipulate something in the UI. Just to give you an example of how this works:

```lua
local cat = {name="Mittens", age=17, color="Too scarred to tell"}
function cat:Purr()
	print(self.name .. ' purrs loudly')
end
cat:Purr() -- prints "Mittens purrs loudly"
```

That's obviously a bit contrived. But you get the idea.

It's worth noting that the function declaration above uses a very similar syntax to the earlier example of calling functions in a table. `function cat.Purr(self)` means the exact same thing as `function cat:Purr()`. "self" is magic.

Now you know that, the code that's actually using `makeButton` should make sense:

```lua
button = makeButton("OpenAllButton", "Take All", 60, 25, -50, -410)
button:SetScript("OnClick", openAll)
button:SetScript("OnEvent", onEvent)
button2 = makeButton("OpenAllButton2", "Take Cash", 60, 25, 20, -410)
button2:SetScript("OnClick", openAllCash)
```

`button:SetScript` lets you assign a function that will be called when a particular thing happens to the frame in question. In this case we say that when someone clicks on it we want `openAll` to be called, and when an event occurs (I'll get back to that) we want `onEvent` to be called.

Back to the top!

```lua
function openAll()
	if GetInboxNumItems() == 0 then return end
	button:SetScript("OnClick", nil)
	button2:SetScript("OnClick", nil)
```

Here we define `openAll`, the function I mentioned earlier that gets called when someone clicks on one of the buttons we made.

Excitingly, it uses our first conditional. A conditional is a way of saying "if something is true, do this, otherwise do that". The syntax is: `if [condition] then [code] else [code] end`. In this case we're saying that if there's no mail in your inbox then the function should give up right then.

If there's mail, we tell the buttons that clicking on them shouldn't do anything while we're working.

```lua
	baseInboxFrame_OnClick = InboxFrame_OnClick
	InboxFrame_OnClick = doNothing
```

And now we "hook" `InboxFrame_OnClick`, the Blizzard function that gets called whenever you click on the inbox. "Hooking" refers to substituting your own function for another one. Sometimes your substitute function will then call the original function, and sometimes (like now) you completely replace it. We're completely replacing it with the aptly named `doNothing` that we defined earlier, because we don't want clicking on the inbox to do anything while we're meddling with mail.

```lua
	for i = 1, 7 do _G["MailItem" .. i .. "ButtonIcon"]:SetDesaturated(1) end
```

Our first loop!  A loop repeats a block of code based on a particular condition. A `for` loop like this repeats a specified number of times. The syntax is: `for [loop variable] = [start value], [end value], [increase by] do ... end`

In this case we want to call a function on a set of objects whose names only differ by one number... `MailItem1ButtonIcon` through `MailItem7ButtonIcon`, the icons in your mailbox. This is why we brought up the `_G` magic table earlier... it means that we can build the name of the button as a string and look it up in the global table. To build the name we use the <b>concatenation</b> operator: `..`

```lua
	button:RegisterEvent("UI_ERROR_MESSAGE")
```

Then we tell the button that we want it to listen out for a particular event, named UI_ERROR_MESSAGE. When it sees that particular event occur it calls the function that we earlier set up as `button`'s OnEvent handler.

[Events](https://warcraft.wiki.gg/wiki/Events) are a very important part of WoW addon writing. Nothing happens unless an event triggers it. The `:SetScript` stuff we did earlier is just a specialized way of registering for events that only affect one particular frame, for instance. A big part of writing an addon is working out what events you'll need to register for and respond to. Fortunately, [the wiki](https://warcraft.wiki.gg/wiki/Events) has a quite comprehensive list.

The event system also explains why even addons that don't require any UI will create a frame -- you need one to receive events. Fortunately a basic frame is invisible until you tell it otherwise.

(As an aside... `:RegisterEvent` is slightly misnamed. It might be better thought of as `:RegisterForEvent`.)

```lua
	openMail(GetInboxNumItems())
end
```

And we call `openMail` with the number of items in the inbox as its argument, asking it to pick up the item from that mail slot. (We're picking things up from the end of the mailbox and working towards the start because that means we don't have to worry about  items changing position while we work.)

```lua
function openAllCash()
	takingOnlyCash = true
	openAll()
end
```

This is the handler for the other button we defined earlier -- all it does is set a variable to true so we can check it later, and call openAll.

```lua
function openMail(index)
```

`openMail` is the core of the addon. It examines a piece of mail and decides whether or not it can collect an item or cash from it.

```lua
	if not InboxFrame:IsVisible() or index == 0 then return stopOpening() end
```

Before trying to do anything it checks to see whether the inbox is actually open, or whether we've already opened everything. (It would know that we'd opened everything if it was asked to pick up item 0 from the inbox, because that doesn't exist.)

```lua
	local _, _, _, _, money, COD, _, hasItem = GetInboxHeaderInfo(index)
```

To work out what we're going to do with the item in slot `index` we call `GetInboxHeaderInfo`, an API function.

`_` is new here -- it's a variable like any other, but by convention it's always used as a throwaway. You assign values that you're not interested in to it, and then ignore it. In this case all we're interested in is how much money is on the mail, whether it's C.O.D., and whether there's an item attached.

```lua
	if money > 0 then
		TakeInboxMoney(index)
	elseif (not takingOnlyCash) and hasItem and COD <= 0 then
		TakeInboxItem(index)
	end
```

If there's money, we take it. If we're not taking only cash and there's an item and it's *not* C.O.D, we take it.

```lua
	local items = GetInboxNumItems()
	if items &gt; 1 and index &lt; items + 1 then
		lastopened = index
		t = 0
		button:SetScript("OnUpdate", waitForMail)
	else
		stopOpening()
	end
end
```

We check whether there are any more items in the mail -- note that `GetInboxNumItems` ***won't*** yet have noticed if we've emptied (and thus auto-deleted) the mail message we just dealt with. So we check whether there's more than one mail left, and make sure that we're not outside the bounds of the available messages. (This is probably overly cautious. It's mainly a sanity check in case something really weird happens.)

If there's more mail left we wait to see whether picking up the current mail item/cash actually succeeded. We do this by setting "OnUpdate" for the button. OnUpdate is a very useful thing, and easy to abuse. The function you assign to it will be called every "tick", meaning every time the UI updates. So *try* not to do anything intensive in it.

```lua
function waitForMail()
	t = t + arg1
```

We add the time since the `OnUpdate` function was last called to `t`, which we had set to 0 before setting up the `OnUpdate`. This is done so we can wait a specified amount of time before we check mail again.

`arg1` (and, indeed `arg2` through `arg8`) are "magic" globals set by Blizzard, which work as function arguments for events.

```lua
	if t > deletedelay then
```

Specifically, we wait for `t` to be greater than `deletedelay`, which we set up at the very start of the file to 0.5. So we're only checking every half second.

```lua
		button:SetScript("OnUpdate", nil)
		local _,_,_,_,money,COD,_,hasItem = GetInboxHeaderInfo(lastopened)
		if money > 0 or ((not takingOnlyCash) and COD <=0 hasItem) then
			openMail(lastopened)
		else
			openMail(lastopened - 1)
		end
	end
end
```

If there's still money or an item on the last piece of mail we tried to open, try to open it again. Sometimes a request to open mail can get lost, you see. If not, move one step towards the "front" of the mailbox and start opening again.

(This is the core of my complaints about the mail system in WoW. Unlike many other segments of the game, you don't get any events when the mailbox updates, so you have to do this OnUpdate checking and hope you've thought of all the possible conditions.)

```lua
function stopOpening()
	button:SetScript("OnUpdate", nil)
	button:SetScript("OnClick", openAll)
	button2:SetScript("OnClick", openAllCash)
	if baseInboxFrame_OnClick then
		InboxFrame_OnClick = baseInboxFrame_OnClick
	end
	for i = 1, 7 do _G["MailItem" .. i .. "ButtonIcon"]:SetDesaturated(nil) end
	button:UnregisterEvent("UI_ERROR_MESSAGE")
	takingOnlyCash = false
end
```

`stopOpening` just sets everything back to how it was before we started opening mail. It hooks the buttons back up, de-greys the icons, and stops listening for error messages.

```lua
function onEvent(frame, event, arg1, arg2, arg3, arg4)
	if event == "UI_ERROR_MESSAGE" then
		if arg1 == ERR_INV_FULL then
			stopOpening()
		end
	end
end
```

About those error messages... this is the listener function. You can see the main difference between the `OnUpdate` and `OnEvent` is that `OnEvent` gets the magic globals passed to it normally, instead of having to rely on the magic.

So first it checks whether the event that called it was the event we care about -- `UI_ERROR_MESSAGE`. If so, it checks whether the error message is `ERR_INV_FILL`. If so, it stops trying to open mail, because there's no more room in your bags.

`ERR_INV_FILL` is an example of an automatically translated ("localized") global string -- Blizzard has a lot of these available which are used in their own UI code. They allow you to check whether something was said without worrying about whether it was said in English or Korean or some other language. If all you cared about was people in the US then you could check for "Inventory is full." for the exact same effect.

And there you have it. You now know how to write an addon that can pick up all the mail in your mailbox.

I'd like to thank [Mark Pilgrim](http://www.diveintomark.org), because I stole his "Dive Into" naming scheme. Then I'd like to thank my spouse, for providing invaluable beta-reading services.
