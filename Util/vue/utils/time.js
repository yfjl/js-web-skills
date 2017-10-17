

export const timeUtil={parseTime:function(format,timeStamp){var date=new Date(timeStamp||Date.now()),o={"M+":date.getMonth()+1,"D+":date.getDate(),"h+":date.getHours(),"m+":date.getMinutes(),"s+":date.getSeconds(),"S":date.getMilliseconds()},format=format||"YYYY-MM-DD hh:mm:ss";if(/(Y+)/.test(format)){format=format.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length))}for(var k in o){if(new RegExp("("+k+")").test(format)){format=format.replace(RegExp.$1,RegExp.$1.length==1?o[k]:("00"+o[k]).substr((""+o[k]).length))}}return format},getTimeShow:function(time_str){var now=new Date();var date=new Date(time_str);var inter=parseInt((now.getTime()-date.getTime())/1000/60);if(inter==0){return"刚刚"}else{if(inter<60){return inter.toString()+"分钟前"}else{if(inter<60*24){return parseInt(inter/60).toString()+"小时前"}else{if(now.getFullYear()==date.getFullYear()){return this.parseTime("MM-DD hh:mm:ss",time_str)}else{return this.parseTime("YY-MM-DD hh:mm:ss",time_str)}}}}}};

    var now = new Date();                    //当前日期
    var nowDayOfWeek = now.getDay();         //今天本周的第几天
    var nowDay = now.getDate();              //当前日
    var nowMonth = now.getMonth();           //当前月
    var nowYear = now.getYear();             //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;  //


/*
* 获得某月的天数,nowMonth = now.getMonth(); 
*/
export const getMonthDays=(myMonth)=>{
        var monthStartDate = new Date(nowYear, myMonth, 1);
        var monthEndDate = new Date(nowYear, myMonth + 1, 1);
        var   days   =   (monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);
        return   days;
    }

//按国内习惯，周一才是第一天，周日才是最后一天 来计算的：
/*
* format 例如 'YYYY-MM-DD hh:mm:ss'
*/
export const getWeekStartDate =(format='YYYY-MM-DD')=>{
  return timeUtil.parseTime(format,new Date(nowYear, nowMonth, nowDay - nowDayOfWeek +1))
}

/*
* format 例如 'YYYY-MM-DD hh:mm:ss'
*/
export const getTodayDate =(format='YYYY-MM-DD')=>{
  return timeUtil.parseTime(format,new Date(nowYear, nowMonth, nowDay))
}

/*
* format 例如 'YYYY-MM-DD hh:mm:ss'
*/
export const getTomorrowDate =(format='YYYY-MM-DD')=>{
  return timeUtil.parseTime(format,new Date(nowYear, nowMonth, nowDay +1))
}

/*
* format 例如 'YYYY-MM-DD hh:mm:ss'
*/
export const getWeekEndDate =(format='YYYY-MM-DD')=>{
  return timeUtil.parseTime(format,new Date(nowYear, nowMonth, nowDay - nowDayOfWeek +7))
}

/*
* 周末两天 format 例如 'YYYY-MM-DD hh:mm:ss'
*/
export const getWeekendDateArray =(format='YYYY-MM-DD')=>{
  return [timeUtil.parseTime(format,new Date(nowYear, nowMonth, nowDay - nowDayOfWeek +6)),timeUtil.parseTime(format,new Date(nowYear, nowMonth, nowDay - nowDayOfWeek +7))]
}

/*
* format 例如 'YYYY-MM-DD hh:mm:ss'
*/
export const getMonthStartDate =(format='YYYY-MM-DD')=>{
  return timeUtil.parseTime(format,new Date(nowYear, nowMonth, 1))
}

/*
* format 例如 'YYYY-MM-DD hh:mm:ss'
*/
export const getMonthEndDate =(format='YYYY-MM-DD')=>{
  return timeUtil.parseTime(format,new Date(nowYear, nowMonth, getMonthDays(nowMonth)))
}

