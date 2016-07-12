/// <reference path="./include.d.ts" />

var async = require('async');
var request = require('request');

var list = [];
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');
list.push('http://www.google.com');



var concurrencyCount = 0;
var fs = require('fs');

function simpleGet(url, callback) {
    request.get(url, {}, function (err, resp, body) {
        if (err) console.log(err);
        console.log('One page is fetched');
        fs.appendFileSync('concu.txt', 'one page \r\n');
        concurrencyCount++;
        console.log('Running concurrency', concurrencyCount);
        setTimeout(function () {
            concurrencyCount--;
            callback(null);
        }, 10000);

    });
}

async.mapLimit(list, 2, function(url, callback) {
    simpleGet(url, callback);
}, function(err, result) {
    if(err) console.log(err);
})