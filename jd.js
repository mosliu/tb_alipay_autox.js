var height = device.height;
var width = device.width;
console.show();
log("准备启动京东app");
launchJD();
var count = get_money();
while (count != 0) {
    count = get_money();
}

log("运行结束");

function launchJD(){
    app.launchApp("京东");
    desc("浮层活动").waitFor();
    sleep(2000);
    log("浮层活动已找到");
    click(desc("浮层活动").findOne().bounds().centerX(), desc("浮层活动").findOne().bounds().centerY());
    sleep(1000);
    if (desc("浮层活动").exists()) {
        click(desc("浮层活动").findOne().bounds().centerX(), desc("浮层活动").findOne().bounds().centerY());
    }
}

function get_money() {
    var countall = 0
   
    //desc("浮层活动").findOne().click();
    if (desc("浮层活动").exists()) {
        click(desc("浮层活动").findOne().bounds().centerX(), desc("浮层活动").findOne().bounds().centerY());
    }
    textContains("消耗").waitFor();
    log("页面已加载，准备做任务");
    sleep(2000);
    var ch = textContains("消耗").findOne();
    var parent1 = ch.parent();
    for (var i = 0; i < parent1.childCount(); i++) {
        var child = parent1.child(i);
        if (child.text().search("消耗") != -1) {
            if (parent1.child(i + 1).childCount() == 0) {
                parent1.child(i + 1).click();
            } else {
                parent1.child(i + 2).click();
            }
            break;
        }
    }
    sleep(2000);
    log("开始【浏览并关注8s】任务");
    while (textContains("浏览并关注8s").exists()) {
        var tens = textContains("浏览并关注8s").findOne();
        var parent = tens.parent();
        var text = parent.child(1).text();
        log(text);
        var num = text.match(/[0-9]+/g);
        //log(num)
        if (num[1] == num[0]) {
            log("浏览并关注已完成")
            break;
        }
        parent.child(3).click();
        countall++;
        var taskTime = randowStartEnd(13000, 15000);
        log("任务随机时间：" + taskTime);
        sleep(taskTime);
        back();
        var stopTime = randowStartEnd(5000, 7000);
        log("任务随机间隔时间：" + stopTime);
        sleep(stopTime);
    }
    log("开始【浏览8s】任务");
    while (textContains("浏览8s").exists()) {
        var tens = textContains("浏览8s").findOne();
        var parent = tens.parent();
        var text = parent.child(1).text()
        countall++;
        log(text)
        var num = text.match(/[0-9]+/g)
        //log(num)
        if (num[1] == num[0]) {
            log("浏览8s已完成")
            break;
        }
        parent.child(3).click();
        var taskTime = randowStartEnd(3000, 5000);
        log("任务随机时间：" + taskTime);
        sleep(taskTime);
        back();
        var stopTime = randowStartEnd(1000, 4000);
        log("任务随机间隔时间：" + stopTime);
        sleep(stopTime);
    }

    log("开始【浏览5个】的任务");
    while (textContains("浏览5个").exists()) {
        var tens = textContains("浏览5个").findOne();
        var parent = tens.parent();
        var text = parent.child(1).text();
        log(text);
        var num = text.match(/[0-9]+/g);
        parent.child(3).click();
        countall++;
        textContains("当前页点击浏览5个商品领汪汪币").waitFor();
        i = 1;
        while (i < 6) {
            //click(width/3,height*2/3);
            sleep(2000);
            var comp = textContains("¥").findOnce(i - 1);
            if (comp != null) {
                click(comp.bounds().centerX(), comp.bounds().centerY())
            } else {
                log("第" + i + "个 商品未找到");
                swipe(width / 2, height / 2, width / 2, height / 3, 500);
                swipe(width / 2, height / 2, width / 2, height / 3, 500);
                comp = textContains("¥").findOnce(i - 3);
                if (comp != null) {
                    click(comp.bounds().centerX(), comp.bounds().centerY())
                } else {
                    break;
                }
            }
            sleep(2000);
            back();
            sleep(800);

            log("已浏览第" + i + "个商品");
            i++;

        }
        back();
        sleep(5000);
    }

    log("开始【浏览可得】的任务");
    while (textContains("浏览可得").exists()) {
        var tens = textContains("浏览可得").findOne();
        var parent = tens.parent();
        var text = parent.child(1).text();
        log(text);
        var num = text.match(/[0-9]+/g);
        //log(num)
        if (num[1] == num[0]) {
            log("浏览并关注已完成")
            break;
        }
        parent.child(3).click();
        countall++;
        var taskTime = randowStartEnd(13000, 15000);
        log("任务随机时间：" + taskTime);
        sleep(taskTime);
        back();
        var stopTime = randowStartEnd(5000, 7000);
        log("任务随机间隔时间：" + stopTime);
        sleep(stopTime);
    }

    log("开始【浏览入会】的任务");
    while (textContains("成功入会并浏览").exists()) {
        var tens = textContains("成功入会并浏览").findOne();
        var parent = tens.parent();
        var text = parent.child(1).text();
        log(text);
        var num = text.match(/[0-9]+/g);
        //log(num)
        if (num[1] == num[0]) {
            log("浏览并关注已完成")
            break;
        }
        parent.child(3).click();
        countall++;
        var taskTime = randowStartEnd(13000, 15000);
        log("任务随机时间：" + taskTime);
        sleep(taskTime);
        back();
        var stopTime = randowStartEnd(5000, 7000);
        log("任务随机间隔时间：" + stopTime);
        sleep(stopTime);
    }
    return countall;
}

function randowStartEnd(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
}