// ==UserScript==
// @name           Skip Warnings
// @namespace      http://davidlynch.org/js/userscripts
// @description    Skip the offsite-link warning pages.
// @include        http://*.deviantart.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
if(!$) { return }
var base = 'http://www.deviantart.com/users/outgoing?';
var img = 'data:image/gif;base64,R0lGODlhCQAJAIABAICAgP///yH5BAEAAAEALAAAAAAJAAkAAAIShBFnwaydnlsrItduhFlDBQIF\nADs=\n';

$('a[href^='+base+']').each(function(){
    $(this).attr('href', this.href.replace(base, '').replace(/#$/, '')).after($('<img src="'+img+'" title="external site" />'));
})
