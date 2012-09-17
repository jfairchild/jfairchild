// ==UserScript==
// @name          Facebook Torn
// @namespace     https://www.facebook.com/jeff.commerce
// @include       http://facebook.torn.com/*
// @include       http://apps.facebook.com/*
// @icon          http://profileimages.torn.com/195793575-558217.jpg
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version       1.1
// @grant         GM_getValue
// @grant         GM_setValue
// ==/UserScript==

function waitForComplete() {
    if (document.readyState !== 'complete') {
        setTimeout(tornMain, 5000);
    }
    var crimeButton = $('a#nav-crime.button');
    console.warn('waitForComplete: CRIME BUTTON: ' + crimeButton);
}

// If any timer is empty, the bar is full. Return 0
function getShortestCountdown() {
    if ($('span#energyTimer').text() === '' || $('span#happyTimer').text() === '' || $('span#nerveTimer').text() === '') { return 30; }

    var timer = parseInt($('span#happyTimer').text());
    if (parseInt($('span#energyTimer').text()) < timer) {
        timer = parseInt($('span#energyTimer').text());
    }
    if (parseInt($('span#nerveTimer').text()) < timer) {
        timer = parseInt($('span#nerveTimer').text());
    }
    if (timer < 10) {
        timer = timer + 10;
    }
    return timer + 2;
}

function doCrime() {
    setTimeout('$("a#nav-crime.button").click();', 1);
    // 10 Nerve Crime
    setTimeout('$("h2 a:eq(9)").click();', 4000);
    var timeCheck = new Date().getSeconds() % 3;
    if (timeCheck === 0) {
        setTimeout('$("a.button.positive:eq(1)").click();', 8000);
    }
    else if (timeCheck === 1) {
        setTimeout('$("a.button.positive:eq(2)").click();', 8000);
    }
    else {
        setTimeout('$("a.button.positive:eq(3)").click();', 8000);
    }
}

function compareNumbers(a, b) {
    return a - b;
}

function parseBattleStat(stat) {
    if (stat.split(',').length < 2) return parseInt(stat);
    var statArr = stat.split(',');
    var value = 0;
    for (var i = 0; i < statArr.length; i++) {
        value *= 1000;
        value += parseInt(statArr[i]);
    }
    return value;
}

function train() {
    var strength = parseBattleStat($('div.sectionbody:eq(1) div.value:eq(0)').text());
    var defence = parseBattleStat($('div.sectionbody:eq(1) div.value:eq(1)').text());
    var speed = parseBattleStat($('div.sectionbody:eq(1) div.value:eq(2)').text());
    var dexterity = parseBattleStat($('div.sectionbody:eq(1) div.value:eq(3)').text());

    var stats = [strength, defence, speed, dexterity];
    stats = stats.sort(compareNumbers);
    setTimeout('$("a#nav-gym.button").click();', 1);

    var theStat = 'strength';
    if (stats[0] === defence) {
        theStat = "defence";
    } else if (stats[0] === speed) {
        theStat = "speed";
    } else if (stats[0] === dexterity) {
        theStat = "dexterity";
    }
    setTimeout(function () { doTrain(theStat); }, 3000);
}

function doTrain(stat) {
    stat = 'strength';
    var energy = parseInt($('span#currentEnergyValue').text()) / 5;
    var input = 'input#' + stat + '.smallInputbox';
    $(input).val(energy);
    switch (stat) {
        case 'strength':
            setTimeout('$("a.positive.button:eq(1)").click();', 1);
            return;
        case 'defence':
            setTimeout('$("a.positive.button:eq(2)").click();', 1);
            return;
        case 'speed':
            setTimeout('$("a.positive.button:eq(3)").click();', 1);
            return;
        case 'dexterity':
            setTimeout('$("a.positive.button:eq(4)").click();', 1);
            return;
    }
}

var _checkJail = 0;

function bustSomeone() {
    console.log('HERE IS THE TITLE: ' + $('div.title h1:eq(1)').text());
    if ($('div.buttonRight a.button.positive').length === 0) {
        setTimeout('$("a#nav-jail.button").click();', 1);
        setTimeout('$("div.buttonRight a.button.positive").click();', 10);
        console.log('no one to bust');
        return true;
    }
    console.log('clicking bust');
    setTimeout('$("div.buttonRight a.button.positive").click();', 2);
    return false;
}

var _waitSeconds = 10000;
var _clearInterval;

function tornMain() {
    console.log('in tornMain: ' + new Date());
    if (window.location.hostname === 'apps.facebook.com') {
        window.location = 'http://facebook.torn.com';
    }
    try {
        clearInterval(_clearInterval);
        if (undefined != $) {
            var curHappy = parseInt($('span#currentHappyValue').text());
            var curEnergy = parseInt($('span#currentEnergyValue').text());
            var curNerve = parseInt($('span#currentNerveValue').text());
            _waitSeconds = getShortestCountdown() * 1000;
            if (curNerve > 13) {
                if (new Date().getSeconds() % 2 === 0) {
                    doCrime();
                }
                else {
                    bustSomeone();
                }
            }
            else if (curHappy >= 999) {
                setTimeout('$("a#nav-home.button").click();', 1);
                setTimeout(train, 3000);
            }
        }
        _clearInterval = setInterval(tornMain, _waitSeconds);
        console.log('waiting for: ' + _waitSeconds);
    } catch (e) {
        console.warn(e);
        console.warn('AFTER EXCEPTION waiting for: ' + _waitSeconds);
        _clearInterval = setInterval(tornMain, _waitSeconds);
    }
}

console.log('STATE: ' + document.readyState + ' : ' + new Date());
if (window.location.hostname === 'apps.facebook.com') {
    setInterval(function () { window.location = 'http://facebook.torn.com' }, 5000);
}
else {
    console.log('done waiting. waitSeconds is: ' + _waitSeconds);
    _clearInterval = setInterval(tornMain, _waitSeconds);
}
