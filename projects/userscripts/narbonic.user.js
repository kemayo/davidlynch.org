// ==UserScript==
// @name           Narbonic
// @namespace      http://davidlynch.org/js/userscripts
// @description    Make Narbonic navigation more friendly
// @include        http://www.webcomicsnation.com/shaenongarrity/narbonic*
// ==/UserScript==

//var chapter_link = 'http://www.webcomicsnation.com/shaenongarrity/narbonic/series.php?view=archive&chapter=';
var chapter_link = 'series.php?view=archive&chapter=';

function xpath(query, base) {
	return document.evaluate(query, base || document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function createChapterLink(element, text) {
	var a = document.createElement('a');
	a.href = chapter_link + element.value;
	a.title = element.innerHTML;
	a.innerHTML = text;
	return a;
}

window.addEventListener('load', function() {
	var nav = xpath('/html/body/div/table/tbody/tr/td/div[2]/table[2]/tbody/tr/td').snapshotItem(0);
	if(!nav) { return false; }
	
	var links = document.createElement('div');
	var storyline = xpath('//select[@name="chapter"]', nav).snapshotItem(0);
	
	if(storyline.options[storyline.selectedIndex - 1]) {
		links.appendChild(createChapterLink(storyline.options[storyline.selectedIndex - 1], 'Prev'));
	}
	links.appendChild(document.createTextNode(' '));
	if(storyline.options[storyline.selectedIndex + 1]) {
		links.appendChild(createChapterLink(storyline.options[storyline.selectedIndex + 1], 'Next'));
	}
	
	var n = storyline.parentNode; // the form
	n.parentNode.insertBefore(links, n.nextSibling);
	
	//var on = xpath('/html/body/div/table/tbody/tr/td/div/table/tbody/tr[2]/td').snapshotItem(0);
	var on = xpath('/html/body/div/table/tbody/tr/td/div[2]/table/tbody/tr[2]/td/div').snapshotItem(0);
	on.appendChild(links.cloneNode(true));
}, true);
