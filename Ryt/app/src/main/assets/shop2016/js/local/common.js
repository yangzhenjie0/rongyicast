/**
 * Created by Administrator on 2016/5/31 0031.
 */
/**
 * 发送ajax请求的通用方法
 * @param url  请求路径
 * @param data  请求参数对象(json格式)
 * @param success  请求成功的回调
 * @param error   请求失败的回调
 * @param requestType 请求类型 （get post）
 */
function ajaxRequest(url, param, success, error, requestType) {
    if (typeof requestType == "undefined") {
        requestType = "get";
    }
    $.ajax({
        type: requestType,
        url: url,
        cache: false,
        dataType: "json",
        data: param,
        success: success,
        error: error,
    });
}
//Dateformat
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//获得天数字符串
function getDayNums(times) {
    return parseInt(times / 1000 / 3600 / 24);
}
//获得月份字符串
function getDateStr(times) {
    var date = new Date();
    date.setTime(times);
    return date.format("MM月dd日");
}

function getDateFormatStr(times, format) {
    var date = new Date();
    date.setTime(times);
    return date.format(format);
}
//获得时间字符串
function getTimeStr(times) {
    var date = new Date();
    date.setTime(times);
    return date.format("hh:mm");
}
//异步请求处理模板
function ajaxSuccessFunctionTemplage(dataDealFunction, data, callback, dealError, callbackParam) {
    switch (data["resultCode"]) {
        case "0" :
            dataDealFunction(data);
            if (typeof callback == "function") {
                callback(callbackParam);
            }
            break;
        default :
            if (typeof dealError == "function") {
                dealError(data);
            }
            break;
    }
}
//app服务端接口返回数据处理模板
function appInterfaceReturnDataCheck(data) {
    if (data["resultCode"] == 0) {
        return true;
    } else {
        console.log(data);
        console.log("数据获取失败");
    }
}
//从新计算tabContainor的高度
function tabsHeight() {
    var $container = $('#tabs-container'),
        h = $('#tabs-container').find('.swiper-slide-active').height();
    // console.log(h)
    $('.com-nav').css({'height': h + 49 + 'px'});
}
//处理用户手机号
function dealUsername(str, frontLen, endLen) {
    var len = str.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
        xing += '*';
    }
    return str.substr(0, frontLen) + xing + str.substr(str.length - endLen);
}

//初始化网页的初始分页信息
var pageEntity = {
    pageSize: 10,
    pageIndex: 1
};


//刷新分页信息
function refreshPageEntity() {
    pageEntity.pageSize = 10;  //每页中包含多少数据
    pageEntity.pageIndex = 1; //当前属于第几页
}

var loadDataAction = function () {
    console.log("bottom");
}     //需要加载数据时候的action

var swiperContainerOption = {};             //swiper插件使用的配置对象

var hostName = ""; //域名对象

var RequestUrl = {};//接口对象

//跳转到协议
function redirectProtocol() {
    console.log("协议跳转");
    window.demo1.auctionProtocol();
}

function createSignmsg(requestParam) {
    var paramNameList = [];
    for (var key in requestParam) {
        paramNameList.push(key);
    }
    paramNameList = paramNameList.sort();
    var msg = "";
    for (var i = 0; i < paramNameList.length; i++) {
        var key = paramNameList[i];
        msg += key + "=" + requestParam[key] + "&";
    }
    msg += "key=BL2QEuXUXNoGbNeHObD4EzlX+KuGc70U"
    return $.md5(msg);
}

function dealRequestParam(requestParam) {
    //筛选参数
    //设置签名
    //设置时间戳
    var paramResult = {};
    for (var key in requestParam) {
        if (requestParam[key] != null && requestParam[key] != "" && typeof requestParam[key] != "undefined") {
            paramResult[key] = requestParam[key];
        }
    }
    paramResult.timestamp = new Date().getTime();
    paramResult.signmsg = createSignmsg(paramResult);
    return paramResult;
}

function timeEnd() {
    // 从新加载页面数据
    initPage(PageVariable.param.artWorkId, PageVariable.param.currentUserId, PageVariable.param.signmsg, PageVariable.param.timestamp)
}

function countDown(timestamp) {
    var time_start = new Date().getTime(); //设定当前时间
    var time_end = new Date(timestamp).getTime(); //设定目标时间
    // 计算时间差
    var time_distance = time_end - time_start;

    if (time_distance < 0) {
        timeEnd();
    } else {
        // 时
        var int_hour = Math.floor(time_distance / 3600000)
        time_distance -= int_hour * 3600000;
        // 分
        var int_minute = Math.floor(time_distance / 60000)
        time_distance -= int_minute * 60000;
        // 秒
        var int_second = Math.floor(time_distance / 1000)
        // 时分秒为单数时、前面加零
        if (int_hour < 10) {
            int_hour = "0" + int_hour;
        }
        if (int_minute < 10) {
            int_minute = "0" + int_minute;
        }
        if (int_second < 10) {
            int_second = "0" + int_second;
        }
        // 显示时间
        $("#hh").html(int_hour);
        $("#mm").html(int_minute);
        $("#ss").html(int_second);
        // 设置定时器
        setTimeout(function () {
            countDown(timestamp)
        }, 1000);
    }
}

