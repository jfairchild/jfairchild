// ==UserScript==
// @name          Torn Find Eggs
// @namespace     http://github.com/jfairchild
// @icon          http://d6x6y1bpumxsv.cloudfront.net/orderdots/assets/jeff-obama-style.png
// @include       /^https?://www\.torn\.com/.*/
// @version       1.2
// @grant         GM_getValue
// @grant         GM_setValue
// ==/UserScript==


function clickRandom() {
	var r = Math.floor(Math.random() * $('a').length)
	if ($($('a')[r]).attr('href') === undefined) {
		return;
	}
	if ($($('a')[r]).attr('href').indexOf("/log") === 0) {
		return;
	}
	if ($($('a')[r]).attr('href').indexOf("/") === 0) {
		$('a')[r].click();
		return;
	}
}

function clickIt(obj) {
	if (obj.attr("class") === "button") {
		console.log("click a random link")
		clickRandom();
		return;
	}
	console.log("click the links");
	obj.each(function (index) {
		$(this).click();
	});
	obj.parent().each(function (index) {
		$(this).click();
	});
}

if ($('a[href*="step=eggfind"]').length > 0) {
	$('a[href*="step=eggfind"]').each(function (index) {
		$(this).click();
	});
}

if ($('a[href*="egg"]').length > 0) {
	$('a[href*="egg"]').each(function (index) {
		$(this).click();
	});
}


/* $('a[href*="city.php"]')[0].click(); */
if ($('a[href*="competition"]').length > 0) {
	clickIt($('a[href*="competition"]'))
}
if ($('a[href*="easter"]').length > 0) {
	clickIt($('a[href*="easter"]'))
}

/*
<a href="competitioneaster.php?step=eggfind&amp;rfc=382943461" border="0"><img src="includes/eastereggimage.php?ID=128156381704" border="0"></a>
*/

// $('a[href*="competition"]').attr("class") === "button"

/* http: //www.torn.com/competitioneaster.php?step=eggfind&rfc=899246737 
<a border="0" href="competitioneaster.php?step=eggfind&amp;rfc=16292863"><img border="0" src="includes/eastereggimage.php?ID=59714527349"></a>
*/