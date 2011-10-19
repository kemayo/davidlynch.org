// ==UserScript==
// @name           Symbolic
// @namespace      http://davidlynch.org/js/userscripts
// @description    What the hell are those symbols?
// @include        http://*.deviantart.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery; // might as well take advantage of dA having jQuery around
if(!$) { log('no jQuery'); return; }

var symbols = {
    '~': 'Member',
    '*': 'Subscriber',
    '=': 'Official Beta Tester',
    '`': 'Senior Member',
    '°': 'Alumni Staff',
    '#': 'Group',
    '£': 'Minister of dA',
    '@': 'dAmn Administrator',
    '©': 'Copyright & Etiquette Administration Staff',
    '%': 'Prints Staff',
    '+': 'General Staff (oldskool)',
    '¢': 'Creative Staff',
    '^': 'Gallery Director (unpaid lackey)',
    '$': 'Core Administrator (awesome)',
    '!': 'Banned Account'
};

var log = function() {
    if(unsafeWindow.console && unsafeWindow.console.log) { unsafeWindow.console.log.apply(this, arguments); }
}
var count = 0;
$('a.u').each(function(e) {
    if(!(this.previousSibling && this.previousSibling.nodeValue)) { return; }
    var previous = this.previousSibling.nodeValue;
    var symbol = previous[previous.length - 1];
    if(symbols[symbol]) {
        count = count + 1;
        $(this).attr('title', symbols[symbol]);
    }
});
//setTimeout(function(){ log("Added " + count + " descriptions to user symbols."); }, 200);
