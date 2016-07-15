/// <reference path="./include.d.ts" />
var request = require('request');
var fs = require('fs');
var config = require('./config.js');
var cheerio = require('cheerio');
var async = require('async');
var events = require('events');

/**
 * proxy
 */
// request = request.defaults({ 'proxy': 'http://127.0.0.1:2099' });

/**
 * Date extension
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * private function`
 */
function __arrayContainsStr(array, str) {
    for (var i in array) {
        if (array[i] === str) {
            return true;
        }
    }
    return false;
}

/**
 * define login har
 */
var loginHar = {

    // "headersSize": 2118,
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
                "value": config.basic.username
            },
            {
                "name": "password",
                "value": config.basic.password
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
        // {
        //     "name": "Content-Length",
        //     "value": "125"
        // },
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



/**
 * load configuration
 */
var countries = config.countries;
var categories = config.cateJson;
var first = config.basic.startDate;
var last = config.basic.endDate;
var f_date = new Date(first);
var l_date = new Date(last);
if (new Date().getTimezoneOffset() > 0) {
    f_date.setDate(f_date.getDate() + 1);
    l_date.setDate(l_date.getDate() + 1);
}
var dates = [];
while (f_date <= l_date) {
    dates.push(f_date.Format('yyyyMMdd'));
    f_date.setDate(f_date.getDate() + 1);
}
var sqlbase = 'insert into app_rank (app_id, rank, rank_date, rank_type, country, category) values';
var tdMapping = ['Free', 'Paid', 'Grossing'];
var tmStr = new Date().Format('yyyy-MM-dd-hh-mm-ss');
var count = 0;

/**
 * write visited
 */
process.on('exit', function () {
    fs.writeFileSync('visited.txt', visited.join(','));
});


/**
 * main logic
 */

//test code
// dates = ['20160707'];
// countries = [{ name: "angola", code: "AO" }]
// categories = [{ name: "lifestyle", code: "6012" }];

var targets = [];
var emitter = new events.EventEmitter();
emitter.on('run', function () {
    async.mapLimit(targets, 1, function (target, callback) {
        singleRequest(target, callback);
    }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Scraper running without error');
        }
    });
});

var concurrencyCount = 0;
var singleRequest = function (entity, callback) {
    var date = entity.date;
    var country = entity.country;
    var category = entity.category;
    var keyword = entity.keyword;
    var fetchUrl = entity.fetchUrl;
    var fetchRequestConfig = entity.fetchRequestConfig;

    request(fetchRequestConfig, function (fetchError, fetchResponse, fetchBody) {
        if (fetchError) {
            console.log(fetchError);
        }
        // console.log(keyword + ' response get');
        // fs.appendFileSync('resp.txt', fetchBody);
        concurrencyCount++;
        console.log('Running concurrency', concurrencyCount, 'fow now running ', keyword);
        if (fetchBody && (fetchBody.indexOf('<tr') !== -1)) {
            var $ = cheerio.load(fetchBody);
            $('tr').each(function (index, tr) {
                var rank = index + 1;
                $(this).find('td').each(function (tdIndex, td) {
                    if ($(this).attr('class') !== 'empty-cell') {
                        try {
                            var app_id = $(this).find('div div a img').attr('data-src').match(/\d+/i)[0];
                        } catch (appidError) {
                            fs.appendFileSync('error.txt', 'fetchUrl' + '\r\n' + appidError + '\r\n');
                            return;
                        }
                        var rank_type = tdMapping[tdIndex];
                        fs.appendFile('sql/' + tmStr + '.sql', sqlbase + '("' + app_id + '","' + rank + '","' + date + '","' + rank_type + '","' + country.code + '","' + category.name + '");\r\n', { encoding: 'utf-8' }, function (err) {
                            if (err) throw err;
                            visited.push(keyword);
                            if (count % 1000 == 0) {
                                console.log(++count + ' records fetched');
                            }
                        });
                    }
                });
            });
        }
    });
    var delay = parseInt((Math.random() * 10000000) % 3000, 10);
    setTimeout(function () {
        if (concurrencyCount > 0) {
            concurrencyCount--;
        }
        callback(null);
    }, config.basic.delay * 1000);
}


