// var height = device.height;
// var width = device.width;
// console.show();
// log("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release);

// back();
// sleep(300);
// log(currentActivity());
// log(textContains("返回").exists())
// log(textMatches(/逛一逛.*可以去完成/).exists())
// log(textContains("双11全场外卖嗨抢 点击可以去逛逛").exists())
// log(textContains("浏览3个会场").exists())
// textContains("浏览3个会场").findOne().child;
// printNode(textContains("数字会场").findOne().parent(),1);
// log(text("残忍离开").exists())
// text("残忍离开").findOne().click();
// log(textContains("每日签到领喵糖").exists());

// var reg = /逛一逛.*可以去完成/;
// log(textMatches(reg).exists())
// log(textMatches(reg).findOne())

// var c = textContains("浏览15s立得").exists()
// log(c)
// // textContains("打开链接").findOne().click()
// log(textContains("浏览15s立得").findOne().parent().parent().child(0).text())
// log(textContains("浏览15s立得").findOne().parent().parent().parent().child(1).text())
// var c = textContains("逛逛天猫主会场").exists()
// log(c)
// var c = textContains("去浏览").findOne().parent().child(0).child(0).text()
// log(c)
var g = textContains("双11全场外卖嗨抢 点击可以去逛逛").findOne();
log(g.parent().child(0).child(0).text().indexOf("今日已浏览") != -1);
// var p = g.parent().child(0).child(0);
// printNode(p,1);
// var aa = p.child(1)
// log(aa.text())
// // log(p)

function printNode(node, i) {
    var sep = "----";
    for (var j = 0; j < i; j++) {
        sep += "--";
    }
    log(sep);
    if (node.childCount() == 0) {
        log(node);
    } else {
        i += 2;
        node.children().forEach(function (child) {
            printNode(child,i)
        });
    }
    log(sep.replace(/-/g,"="));
}