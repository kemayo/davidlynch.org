// ==UserScript==
// @name           dA Print Borders
// @namespace      http://davidlynch.org/js/userscripts
// @description    Show borders around deviations with prints while browsing
// @include        http://*.deviantart.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery; // might as well take advantage of dA having jQuery around
if(!$) { return; }
$('a.hasprint').css('outline', '2px solid green');