var visited = [];
request({ har: loginHar, gzip: true }, function (err, resp, body) {
    if (err) console.log(err);

    var c = [];
    var cookieArray = resp.headers['set-cookie'];
    for (var i in cookieArray) {
        c.push(cookieArray[i].split(';'));
    }

    var cookie = c.join('; ');

    fs.readFile('visited.txt', function (err, buffer) {
        if (buffer.toString().length > 2) {
            visited = buffer.toString().split(',');
        }

        dates.forEach(function (date, dateIndex, dateArray) {
            countries.forEach(function (country, countryIndex, countryArray) {
                categories.forEach(function (category, categoryIndex, categoryArray) {
                    var keyword = date + "-" + country.code + "-" + category.code;
                    if (!__arrayContainsStr(visited, keyword)) {
                        var fetchUrl = "http://www.appannie.com/apps/appletv/top-table/" + date + "-" + country.code + "-" + category.code + "/?p=1-&h=23&iap=";
                        var fetchHar = {
                            "headersSize": 2171,
                            "postData": {
                                "text": "",
                                "mimeType": ""
                            },
                            "queryString": [{
                                "name": "p",
                                "value": "1-"
                            },
                                {
                                    "name": "h",
                                    "value": "23"
                                },
                                {
                                    "name": "iap",
                                    "value": ""
                                }],
                            "headers": [{
                                "name": "Host",
                                "value": "www.appannie.com"
                            },
                                // {
                                //     "name": "Connection",
                                //     "value": "keep-alive"
                                // },
                                {
                                    "name": "Accept",
                                    "value": "*/*"
                                },
                                {
                                    "name": "X-NewRelic-ID",
                                    "value": "VwcPUFJXGwEBUlJSDgc="
                                },
                                {
                                    "name": "X-Requested-With",
                                    "value": "XMLHttpRequest"
                                },
                                {
                                    "name": "User-Agent",
                                    "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
                                },
                                {
                                    "name": "Referer",
                                    "value": "https://www.appannie.com/apps/appletv/top-chart/united-states/overall/"
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
                                    "value" : cookie
                                    // "value": 'optimizelyEndUserId=oeu1467206493195r0.1558665343310237; __distillery=ecf0886_0e75e81f-5293-40a6-985a-c604893e82ab-583baf66d-df8ddc1201c8-edb9; km_lv=x; aa_language=cn; django_language=zh-cn; sessionId=".eJxNzb9KA0EQgPHz_HPnRTFYW1ooyCF5BFNpsAkO2K1zs0OyZJ3LZmaVCAErwbf0USQgwe5rfnyf5SbtXUEdUWYZZ_xcFkVBAqcOs81dVl654FP5cPFyUsCZsmroxbFgF9lPShhYry4vPRr7bzj_xzqkBYtP-3D7zh0KxrUF0haJ-izWjlH5XpRFg4U3fuw9x7s_cwBDjLwyR3OmhbPwyrRdbKPZRTqEpvqpjuvL0WB0Q8u1fTQOnsZNOrqepuprmurc_gKjpk1v:1bLnq2:5F33nKrIH4sZV163wsuV9maX8e4"; welcome_carousel=1; _gat_UA-2339266-6=1; csrftoken=wKKrg0NH75dTF7bELQipaChYjLn1yxH0; aa_user_token=".eJxrYKotZNQI5SxNLqmIz0gszihkClWwMEu0MDM1N0xKM7WwMDAD8iyNTS2NE9OSLQxMTFKSQoXiE0tLMuJLi1OL4pMSk7NT81IKmUMNylOTEvMScypLMpOL9RKTk_NL80r0nBOLUz3zilPzijNLMstSffNTUnOcoHpYQnmRTMpMKWT1kkngYSjVAwCCwzK4:1bLnvO:EXHyCv85APXK_AO8Ma_x6FcVp2U"; _ga=GA1.2.1202253760.1468053240; _hp2_ses_props.3646280627=%7B%22r%22%3A%22https%3A%2F%2Fwww.appannie.com%2F%22%2C%22ts%22%3A1468053239541%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Faccount%2Flogin%2F%22%7D; _hp2_id.3646280627=4504681538234984.5822777338367332.4397848198473384; _bizo_bzid=2f4c03f6-2b27-40b4-a11f-da39719485b4; _bizo_cksm=5872D0D6ED39E3B5; _ceg.s=oa1hmx; _ceg.u=oa1hmx; __atuvc=2%7C27; __atuvs=5780b982ce513d90001; _bizo_np_stats=14%3D786%2C6256%3D788%2C; kvcd=1468053899125; km_ai=lvchao358%40tom.com; km_ni=lvchao358%40tom.com; km_vs=1; km_uq='
                                }],
                            // "url": "http://www.appannie.com/apps/appletv/top-table/" + date + "-" + country.code + "-" + category.code + "/?p=1-&h=8&iap=",
                            "url": fetchUrl,
                            // "cookies": [{
                            //     "name": "km_lv",
                            //     "value": "x"
                            // },
                            //     {
                            //         "name": "optimizelyEndUserId",
                            //         "value": "oeu1467167446742r0.551292649479252"
                            //     },
                            //     {
                            //         "name": "__distillery",
                            //         "value": "4772024_388ca390-cd07-4210-a574-7776b8b268bc-5432af370-083f0e01b1d3-8326"
                            //     },
                            //     {
                            //         "name": "welcome_carousel",
                            //         "value": "1"
                            //     },
                            //     {
                            //         "name": "optimizelySegments",
                            //         "value": "%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D"
                            //     },
                            //     {
                            //         "name": "optimizelyBuckets",
                            //         "value": "%7B%7D"
                            //     },
                            //     {
                            //         "name": "django_language",
                            //         "value": "zh-cn"
                            //     },
                            //     {
                            //         "name": "aa_language",
                            //         "value": "cn"
                            //     },
                            //     {
                            //         "name": "_gat_UA-2339266-6",
                            //         "value": "1"
                            //     },
                            //     {
                            //         "name": "sessionId",
                            //         "value": "\".eJxNjb1qAkEURnXjT1wVNXUaO20Wa8tYJWIK8dbD3ZkLDq6zO3vvGAwEUgV8kLyVRRrfIwgqdofDd_i-oy9fHcGAidnmrqCSLQs5OUD34hQLljKvQFdhkLUKTKWy5u007VSgdx2RwzQjM4-ghmzNO7QlZxUKg0LGRwd4uqtT1BtyBiYflKLDbC9Wc4Ja58FJMkOmV8fk2Ird0SI3lL1cij5mVIrSa9IbJXZL-nxwhvgG_gHi5l_zsfE8bB1_dbGXz1jBahb72njp6z9L3wjJPw0wWiQ:1bLPH7:OZgocRzlGXnfI9xl3GmKKT2uoFU\""
                            //     },
                            //     {
                            //         "name": "csrftoken",
                            //         "value": "sopF5B5rNSIjNb24PBMC80ZPetMsoSjZ"
                            //     },
                            //     {
                            //         "name": "aa_user_token",
                            //         "value": "\".eJxrYKotZNQI5SxNLqmIz0gszihkClUwtUw2SLNMM002NUk0sLAwTbIwtzC1SLRISTMwSbY0MgwVik8sLcmILy1OLYpPSkzOTs1LKWQONShPTUrMS8ypLMlMLtZLTE7OL80r0XNOLE71zCtOzSvOLMksS_XNT0nNcYLqYQnlRTIpM6WQ1eupFQ9DqR4Aoukziw:1bLPHw:nKzGRjHDyUhFsGr5fVXYjdovax0\""
                            //     },
                            //     {
                            //         "name": "_ga",
                            //         "value": "GA1.2.310534370.1467162140"
                            //     },
                            //     {
                            //         "name": "_hp2_ses_props.3646280627",
                            //         "value": "%7B%22r%22%3A%22https%3A%2F%2Fwww.appannie.com%2Faccount%2Flogin%2F%3F_ref%3Dheader%22%2C%22ts%22%3A1467959309964%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Fdashboard%2Fhome%2F%22%7D"
                            //     },
                            //     {
                            //         "name": "_hp2_id.3646280627",
                            //         "value": "2139846051771833.6540047916869432.4613344314507759"
                            //     },
                            //     {
                            //         "name": "__atuvc",
                            //         "value": "8%7C26%2C39%7C27"
                            //     },
                            //     {
                            //         "name": "__atuvs",
                            //         "value": "577f4830dad9eaed001"
                            //     },
                            //     {
                            //         "name": "_ceg.s",
                            //         "value": "o9zgp9"
                            //     },
                            //     {
                            //         "name": "_ceg.u",
                            //         "value": "o9zgp9"
                            //     },
                            //     {
                            //         "name": "_bizo_bzid",
                            //         "value": "2ec87d88-e925-4deb-8456-7ca5dc15645f"
                            //     },
                            //     {
                            //         "name": "_bizo_cksm",
                            //         "value": "66CDA39DE6084E48"
                            //     },
                            //     {
                            //         "name": "_bizo_np_stats",
                            //         "value": "6256%3D423%2C14%3D1442%2C"
                            //     },
                            //     {
                            //         "name": "kvcd",
                            //         "value": "1467959374580"
                            //     },
                            //     // {
                            //     //     "name": "km_ai",
                            //     //     "value": "jetlyu%40aliyun.com"
                            //     // },
                            //     // {
                            //     //     "name": "km_ni",
                            //     //     "value": "jetlyu%40aliyun.com"
                            //     // },
                            //     {
                            //         "name": "km_vs",
                            //         "value": "1"
                            //     },
                            //     {
                            //         "name": "km_uq",
                            //         "value": ""
                            //     }],
                            "method": "GET",
                            "httpVersion": "HTTP/1.1"
                        }

                        var fetchRequestConfig = {
                            url: fetchUrl,
                            method: 'GET',
                            har: fetchHar,
                            gzip: true
                        }

                        var ent = {
                            date: date,
                            country: country,
                            category: category,
                            keyword: keyword,
                            fetchUrl: fetchUrl,
                            fetchRequestConfig: fetchRequestConfig
                        }

                        targets.push(ent);
                        if ((dateIndex == dates.length - 1) && (countryIndex == countries.length - 1) && (categoryIndex == categories.length - 1)) {
                            console.log('Start processing ...');
                            emitter.emit('run');
                        }
                    }
                });
            });
        });
    });
});