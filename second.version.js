/// <reference path="./include.d.ts" />
var request = require('request');
var fs = require('fs');
var config = require('./config.js');

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
 * define login har
 */
var loginHar = {
    url: 'https://www.appannie.com/account/login/',
    method: 'POST',
    postData: {
        "params": [{
            "name": "csrfmiddlewaretoken",
            "value": "sopF5B5rNSIjNb24PBMC80ZPetMsoSjZ"
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
    headers: [{
        "name": "Host",
        "value": "www.appannie.com"
				},
        {
            "name": "Connection",
            "value": "keep-alive"
        },
        {
            "name": "Content-Length",
            "value": "127"
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
            "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
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
            "value": "km_lv=x; optimizelyEndUserId=oeu1467167446742r0.551292649479252; __distillery=4772024_388ca390-cd07-4210-a574-7776b8b268bc-5432af370-083f0e01b1d3-8326; welcome_carousel=1; optimizelySegments=%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D; optimizelyBuckets=%7B%7D; django_language=zh-cn; __atuvc=8%7C26%2C37%7C27; __atuvs=577f3962e1d01762003; _gat_UA-2339266-6=1; km_ai=jetlyu%40aliyun.com; km_ni=jetlyu%40aliyun.com; aa_language=cn; csrftoken=sopF5B5rNSIjNb24PBMC80ZPetMsoSjZ; sessionId=\".eJxrYKotZNQI5S9OLS7OzM-LT81LTMpJTSlk8mYMFUjMSS0qiU_OSE3Oji_JzE1NTkksSQUxuOCMQuZQLvZNjIwMYJBcUFlSxRUfGuLMVciiGVTI2hZUyFaqBwCwhh9j:1bLOmH:KLEZI1olSNICP5YIeTT4Ow9H3mg\"; _hp2_ses_props.3646280627=%7B%22ts%22%3A1467954392930%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Fdashboard%2Fhome%2F%22%7D; _hp2_id.3646280627=2139846051771833.4713080163059184.3152835834310691; _ceg.s=o9zf6k; _ceg.u=o9zf6k; _bizo_bzid=2ec87d88-e925-4deb-8456-7ca5dc15645f; _bizo_cksm=66CDA39DE6084E48; kvcd=1467957407125; km_vs=1; km_uq=; _bizo_np_stats=6256%3D1592%2C14%3D1956%2C6256%3D1961%2C; _ga=GA1.2.310534370.1467162140"
        }],
}

/**
 * login request
 */
var loginRequestConfig = {
    method: 'POST',
    uri: 'https://www.appannie.com/account/login/',
    har: loginHar
};

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

/**
 * main logic
 */
// var request = request.defaults({ 'proxy': 'http://localhost:8888' });

request(loginRequestConfig, function (loginError, loginResponse, loginBody) {
    // var loginSetCookie = loginResponse.headers['set-cookie'].toString();
    var loginSetCookie = "";

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
        {
            "name": "Connection",
            "value": "keep-alive"
        },
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
            "value" : loginSetCookie
            // "value": "km_lv=x; optimizelyEndUserId=oeu1467167446742r0.551292649479252; __distillery=4772024_388ca390-cd07-4210-a574-7776b8b268bc-5432af370-083f0e01b1d3-8326; welcome_carousel=1; optimizelySegments=%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D; optimizelyBuckets=%7B%7D; django_language=zh-cn; aa_language=cn; _gat_UA-2339266-6=1; sessionId=\".eJxNjb1qAkEURnXjT1wVNXUaO20Wa8tYJWIK8dbD3ZkLDq6zO3vvGAwEUgV8kLyVRRrfIwgqdofDd_i-oy9fHcGAidnmrqCSLQs5OUD34hQLljKvQFdhkLUKTKWy5u007VSgdx2RwzQjM4-ghmzNO7QlZxUKg0LGRwd4uqtT1BtyBiYflKLDbC9Wc4Ja58FJMkOmV8fk2Ird0SI3lL1cij5mVIrSa9IbJXZL-nxwhvgG_gHi5l_zsfE8bB1_dbGXz1jBahb72njp6z9L3wjJPw0wWiQ:1bLPH7:OZgocRzlGXnfI9xl3GmKKT2uoFU\"; csrftoken=sopF5B5rNSIjNb24PBMC80ZPetMsoSjZ; aa_user_token=\".eJxrYKotZNQI5SxNLqmIz0gszihkClUwtUw2SLNMM002NUk0sLAwTbIwtzC1SLRISTMwSbY0MgwVik8sLcmILy1OLYpPSkzOTs1LKWQONShPTUrMS8ypLMlMLtZLTE7OL80r0XNOLE71zCtOzSvOLMksS_XNT0nNcYLqYQnlRTIpM6WQ1eupFQ9DqR4Aoukziw:1bLPHw:nKzGRjHDyUhFsGr5fVXYjdovax0\"; _ga=GA1.2.310534370.1467162140; _hp2_ses_props.3646280627=%7B%22r%22%3A%22https%3A%2F%2Fwww.appannie.com%2Faccount%2Flogin%2F%3F_ref%3Dheader%22%2C%22ts%22%3A1467959309964%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Fdashboard%2Fhome%2F%22%7D; _hp2_id.3646280627=2139846051771833.6540047916869432.4613344314507759; __atuvc=8%7C26%2C39%7C27; __atuvs=577f4830dad9eaed001; _ceg.s=o9zgp9; _ceg.u=o9zgp9; _bizo_bzid=2ec87d88-e925-4deb-8456-7ca5dc15645f; _bizo_cksm=66CDA39DE6084E48; _bizo_np_stats=6256%3D423%2C14%3D1442%2C; kvcd=1467959374580; km_ai=jetlyu%40aliyun.com; km_ni=jetlyu%40aliyun.com; km_vs=1; km_uq="
        }],
    "bodySize": 0,
    // "url": "http://www.appannie.com/apps/appletv/top-table/" + date + "-" + country.code + "-" + category.code + "/?p=1-&h=8&iap=",
    "url": "http://www.appannie.com/apps/appletv/top-table/20160707-US-36/?p=1-&h=23&iap=",
    "cookies": [{
        "name": "km_lv",
        "value": "x"
    },
        {
            "name": "optimizelyEndUserId",
            "value": "oeu1467167446742r0.551292649479252"
        },
        {
            "name": "__distillery",
            "value": "4772024_388ca390-cd07-4210-a574-7776b8b268bc-5432af370-083f0e01b1d3-8326"
        },
        {
            "name": "welcome_carousel",
            "value": "1"
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
            "name": "django_language",
            "value": "zh-cn"
        },
        {
            "name": "aa_language",
            "value": "cn"
        },
        {
            "name": "_gat_UA-2339266-6",
            "value": "1"
        },
        {
            "name": "sessionId",
            "value": "\".eJxNjb1qAkEURnXjT1wVNXUaO20Wa8tYJWIK8dbD3ZkLDq6zO3vvGAwEUgV8kLyVRRrfIwgqdofDd_i-oy9fHcGAidnmrqCSLQs5OUD34hQLljKvQFdhkLUKTKWy5u007VSgdx2RwzQjM4-ghmzNO7QlZxUKg0LGRwd4uqtT1BtyBiYflKLDbC9Wc4Ja58FJMkOmV8fk2Ird0SI3lL1cij5mVIrSa9IbJXZL-nxwhvgG_gHi5l_zsfE8bB1_dbGXz1jBahb72njp6z9L3wjJPw0wWiQ:1bLPH7:OZgocRzlGXnfI9xl3GmKKT2uoFU\""
        },
        {
            "name": "csrftoken",
            "value": "sopF5B5rNSIjNb24PBMC80ZPetMsoSjZ"
        },
        {
            "name": "aa_user_token",
            "value": "\".eJxrYKotZNQI5SxNLqmIz0gszihkClUwtUw2SLNMM002NUk0sLAwTbIwtzC1SLRISTMwSbY0MgwVik8sLcmILy1OLYpPSkzOTs1LKWQONShPTUrMS8ypLMlMLtZLTE7OL80r0XNOLE71zCtOzSvOLMksS_XNT0nNcYLqYQnlRTIpM6WQ1eupFQ9DqR4Aoukziw:1bLPHw:nKzGRjHDyUhFsGr5fVXYjdovax0\""
        },
        {
            "name": "_ga",
            "value": "GA1.2.310534370.1467162140"
        },
        {
            "name": "_hp2_ses_props.3646280627",
            "value": "%7B%22r%22%3A%22https%3A%2F%2Fwww.appannie.com%2Faccount%2Flogin%2F%3F_ref%3Dheader%22%2C%22ts%22%3A1467959309964%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Fdashboard%2Fhome%2F%22%7D"
        },
        {
            "name": "_hp2_id.3646280627",
            "value": "2139846051771833.6540047916869432.4613344314507759"
        },
        {
            "name": "__atuvc",
            "value": "8%7C26%2C39%7C27"
        },
        {
            "name": "__atuvs",
            "value": "577f4830dad9eaed001"
        },
        {
            "name": "_ceg.s",
            "value": "o9zgp9"
        },
        {
            "name": "_ceg.u",
            "value": "o9zgp9"
        },
        {
            "name": "_bizo_bzid",
            "value": "2ec87d88-e925-4deb-8456-7ca5dc15645f"
        },
        {
            "name": "_bizo_cksm",
            "value": "66CDA39DE6084E48"
        },
        {
            "name": "_bizo_np_stats",
            "value": "6256%3D423%2C14%3D1442%2C"
        },
        {
            "name": "kvcd",
            "value": "1467959374580"
        },
        {
            "name": "km_ai",
            "value": "jetlyu%40aliyun.com"
        },
        {
            "name": "km_ni",
            "value": "jetlyu%40aliyun.com"
        },
        {
            "name": "km_vs",
            "value": "1"
        },
        {
            "name": "km_uq",
            "value": ""
        }],
    "method": "GET",
    "httpVersion": "HTTP/1.1"
}



var fetchRequestConfig = {
    // uri: "http://www.appannie.com/apps/appletv/top-table/" + date + "-" + country.code + "-" + category.code + "/?p=1-&h=8&iap=",
    url: "http://www.appannie.com/apps/appletv/top-table/20160707-US-36/?p=1-&h=23&iap=",
    method: 'GET',
    har: fetchHar,
    gzip: true
}

// console.log('acceesing ' + "https://www.appannie.com/apps/appletv/top-table/" + date + "-" + country.code + "-" + category.code + "/?p=1-&h=8&iap=");

request(fetchRequestConfig, function (fetchError, fetchResponse, fetchBody) {
    if (fetchError) {
        console.log(fetchError);
    }
   
    // console.log(typeof fetchBody);
    // fs.appendFileSync('response.txt', fetchBody);
    // for(var i in fetchResponse.headers) {
    // fetchResponse.
    // fs.appendFileSync('response.txt', i + ' : ' + fetchResponse.headers[i] + '\r\n');
    // }             
});


});