function generateDOTTemplateResult(templateId, data) {
    var viewFunction = doT.template($("#" + templateId).text())
    var text = viewFunction(data);
    return text;
}


var Template = {
    artWorkDetail: "artWorkDetail",
    artWorkBaseInfoMain: "artWorkBaseInfoMain",
    artWorkBaseInfoPicture: "artWorkBaseInfoPicture",
    artWorkScheduleInvest: "artWorkScheduleInvest",
    artWorkScheduleCreate: "artWorkScheduleCreate",
    artWorkScheduleMessage: "artWorkScheduleMessage",
    artWorkScheduleAuction: "artWorkScheduleAuction",
    artWorkComment: "artWorkComment",
    artWorkInvestRecordTop: "artWorkInvestRecordTop",
    artWorkInvestRecordList: "artWorkInvestRecordList",
    artWorkBaseInfoAuctionMessage: "artWorkBaseInfoAuctionMessage",
    artWorkAuctionBiddingTop: "artWorkAuctionBiddingTop",
    artWorkAuctionWinner: "artWorkAuctionWinner",
    artWorkScheduleAuctionResult: "artWorkScheduleAuctionResult",
    artWorkAuctionBidding: "artWorkAuctionBidding",
    preBottomButton: "preBottomButton",
    beingBottomButton: "beingBottomButton",
    afterBottomButton: "afterBottomButton"
}   //模板对应的模块


/*function createMessageComment(messageId) {
    var artWorkId = getParamObject()["artWorkId"];
    var currentUserId = getCurrentUserId();
    redirectComment(artWorkId, currentUserId, messageId);
}


function submitComment(commentid, messageid) {
    var comment = {};
    var message = {};
    var artWorkId = getParamObject()["artWorkId"];
    var currentUserId = getCurrentUserId();
    if (commentid != null && typeof commentid != "undefined") {
        if (typeof PageVariable.commentMap[commentid] != "undefined") {
            comment = PageVariable.commentMap[commentid];
        } else {
            for (var i = 0; i < PageVariable.artWorkComment.commentList.length; i++) {
                var commentTemp = PageVariable.artWorkComment.commentList[i];
                PageVariable.commentMap[commentTemp.id] = commentTemp;
            }
            comment = PageVariable.commentMap[commentid];
        }
    } else {
        commentid = "";
    }
    if (messageid != null && typeof messageid != "undefined") {

        if (typeof PageVariable.messageMap[messageid] != "undefined") {
            message = PageVariable.messageMap[messageid];
        } else {
            for (var i = 0; i < PageVariable.artWorkProject.messageList.length; i++) {
                var messageTemp = PageVariable.artWorkProject.messageList[i];
                PageVariable.messageMap[messageTemp.id] = messageTemp;
            }
            message = PageVariable.messageMap[messageid];
        }
    } else {
        messageid = "";
    }
    var creatorName = "";
    if (comment != null && typeof comment != "undefined" && typeof comment.creator != "undefined" && comment.creator != null) {
        creatorName = comment.creator.name;
    }
    redirectComment(artWorkId, currentUserId, commentid, messageid, creatorName);

}*/
function createMessageComment(messageId) {
    var artWorkId = getParamObject()["artWorkId"];
    var currentUserId = getCurrentUserId();
    var commentid;
    var creatorName;
    redirectComment(artWorkId, currentUserId, messageId, commentid, creatorName);
}

function submitComment(commentid, messageid) {
    var comment = {};
    var message = {};
    var artWorkId = getParamObject()["artWorkId"];
    var currentUserId = getCurrentUserId();
    if (commentid != null && typeof commentid != "undefined") {
        if (typeof PageVariable.commentMap[commentid] != "undefined") {
            comment = PageVariable.commentMap[commentid];
        } else {
            for (var i = 0; i < PageVariable.artWorkComment.commentList.length; i++) {
                var commentTemp = PageVariable.artWorkComment.commentList[i];
                PageVariable.commentMap[commentTemp.id] = commentTemp;
            }
            comment = PageVariable.commentMap[commentid];
        }
    } else {
        commentid = "";
    }
    if (messageid != null && typeof messageid != "undefined") {

        if (typeof PageVariable.messageMap[messageid] != "undefined") {
            message = PageVariable.messageMap[messageid];
        } else {
            for (var i = 0; i < PageVariable.artWorkProject.messageList.length; i++) {
                var messageTemp = PageVariable.artWorkProject.messageList[i];
                PageVariable.messageMap[messageTemp.id] = messageTemp;
            }
            message = PageVariable.messageMap[messageid];
        }
    } else {
        messageid = "";
    }
    var creatorName = "";
    if (comment != null && typeof comment != "undefined" && typeof comment.creator != "undefined" && comment.creator != null) {
        creatorName = comment.creator.name;
    }
     redirectComment(artWorkId, currentUserId, messageid, commentid, creatorName);

}
function getParamObject() {
    PageVariable.param.agent = "h5"
        return PageVariable.param;
    //return {artWorkId: "ipeulrut2z8gf2s0", currentUserId: "imhfp1yr4636pj49", agent: "h5",artWorkOrderId:"123"}
}


