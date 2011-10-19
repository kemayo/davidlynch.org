// Otaku Booty modflag tweaker
// version 0.00004
// 2008-01-05
// Copyright (c) 2008, David Lynch
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          OB ModFlags
// @namespace     http://davidlynch.org/userscripts/
// @description   Add "hidden" flags to the moderator panel.
// @include       http://otakubooty.bootyproject.org/of.asp*
// @include       http://*otakubooty.com/*
// ==/UserScript==

var flag_stub = '<a href="of.asp?id_post=[ID_POST]&tab=[TAB]&action=st&page=' +
	'[PAGE]&idpms=[ID_POST_MODERATE]&pms=';
var flag_mid = '">';
var flag_end = '</a><br />';

function flags_received(response) {
	if(response.status == 200) {
		eval(response.responseText); //creates a variable 'flags'
		flagmap = {};
		
		unsafeWindow.ob_mod_template += '<h3>Hidden Flags</h3>';
		flags.forEach(function(flag) {
			// If it's not 'locked' or 'deleted' or already in the template...
			if(flag[0] != '4' &
			   flag[0] != '9' &
			   unsafeWindow.ob_mod_template.indexOf('pms='+flag[0]+'"') == -1) {
				unsafeWindow.ob_mod_template += flag_stub + flag[0] + flag_mid +
					flag[1] + flag_end;
			}
			flagmap[flag[0]] = flag;
		});

		var modLinks = document.evaluate("//a[@href='javascript:void(0);']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < modLinks.snapshotLength; i++) {
			var thisLink = modLinks.snapshotItem(i);
			thisLink.setAttribute("onclick", thisLink.getAttribute("onclick")
				.replace('WIDTH, 450,', 'WIDTH, 600,'));
		}
		
		unsafeWindow.ob_mod_template = unsafeWindow.ob_mod_template.replace(
			/<a href="of.asp\?id_post=\[ID_POST\]&tab=\[TAB\]&action=st&page=\[PAGE\]&idpms=\[ID_POST_MODERATE\]&pms=(\d+)">/gi,
			function(s, id) {
				if(flagmap[id]) {
					var img = "images/forum/post/"+id+"."+flagmap[id][2];
					//var oc = "overlib('<a style=&quot;color:white&quot; onclick=&quot;javascript: return cClick();&quot; href=&quot;javascript: return void;&quot;><div style=&quot;width:100%; background:#000000&quot;>"+flagmap[id][1]+" - Click to close</div><img border=0 src=&quot;"+img+"&quot;>', WIDTH, 140, HEIGHT, 70, HAUTO, VAUTO, FGBACKGROUND, 'images/forum/loading.gif', STICKY, CLOSECLICK, OFFSETX, -80, OFFSETY, 5,  CLOSETEXT, 'Close');return false;"
					//return '<a href="' + img + '" onclick="' + oc + '">#</a>' + s;
					return '<a href="' + img + '">#</a>' + s;
				}
				return s;
			});
	}
}

window.addEventListener('load', function() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.otakubooty.com/webservices/mod_flags.asp',
		onload: flags_received
	});
}, true);