// request(loginRequestConfig, function (loginError, loginResponse, loginBody) {
//     // var loginSetCookie = loginResponse.headers['set-cookie'].toString();

//     dates.forEach(function (date, dateIndex, dateArray) {
//         countries.forEach(function (country, countryIndex, countryArray) {
//             categories.forEach(function (category, categoryIndex, categoryArray) {
//                 var fetchHar = {
//                     "headersSize": 2171,
//                     "postData": {
//                         "text": "",
//                         "mimeType": ""
//                     },
//                     "queryString": [{
//                         "name": "p",
//                         "value": "2-"
//                     },
//                         {
//                             "name": "h",
//                             "value": "23"
//                         },
//                         {
//                             "name": "iap",
//                             "value": ""
//                         }],
//                     "headers": [{
//                         "name": "Host",
//                         "value": "www.appannie.com"
//                     },
//                         {
//                             "name": "Connection",
//                             "value": "keep-alive"
//                         },
//                         {
//                             "name": "Accept",
//                             "value": "*/*"
//                         },
//                         {
//                             "name": "X-NewRelic-ID",
//                             "value": "VwcPUFJXGwEBUlJSDgc="
//                         },
//                         {
//                             "name": "X-Requested-With",
//                             "value": "XMLHttpRequest"
//                         },
//                         {
//                             "name": "User-Agent",
//                             "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
//                         },
//                         {
//                             "name": "Referer",
//                             "value": "https://www.appannie.com/apps/appletv/top-chart/united-states/overall/"
//                         },
//                         {
//                             "name": "Accept-Encoding",
//                             "value": "gzip, deflate, sdch, br"
//                         },
//                         {
//                             "name": "Accept-Language",
//                             "value": "zh-CN,zh;q=0.8"
//                         },
//                         {
//                             "name": "Cookie",
//                             "value": "km_lv=x; optimizelyEndUserId=oeu1467167446742r0.551292649479252; __distillery=4772024_388ca390-cd07-4210-a574-7776b8b268bc-5432af370-083f0e01b1d3-8326; welcome_carousel=1; optimizelySegments=%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D; optimizelyBuckets=%7B%7D; django_language=zh-cn; aa_language=cn; _gat_UA-2339266-6=1; sessionId=\".eJxNjb1qAkEURnXjT1wVNXUaO20Wa8tYJWIK8dbD3ZkLDq6zO3vvGAwEUgV8kLyVRRrfIwgqdofDd_i-oy9fHcGAidnmrqCSLQs5OUD34hQLljKvQFdhkLUKTKWy5u007VSgdx2RwzQjM4-ghmzNO7QlZxUKg0LGRwd4uqtT1BtyBiYflKLDbC9Wc4Ja58FJMkOmV8fk2Ird0SI3lL1cij5mVIrSa9IbJXZL-nxwhvgG_gHi5l_zsfE8bB1_dbGXz1jBahb72njp6z9L3wjJPw0wWiQ:1bLPH7:OZgocRzlGXnfI9xl3GmKKT2uoFU\"; csrftoken=sopF5B5rNSIjNb24PBMC80ZPetMsoSjZ; aa_user_token=\".eJxrYKotZNQI5SxNLqmIz0gszihkClUwtUw2SLNMM002NUk0sLAwTbIwtzC1SLRISTMwSbY0MgwVik8sLcmILy1OLYpPSkzOTs1LKWQONShPTUrMS8ypLMlMLtZLTE7OL80r0XNOLE71zCtOzSvOLMksS_XNT0nNcYLqYQnlRTIpM6WQ1eupFQ9DqR4Aoukziw:1bLPHw:nKzGRjHDyUhFsGr5fVXYjdovax0\"; _ga=GA1.2.310534370.1467162140; _hp2_ses_props.3646280627=%7B%22r%22%3A%22https%3A%2F%2Fwww.appannie.com%2Faccount%2Flogin%2F%3F_ref%3Dheader%22%2C%22ts%22%3A1467959309964%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Fdashboard%2Fhome%2F%22%7D; _hp2_id.3646280627=2139846051771833.6540047916869432.4613344314507759; __atuvc=8%7C26%2C39%7C27; __atuvs=577f4830dad9eaed001; _ceg.s=o9zgp9; _ceg.u=o9zgp9; _bizo_bzid=2ec87d88-e925-4deb-8456-7ca5dc15645f; _bizo_cksm=66CDA39DE6084E48; _bizo_np_stats=6256%3D423%2C14%3D1442%2C; kvcd=1467959374580; km_ai=jetlyu%40aliyun.com; km_ni=jetlyu%40aliyun.com; km_vs=1; km_uq="
//                         }],
//                     "bodySize": 0,
//                     "url": "http://www.appannie.com/apps/appletv/top-table/" + date + "-" + country.code + "-" + category.code + "/?p=1-&h=8&iap=",
//                     "cookies": [{
//                         "name": "km_lv",
//                         "value": "x"
//                     },
//                         {
//                             "name": "optimizelyEndUserId",
//                             "value": "oeu1467167446742r0.551292649479252"
//                         },
//                         {
//                             "name": "__distillery",
//                             "value": "4772024_388ca390-cd07-4210-a574-7776b8b268bc-5432af370-083f0e01b1d3-8326"
//                         },
//                         {
//                             "name": "welcome_carousel",
//                             "value": "1"
//                         },
//                         {
//                             "name": "optimizelySegments",
//                             "value": "%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D"
//                         },
//                         {
//                             "name": "optimizelyBuckets",
//                             "value": "%7B%7D"
//                         },
//                         {
//                             "name": "django_language",
//                             "value": "zh-cn"
//                         },
//                         {
//                             "name": "aa_language",
//                             "value": "cn"
//                         },
//                         {
//                             "name": "_gat_UA-2339266-6",
//                             "value": "1"
//                         },
//                         {
//                             "name": "sessionId",
//                             "value": "\".eJxNjb1qAkEURnXjT1wVNXUaO20Wa8tYJWIK8dbD3ZkLDq6zO3vvGAwEUgV8kLyVRRrfIwgqdofDd_i-oy9fHcGAidnmrqCSLQs5OUD34hQLljKvQFdhkLUKTKWy5u007VSgdx2RwzQjM4-ghmzNO7QlZxUKg0LGRwd4uqtT1BtyBiYflKLDbC9Wc4Ja58FJMkOmV8fk2Ird0SI3lL1cij5mVIrSa9IbJXZL-nxwhvgG_gHi5l_zsfE8bB1_dbGXz1jBahb72njp6z9L3wjJPw0wWiQ:1bLPH7:OZgocRzlGXnfI9xl3GmKKT2uoFU\""
//                         },
//                         {
//                             "name": "csrftoken",
//                             "value": "sopF5B5rNSIjNb24PBMC80ZPetMsoSjZ"
//                         },
//                         {
//                             "name": "aa_user_token",
//                             "value": "\".eJxrYKotZNQI5SxNLqmIz0gszihkClUwtUw2SLNMM002NUk0sLAwTbIwtzC1SLRISTMwSbY0MgwVik8sLcmILy1OLYpPSkzOTs1LKWQONShPTUrMS8ypLMlMLtZLTE7OL80r0XNOLE71zCtOzSvOLMksS_XNT0nNcYLqYQnlRTIpM6WQ1eupFQ9DqR4Aoukziw:1bLPHw:nKzGRjHDyUhFsGr5fVXYjdovax0\""
//                         },
//                         {
//                             "name": "_ga",
//                             "value": "GA1.2.310534370.1467162140"
//                         },
//                         {
//                             "name": "_hp2_ses_props.3646280627",
//                             "value": "%7B%22r%22%3A%22https%3A%2F%2Fwww.appannie.com%2Faccount%2Flogin%2F%3F_ref%3Dheader%22%2C%22ts%22%3A1467959309964%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Fdashboard%2Fhome%2F%22%7D"
//                         },
//                         {
//                             "name": "_hp2_id.3646280627",
//                             "value": "2139846051771833.6540047916869432.4613344314507759"
//                         },
//                         {
//                             "name": "__atuvc",
//                             "value": "8%7C26%2C39%7C27"
//                         },
//                         {
//                             "name": "__atuvs",
//                             "value": "577f4830dad9eaed001"
//                         },
//                         {
//                             "name": "_ceg.s",
//                             "value": "o9zgp9"
//                         },
//                         {
//                             "name": "_ceg.u",
//                             "value": "o9zgp9"
//                         },
//                         {
//                             "name": "_bizo_bzid",
//                             "value": "2ec87d88-e925-4deb-8456-7ca5dc15645f"
//                         },
//                         {
//                             "name": "_bizo_cksm",
//                             "value": "66CDA39DE6084E48"
//                         },
//                         {
//                             "name": "_bizo_np_stats",
//                             "value": "6256%3D423%2C14%3D1442%2C"
//                         },
//                         {
//                             "name": "kvcd",
//                             "value": "1467959374580"
//                         },
//                         {
//                             "name": "km_ai",
//                             "value": "jetlyu%40aliyun.com"
//                         },
//                         {
//                             "name": "km_ni",
//                             "value": "jetlyu%40aliyun.com"
//                         },
//                         {
//                             "name": "km_vs",
//                             "value": "1"
//                         },
//                         {
//                             "name": "km_uq",
//                             "value": ""
//                         }],
//                     "method": "GET",
//                     "httpVersion": "HTTP/1.1"
//                 }



//                 var fetchRequestConfig = {
//                     uri: "http://www.appannie.com/apps/appletv/top-table/" + date + "-" + country.code + "-" + category.code + "/?p=1-&h=8&iap=",
//                     method: 'GET',
//                     har: fetchHar
//                 }

//                 // console.log('acceesing ' + "https://www.appannie.com/apps/appletv/top-table/" + date + "-" + country.code + "-" + category.code + "/?p=1-&h=8&iap=");

//                 request(fetchRequestConfig, function (fetchError, fetchResponse, fetchBody) {
//                     if(fetchError) {
//                         console.log(fetchError);
//                     }
//                     fs.appendFileSync('response.txt', fetchBody);
//                     // console.log(typeof fetchBody);
//                     // fs.appendFileSync('response.txt', fetchBody);
//                     // for(var i in fetchResponse.headers) {
//                     // fetchResponse.
//                     // fs.appendFileSync('response.txt', i + ' : ' + fetchResponse.headers[i] + '\r\n');
//                     // }             
//                 });
//             });
//         });
//     });

// });


