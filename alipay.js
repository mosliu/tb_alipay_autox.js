var height = device.height;
var width = device.width;
console.show();
log("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release);
killOthersAlive()

currentApp = currentPackage();
if (currentApp != "com.eg.android.AlipayGphone") {
    log("准备启动支付宝app");
    app.launchApp("支付宝");
    sleep(1000);
} else {
    log("已在支付宝中");
}

log("请手工进入支付宝喵糖总动员");
doTasks();



function doTasks() {
    textContains("已经打开赚喵糖任务面板").waitFor();
    log("打开了任务界面");
    sleep(1000);

    if (textContains("签到得喵糖").exists()) {
        var node = textContains("签到得喵糖").findOne();
        node.click();
        sleep(randowStartEnd(1500, 2500));
    } else {
        log("没有签到得喵糖，可能已经完成了签到");
    }

    while (textMatches(/逛一逛.*可以去完成/).exists()) {
        var node = textMatches(/逛一逛.*可以去完成/).findOne();
        node.click();
        sleep(randowStartEnd(20000, 30000));
        back();
        sleep(randowStartEnd(1000, 2000));
        if (textContains("开心收下").exists()) {
            textContains("开心收下").findOne().click();
            sleep(randowStartEnd(1000, 2000));
        }
    }
    if (!textMatches(/逛一逛.*可以去完成/).exists()) {
        log("没有了逛一逛任务");
    }
    if (textContains("浏览3个会场可得1个喵糖").exists()) {
        log("检查会场浏览任务")
        if (!textContains("今日喵糖已得，可继续浏览").exists()) {
            log("会场浏览任务未结束");
            var i = 0;
            //外卖到家
            i = checkAndVisit(i, "双11全场外卖嗨抢 点击可以去逛逛");
            i = checkAndVisit(i, "去商家服务赚更多奖励 点击可以去逛逛");
            //会员会场
            i = checkAndVisit(i, "积分好物5折起兑 点击可以去逛逛");
            //特色会场
            i = checkAndVisit(i, "领券寄件5折起");
            //保险会场
            i = checkAndVisit(i, "蚂蚁保双11有好礼");
            //民生会场
            i = checkAndVisit(i, "抽信用卡还款券");
            //旅行会场
            i = checkAndVisit(i, "抢500元机票券");
        }
    }

    log("任务结束");
}

function checkAndVisit(i, text) {
    if (textContains("今日喵糖已得，可继续浏览").exists()) {
        log("检查发现浏览会场已完成");
        return 3;
    }
    if (i < 3 && textContains(text).exists()) {
        // log("发现" + text)
        var node = textContains(text).findOne();
        var checkVisit = node.parent().child(0).child(0);
        if (checkVisit != null) {
            if (checkVisit.text().indexOf("今日已浏览") == -1) {
                node.click();
                sleep(randowStartEnd(18000, 24000));
                back();
                i++;
                sleep(randowStartEnd(1000, 3000));
            } else {

            }
        } else {
            log("未发现会场名");
        }
    } else {
        log("i 为" + i + "," + text + " 未找到")
    }
    return i;
}

function allwc() {
    var i = 1;
    while (i) {
        sleep(1000);
        i++;
        if (textContains("已发放").exists())
            i = 0;
        else if (descContains("已发放").exists())
            i = 0;
        else if (idContains("taolive").exists()) {
            i = 0;
            var sleepTime = randowStartEnd(20000, 27000)
            log("直播，随机等待时间：" + sleepTime);
            sleep(sleepTime);
        } else if (i > 20) {
            i = 0;
        }

    }
}

function randowStartEnd(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
}

function killOthersAlive() {
    log("终止其他正在运行的脚本")
    //获取全部正在运行的脚本引擎
    var allEngines = engines.all();
    //log(allEngines);
    for (var i = 0; i < allEngines.length; i++) {
        //停掉除了本脚本以外的正在运行的脚本
        if (allEngines[i] != engines.myEngine()) {
            allEngines[i].forceStop();
        }
    }
}