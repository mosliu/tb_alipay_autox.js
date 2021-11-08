var uas = [
    Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US),
    Mozilla/5.0 (compatible; MSIE 10.0; Macintosh; Intel Mac OS X 10_7_3; Trident/6.0),
    Opera/9.80 (X11; Linux i686; U; ru) Presto/2.8.131 Version/11.11,
    Mozilla/5.0 (Macintosh; PPC Mac OS X 10_9_1; rv:1.9.2.20) Gecko/2016-12-13 00:29:52 Firefox/4.0,
    Mozilla/5.0 (Windows; U; Windows 98) AppleWebKit/531.46.5 (KHTML, like Gecko) Version/4.0 Safari/531.46.5,
    Mozilla/5.0 (Windows NT 6.1) AppleWebKit/5362 (KHTML, like Gecko) Chrome/60.0.850.0 Safari/5362,
    Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/4.0; InfoPath.2; SV1; .NET CLR 2.0.50727; WOW64),
    Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0,
    Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36
]

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


function fetchSend(id,uid,csrf,shareid) {
    fetch(https://cloud.tencent.com/developer/services/ajax/column/article?action=ToggleArticleLike&uin=+uid+&csrfCode=+csrf, { // post请求
        method,POST,
        headers,{
            Content-Type,application/json
        },
        body,'{action:ToggleArticleLike,payload:{articleId:' + id + ',like:1}}'
    });
    fetch(https://cloud.tencent.com/developer/services/ajax/column/article?action=ToggleArticleFavor&uin=+uid+&csrfCode=+csrf, { // post请求
        method,POST,
        headers,{
            Content-Type,application/json
        },
        body,'{action:ToggleArticleFavor,payload:{articleId:' + id + ',like:1}}'
    });
    // var payloadJson = {
    //     action,ToggleArticleFavor,
    //     payload,{
    //         articleId,1718986,
    //         like,1
    //     },
    //     method,GET
    // }
    var data = {
        url,'https://cloud.tencent.com/developer/article/'+id+'?sharedUid='+shareid,
        // payloadJson,JSON.stringify(payloadJson)
    }
    // var headers = new Headers({'content-type','application/json'})
    // headers.append(Content-Type, application/json);
    // var options = {
    //     method,'POST',
    //     mode,'no-cors',
    //     headers,headers,
    //     body,JSON.stringify(data)
    // }
    fetch(data.url);
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

var initPos = 1717986

async function main() {
    for (var i = 0; i < 25; i++) {
        var next = initPos + getRandomIntInclusive(20, 4000);
        console.log(处理 + next);
        // fetchSend(next,100002247729,987469994,1076660);
        fetchSend(next,830319,2017599634,1057267);
        await sleep(3000);
    }
}
main();


// function fetch2() {
//     // fetch('https://cloud.tencent.com/developer/services/ajax/grocery-stall?action=bet&uin=830319&csrfCode=178739233', { // post请求
//     fetch('https://cloud.tencent.com/developer/services/ajax/grocery-stall?action=bet&uin=100002247729&csrfCode=1772924127', { // post请求
//         method,POST,
//         headers,{
//             Content-Type,application/json
//         },
//         body,'{action:bet,payload:{}}'
//     });
// }

// function sleep(time) {
//     return new Promise((resolve) => setTimeout(resolve, time));
// }

// async function main() {
//     for (var i = 0; i < 100; i++) {
//         fetch2();
//         await sleep(2000);
//     }
// }
// main();