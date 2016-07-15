/// <reference path="./include.d.ts" />
var request = require('request');
var fs = require('fs');
var config = require('./config.js');
var cheerio = require('cheerio');
var async = require('async');
var events = require('events');

var loginHar = {

    "headersSize": 2118,
    "postData": {
        "params": [{
            "name": "csrfmiddlewaretoken",
            "value": "wKKrg0NH75dTF7bELQipaChYjLn1yxH0"
        },
            {
                "name": "next",
                "value": "/dashboard/home/"
            },
            {
                "name": "username",
                "value": "47542216@qq.com"
            },
            {
                "name": "password",
                "value": "lc799110"
            }],
        "mimeType": "application/x-www-form-urlencoded"
				},
				"queryString": [],
				"headers": [{
        "name": "Host",
        "value": "www.appannie.com"
				},
        {
            "name": "Connection",
            "value": "keep-alive"
        },
        {
            "name": "Content-Length",
            "value": "125"
        },
        {
            "name": "Cache-Control",
            "value": "max-age=0"
        },
        {
            "name": "Origin",
            "value": "https://www.appannie.com"
        },
        {
            "name": "Upgrade-Insecure-Requests",
            "value": "1"
        },
        {
            "name": "User-Agent",
            "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36"
        },
        {
            "name": "Content-Type",
            "value": "application/x-www-form-urlencoded"
        },
        {
            "name": "Accept",
            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        },
        {
            "name": "Referer",
            "value": "https://www.appannie.com/account/login/?_ref=header"
        },
        {
            "name": "Accept-Encoding",
            "value": "gzip, deflate, br"
        },
        {
            "name": "Accept-Language",
            "value": "zh-CN,zh;q=0.8"
        },
        {
            "name": "Cookie",
            "value": "optimizelyEndUserId=oeu1467206493195r0.1558665343310237; __distillery=ecf0886_0e75e81f-5293-40a6-985a-c604893e82ab-583baf66d-df8ddc1201c8-edb9; km_lv=x; welcome_carousel=1; __atuvc=2%7C27; km_ai=lvchao358%40tom.com; km_ni=lvchao358%40tom.com; django_language=zh-cn; sessionId=\".eJxrYKotZNQI5S9OLS7OzM-LT81LTMpJTfFmChVIzEktKolPzkhNzo4vycxNLWRKTkksSQUxueCMQuZQLvYH7Dy8HObsMw4mF1SWVHHFh4Y4cxWyaAYVsrYFFbKFcuQk5qWXJqanRjAxMDAk54Vyl-QXx5cWgAxJKWTvLNUDAOHmLBg:1bMxQl:QHasc7PlLQxsXvylW3srKBSI4Yo\"; _gat_UA-2339266-6=1; aa_language=cn; optimizelySegments=%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D; optimizelyBuckets=%7B%7D; _bizo_bzid=2f4c03f6-2b27-40b4-a11f-da39719485b4; _bizo_cksm=9CA53D0963C20796; _ga=GA1.2.1202253760.1468053240; _bizo_np_stats=; _ceg.s=oa7dsl; _ceg.u=oa7dsl; _hp2_ses_props.3646280627=%7B%22r%22%3A%22https%3A%2F%2Fwww.appannie.com%2Fcn%2F%22%2C%22ts%22%3A1468328765832%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Faccount%2Flogin%2F%22%7D; _hp2_id.3646280627=4504681538234984.3447204408292642.8820947456126921; kvcd=1468328856107; km_uq=1468328856%20%2Fe%3FViewed%2520URL%3Dhttps%253A%252F%252Fwww.appannie.com%252Faccount%252Flogin%252F%253F_ref%253Dheader%26Referrer%3Dhttps%253A%252F%252Fwww.appannie.com%252Fcn%252F%26_n%3DPage%2520View%26_k%3D5c5209f8faaba26dba3e49f32e2cbde43d1b7e7b%26_p%3Dlvchao358%2540tom.com%26_t%3D1468328856; km_vs=1; csrftoken=wKKrg0NH75dTF7bELQipaChYjLn1yxH0"
        }],
				"bodySize": 125,
				"url": "https://www.appannie.com/account/login/",
				"cookies": [{
        "name": "optimizelyEndUserId",
        "value": "oeu1467206493195r0.1558665343310237"
				},
        {
            "name": "__distillery",
            "value": "ecf0886_0e75e81f-5293-40a6-985a-c604893e82ab-583baf66d-df8ddc1201c8-edb9"
        },
        {
            "name": "km_lv",
            "value": "x"
        },
        {
            "name": "welcome_carousel",
            "value": "1"
        },
        {
            "name": "__atuvc",
            "value": "2%7C27"
        },
        {
            "name": "km_ai",
            "value": "lvchao358%40tom.com"
        },
        {
            "name": "km_ni",
            "value": "lvchao358%40tom.com"
        },
        {
            "name": "django_language",
            "value": "zh-cn"
        },
        {
            "name": "sessionId",
            "value": "\".eJxrYKotZNQI5S9OLS7OzM-LT81LTMpJTfFmChVIzEktKolPzkhNzo4vycxNLWRKTkksSQUxueCMQuZQLvYH7Dy8HObsMw4mF1SWVHHFh4Y4cxWyaAYVsrYFFbKFcuQk5qWXJqanRjAxMDAk54Vyl-QXx5cWgAxJKWTvLNUDAOHmLBg:1bMxQl:QHasc7PlLQxsXvylW3srKBSI4Yo\""
        },
        {
            "name": "_gat_UA-2339266-6",
            "value": "1"
        },
        {
            "name": "aa_language",
            "value": "cn"
        },
        {
            "name": "optimizelySegments",
            "value": "%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D"
        },
        {
            "name": "optimizelyBuckets",
            "value": "%7B%7D"
        },
        {
            "name": "_bizo_bzid",
            "value": "2f4c03f6-2b27-40b4-a11f-da39719485b4"
        },
        {
            "name": "_bizo_cksm",
            "value": "9CA53D0963C20796"
        },
        {
            "name": "_ga",
            "value": "GA1.2.1202253760.1468053240"
        },
        {
            "name": "_bizo_np_stats",
            "value": ""
        },
        {
            "name": "_ceg.s",
            "value": "oa7dsl"
        },
        {
            "name": "_ceg.u",
            "value": "oa7dsl"
        },
        {
            "name": "_hp2_ses_props.3646280627",
            "value": "%7B%22r%22%3A%22https%3A%2F%2Fwww.appannie.com%2Fcn%2F%22%2C%22ts%22%3A1468328765832%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Faccount%2Flogin%2F%22%7D"
        },
        {
            "name": "_hp2_id.3646280627",
            "value": "4504681538234984.3447204408292642.8820947456126921"
        },
        {
            "name": "kvcd",
            "value": "1468328856107"
        },
        {
            "name": "km_uq",
            "value": "1468328856%20%2Fe%3FViewed%2520URL%3Dhttps%253A%252F%252Fwww.appannie.com%252Faccount%252Flogin%252F%253F_ref%253Dheader%26Referrer%3Dhttps%253A%252F%252Fwww.appannie.com%252Fcn%252F%26_n%3DPage%2520View%26_k%3D5c5209f8faaba26dba3e49f32e2cbde43d1b7e7b%26_p%3Dlvchao358%2540tom.com%26_t%3D1468328856"
        },
        {
            "name": "km_vs",
            "value": "1"
        },
        {
            "name": "csrftoken",
            "value": "wKKrg0NH75dTF7bELQipaChYjLn1yxH0"
        }],
				"method": "POST",
				"httpVersion": "HTTP/1.1"

}

