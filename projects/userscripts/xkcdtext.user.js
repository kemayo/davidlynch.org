// ==UserScript==
// @name           xkcd text
// @namespace      http://davidlynch.org/js/userscripts/
// @description    Show xkcd's title text under the strip
// @include        http://*xkcd.com/*
// ==/UserScript==

var comic_re = /http:\/\/imgs.xkcd.com\/comics\/.+/;
window.addEventListener('load', function() {
	var images = document.getElementsByTagName('img');
	for(var i = 0; i < images.length; i++) {
		var img = images[i];
		if(comic_re.test(img.src)) {
			var text = document.createElement('span');
			text.innerHTML = '<br>' + img.title;
			img.parentNode.insertBefore(text, img.nextSibling);
			break;
		}
	}
}, true);
