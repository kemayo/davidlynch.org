// ==UserScript==
// @name           dA Mature Borders
// @namespace      http://davidlynch.org/js/userscripts
// @description    Show borders around mature deviations while browsing
// @include        http://*.deviantart.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery; // might as well take advantage of dA having jQuery around
if(!$) { return; }
// .mature if show-mature is off, .ismature if show-mature is on
$('a.mature, a.ismature').css('outline', '2px solid red');

// The following would give it red shadows instead.  It's a spiffy effect, but it does put extra load on the dA servers...
/*
$('a.mature, a.ismature').live(function() {
    // var shadow = $(this).parents('span.shadow');
    // shadow.css('background-image', shadow.css('background-image').replace(/\-000000/, '-FF0000').replace(/\-0\.35/, '-0.8'));
});
*/