request({ har: loginHar, gzip: true }, function (err, resp, body) 　{
    if (err) console.log(err);

    console.log(body);
    var c = [];
    var cookieArray = resp.headers['set-cookie'];
    for (var i in cookieArray) {
        c.push(cookieArray[i].split(';'));
    }

    var cookie = c.join('; ');

    var homehar = {

        "postData": {
            "text": "",
            "mimeType": ""
        },
        "queryString": [],
        "headers": [{
            "name": "Host",
            "value": "www.appannie.com"
        },
            {
                "name": "Connection",
                "value": "keep-alive"
            },
            {
                "name": "Cache-Control",
                "value": "max-age=0"
            },
            {
                "name": "Upgrade-Insecure-Requests",
                "value": "1"
            },
            {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36"
            },
            {
                "name": "Accept",
                "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
            },
            {
                "name": "Referer",
                "value": "https://www.appannie.com/account/login/?next=/dashboard/home/"
            },
            {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, sdch, br"
            },
            {
                "name": "Accept-Language",
                "value": "zh-CN,zh;q=0.8"
            },
            {
                "name": "Cookie",
                "value": cookie
            }],
        "url": "https://www.appannie.com/dashboard/home/",
        "method": "GET",
        "httpVersion": "HTTP/1.1"
    }

    request({ har: homehar, gzip: true }, function (err, resp, body) {
        for (var i in resp.headers) {
            console.log(i + ' :' + resp.headers[i]);
        }
        fs.appendFileSync('home.html', body);
    });

});