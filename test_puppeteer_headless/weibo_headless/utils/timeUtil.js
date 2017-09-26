exports = module.exports=timeUtil={
      parseTime:function (format,timeStamp) {
      //format可空，默认YYYY-MM-DD hh:mm:ss，timeStamp可空，默认当前时间
      //timeUtil.parseTime('YYYY-MM-DD hh:mm:ss',new Date().getTime()) ->"2016-08-03 16:14:12"
      if ((timeStamp+'').length==10) {
        timeStamp=timeStamp*1000
    }
        var date = new Date(timeStamp||Date.now()),
        o = { 
            'M+' : date.getMonth() + 1, //month 
            'D+' : date.getDate(), //day 
            'h+' : date.getHours(), //hour 
            'm+' : date.getMinutes(), //minute 
            's+' : date.getSeconds(), //second 
            'S' : date.getMilliseconds() //millisecond 
        },
        format=format||'YYYY-MM-DD hh:mm:ss';

        if(/(Y+)/.test(format)) {
            format = format.replace(RegExp.$1, 
                (date.getFullYear() + '').substr(4 - RegExp.$1.length)); 
        } 

        for(var k in o) { 
            if (new RegExp('('+ k +')').test(format)) { 
                format = format.replace(RegExp.$1, 
                    RegExp.$1.length == 1 ? o[k] : ('00'+ o[k]).substr((''+ o[k]).length)); 
            } 
        }
        return format; 
    },
    getTimeShow:function(time_str){
            var now = new Date();
            var date = new Date(time_str);
            //计算时间间隔，单位为分钟
            var inter = parseInt((now.getTime() - date.getTime())/1000/60);
            if(inter == 0){
                return "刚刚";
            }
            //多少分钟前
            else if(inter < 60){
                return inter.toString() + "分钟前";
            }
            //多少小时前
            else if(inter < 60*24){
                return parseInt(inter/60).toString() + "小时前";
            }
            //本年度内，日期不同，取日期+时间  格式如  06-13 22:11
            else if(now.getFullYear() == date.getFullYear()){
                return this.parseTime('MM-DD hh:mm:ss',time_str);
            }
            else{
                return this.parseTime('YY-MM-DD hh:mm:ss',time_str);
            }
        }
    };