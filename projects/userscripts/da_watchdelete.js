// ==UserScript==
// @name       Watchy Deletey
// @namespace  http://davidlynch.org/
// @version    0.1
// @description  DeviantArt Watch Feed: delete items
// @match      http://www.deviantart.com/watchfeed/*
// @copyright  2014+, David Lynch
// ==/UserScript==

var DWait = unsafeWindow.DWait;
if (!DWait) { return; }

DWait.ready(['jms/lib/difi.js', 'jms/lib/jquery/jquery.current.js'], function() {
    var DiFi = unsafeWindow.DiFi;
    var inbox;
    var get_inbox = function() {
        if (inbox) {
            return inbox;
        }
        inbox = $.Deferred();
        DiFi.pushPost('MessageCenter', 'get_folders', [], function(success, data) {
            if (success) {
                for (var i = 0; i < data.response.content.length; i++) {
                    if (data.response.content[i].is_inbox) {
                        console.log('inbox found', inbox);
                        inbox.resolve(data.response.content[i].folderid);
                        return;
                    }
                }
            }
            inbox.resolve(false);
        });
        DiFi.send();
        return inbox;
    };
    var messageid_from_action = function($this) {
        if ($this.is('.feed-action-type-deviations')) {
            return 'id:devwatch:' + $this.find('.feed-action-deviation > .tt-a').attr('collect_rid');
        }
        if ($this.is('.feed-action-type-gallection_summaries')) {
            var id = /favourites\/(\d+)/.exec($this.find('.gallection-inner-container > a').attr('href') || '');
            if (!id) {
                return;
            }
            return 'id:devwatch_gallection_summaries:21:' + id[1];
        }
    };
    $('.feed-action').each(function() {
        var $this = $(this);
        var message_id = messageid_from_action($this);
        if (!message_id) {
            return false;
        }
        $('<div>X</div>').css({'padding': '4px', 'float': 'right', 'cursor': 'pointer'}).click(function(e) {
            e.preventDefault();
            get_inbox().done(function(inbox_id) {
                if (!inbox_id) {
                    return alert("Can't find your inbox");
                }
                DiFi.pushPost('MessageCenter', 'trash_messages', [inbox_id, message_id], function(success, data) {
                    if (!success) {
                        return alert("Couldn't delete message");
                    }
                    $this.remove();
                });
                DiFi.send();
            });
        }).insertBefore($this.find('.feed-action-details > .username'));
    });
});
