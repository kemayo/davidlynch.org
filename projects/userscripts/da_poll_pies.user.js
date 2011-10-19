// ==UserScript==
// @name           dA Poll Pies
// @namespace      http://davidlynch.org/js/userscripts
// @include        http://*.deviantart.com/*
// ==/UserScript==

var $ = unsafeWindow.$j; // might as well take advantage of dA having jQuery around
if(!$) { return; }
var add_chart = function($this) {
    if($this.hasClass('da-pollpied') || $this.find('form').length > 0) {
        return false;
    }
    var values = [];
    var labels = [];
    $this.addClass('da-pollpied').find('div.ctube span').each(function() {
        values.push($(this).text().replace('%', ''));
        var label = $(this).closest('div.ctube').next('span').find('strong').text().replace('|', '');
        labels.push(label);
    });
    
    $this.append('<img src="http://chart.apis.google.com/chart?cht=p3&chd=t:' + values.join(',') + '&chs=' + $this.width() + 'x' + Math.floor(Math.min($this.width()/2, 300000 / $this.width())) + '&chdl=' + labels.join('|') + '&chf=bg,s,DAE4D9"/>');
    return true;
}
$('[name=gmi-GUserPoll]').each(function(e) {
    add_chart($(this));
}).find('form input[type=submit]').click(function(e) {
    var id = $(this).closest('td').attr('id');
    var interval = setInterval(function(){
        if(add_chart($('#' + id + ' div[name=gmi-GUserPoll]'))) {
            clearInterval(interval);
        }
    }, 200);
});
