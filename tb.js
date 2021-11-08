var height = device.height;
var width = device.width;
console.show();
log("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release);

killOthersAlive();

startTaoBao()
doTasks();

function startTaoBao() {
    currentApp = currentPackage();
    if (currentApp != "com.taobao.taobao") {
        log("准备启动淘宝app");
        app.launchApp("淘宝");
        sleep(1000);
    } else {
        log("已在淘宝中");
    }

    if (textContains("天猫双十一喵糖总动员").exists() || textContains("做任务赢奖励").exists()) {
        log("当前已经在喵糖总动员界面内")
    } else {
        if (currentActivity() === "com.taobao.tao.TBMainActivity") {
            // log("当前应该在首页,进入双11任务");
        } else {
            {
                log("当前不在首页，请手动退出至首页")
                text("领淘金币").waitFor();
            }
        }
        if (text("领淘金币").exists()) {
            log("当前应该在首页,进入双11任务");
            var y = text("领淘金币").findOne().bounds().bottom;
            click(width * 1 / 3, y + height / 5);
        }
        textContains("天猫双十一喵糖总动员").waitFor();
    }

    log("淘宝页面已加载");
}

function doTasks() {
    log("准备执行任务");
    if (textContains("做任务赢奖励").exists()) {
        //可以直接开始任务
    } else {
        text("赚糖领红包").findOne().click();
        sleep(1000);
        textContains("做任务赢奖励").waitFor();
        log("打开了任务界面")
        sleep(1000);
    }
    var cycleTaskCount = 1;
    while (cycleTaskCount > 0) {
        cycleTaskCount = 0;
        if (textContains("每日签到领喵糖").exists()) {
            log("存在每日签到领喵糖")
            var node = textContains("每日签到领喵糖").findOne();
            var status = node.parent().parent().child(1);
            if (status != null && status.text() === "去完成") {
                log("执行每日签到领喵糖");
                node.click();
                sleep(randowStartEnd(1000, 2000));
                cycleTaskCount++;
            }
            sleep(randowStartEnd(100, 3000));
        }

        cycleTaskCount += finishMainTitleTask("逛逛天猫主会场");

        cycleTaskCount += finishMainTitleTask("逛逛金币小镇");

        if (textContains("浏览天天领现金").exists()) {

            var node = textContains("浏览天天领现金").findOne();
            var status = node.parent().parent().child(1);
            if (status != null && status.text() === "去完成") {
                log("执行浏览天天领现金");
                node.click();
                cycleTaskCount++;
                var dk = textContains("打开链接").findOne(3000);
                if (dk != null) {
                    dk.click();
                }
                sleep(randowStartEnd(300, 2000));
                allwc();
                back();
                sleep(randowStartEnd(1500, 4000));
            }
            sleep(randowStartEnd(100, 3000));
        }

        cycleTaskCount += finishSubTitleTask("浏览15秒立得");
        cycleTaskCount += finishSubTitleTask("浏览15s立得");
        cycleTaskCount += finishSubTitleTask("浏览15秒得");
        cycleTaskCount += finishSubTitleTask("浏览15s得");

        while (text("去浏览").exists()) {
            log("存在去浏览")
            var btn = text("去浏览").findOne();
            log("执行去浏览:" + btn.parent().child(0).child(0).text());
            btn.click();
            cycleTaskCount++;
            allwc();
            var startSleepTime = randowStartEnd(300, 2000);
            console.log("开始随机间隔时间：" + startSleepTime);
            sleep(startSleepTime);
            checkAndBack();
            var endSleepTime = randowStartEnd(1500, 4000)
            console.log("结束随机间隔时间：" + endSleepTime);
            sleep(endSleepTime);
        }
        // sleep(randowStartEnd(100, 3000));
    }

    log("任务结束");
}

function clickIfExists(keyText) {
    if (text(keyText).exists()) {
        text(keyText).findOne().click();
    }
}

/**
 * 主title的task
 */
function finishMainTitleTask(keyText) {
    if (textContains(keyText).exists()) {
        log("存在：" + keyText);
        var node = textContains(keyText).findOne();
        var status = node.parent().parent().child(1);
        if (status != null && status.text() === "去完成") {
            log("执行" + keyText);
            node.click();
            allwc();
            sleep(randowStartEnd(300, 2000));
            checkAndBack();
            sleep(randowStartEnd(1500, 3000));
            return 1;
        }
        sleep(randowStartEnd(100, 3000));
    }
    return 0;

}
/**
 * 副title的task
 */
function finishSubTitleTask(keyText) {

    if (textContains(keyText).exists()) {
        log("存在：" + keyText);
        var btn = textContains(keyText).findOne();

        var status = btn.parent().parent().parent().child(1);
        if (status != null && status.text() === "去完成") {
            log("执行" + keyText + ":" + btn.parent().parent().child(0).text());
            btn.click();
            allwc();
            sleep(randowStartEnd(300, 2000));
            checkAndBack();
            sleep(randowStartEnd(1500, 3000));
            return 1;
        }
    }
    return 0;
}

function checkAndBack() {
    if (text("残忍离开").exists()) {
        text("残忍离开").findOne().click();
        sleep(randowStartEnd(500, 1000));
    }
    back();

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
            var sleepTime = randowStartEnd(17000, 23000)
            log("直播，随机等待时间：" + sleepTime);
            sleep(sleepTime);
        } else if (i > 18) {
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

function floatW() {
    //悬浮窗不会自动关闭
    setInterval(() => {}, 1000);
    w.setPosition(0, height - 800);
    w.setSize(400, 300);
    //悬浮窗可调整大小
    w.setAdjustEnabled(true);
    //退出悬浮窗即结束脚本
    //w.exitOnClose();
    //长按悬浮窗内文字结束脚本
    w.text.longClick(() => {
        //取消屏幕常亮
        device.cancelKeepingAwake();
        toast("检测到长按悬浮窗文字，脚本终止");
        //try...catch把exit()函数的异常捕捉，则脚本不会立即停止，仍会运行几行后再停止
        try {
            exit();
        } catch (err) {}
        //直接exit()的话坚持不到return的时候
        return true;
    });
}