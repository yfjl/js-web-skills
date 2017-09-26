var api = require('../config/api.js');
const toastlib = require('../templates/toast/toast.js');
const sheetlib = require('../templates/action_sheet/action_sheet.js');

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const timeUtil = {
  parseTime: function (format, timeStamp) {//format可空，默认YYYY-MM-DD hh:mm:ss，timeStamp可空，默认当前时间
    //timeUtil.parseTime('YYYY-MM-DD hh:mm:ss',new Date().getTime()) ->"2016-08-03 16:14:12"
    if ((timeStamp + '').length == 10) {
      timeStamp = timeStamp * 1000
    }
    var date = new Date(timeStamp || Date.now()),
      o = {
        'M+': date.getMonth() + 1, //month 
        'D+': date.getDate(), //day 
        'h+': date.getHours(), //hour 
        'm+': date.getMinutes(), //minute 
        's+': date.getSeconds(), //second 
        'S': date.getMilliseconds() //millisecond 
      },
      format = format || 'YYYY-MM-DD hh:mm:ss';

    if (/(Y+)/.test(format)) {
      format = format.replace(RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return format;
  },
  getTimeShow: function (time_str) {
    var now = new Date();
    var date = new Date(time_str);//兼容性问题'-'=>'/'
    //计算时间间隔，单位为分钟
    var inter = parseInt((now.getTime() - date.getTime()) / 1000 / 60);
    if (inter == 0) {
      return "刚刚";
    }
    //多少分钟前
    else if (inter < 60) {
      return inter.toString() + "分钟前";
    }
    //多少小时前
    else if (inter < 60 * 24) {
      return parseInt(inter / 60).toString() + "小时前";
    }
    //本年度内，日期不同，取日期+时间  格式如  06-13 22:11
    else if (now.getFullYear() == date.getFullYear()) {
      return this.parseTime('MM-DD hh:mm:ss', time_str);
    }
    else {
      return this.parseTime('YY-MM-DD hh:mm:ss', time_str);
    }
  }
};

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function toast(obj) {
  toastlib.showToast(obj)
}

function showActionSheet(obj) {
  sheetlib.showActionSheet(obj)
}

function loginByWX(){

  let code = null;
  return new Promise(function (resolve, reject) {
    return login().then((res) => {
      code = res.code;
      return getUserInfo();
    }).then((userInfo) => {
      console.log(code, userInfo)
      //登录远程服务器
      request(api.xcx_login, { code: code, userInfo: JSON.stringify(userInfo) }, 'POST').then(res => {
        console.log('xcx_login', res, typeof res)
        if (res.code === 0) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data);
          wx.setStorageSync('access_token', res.data.access_token);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    var access_token=wx.getStorageSync('access_token')
    if (access_token){
      data['access_token'] = access_token
    }
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'X-Nideshop-Token': wx.getStorageSync('access_token')
      },
      success: function (res) {
        if (res.statusCode == 200) {

          if (res.data.code == 110) {

            //重新通过openid登录
            loginByWX().then(res => {
              console.log('app loginByWeixin')
              access_token = wx.getStorageSync('access_token')
              if (access_token) {
                data['access_token'] = access_token
              }
              wx.request({
                url: url,
                data: data,
                method: method,
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  // 'X-Nideshop-Token': wx.getStorageSync('access_token')
                },
                success: function (res) {
                  if (res.statusCode == 200) {
                    if (typeof res.data == 'string' && res.data.substr(0, 1) != '{') {
                      res.data = JSON.parse(res.data.substr(res.data.indexOf('{')))
                    }
                    console.log('relogin and request',res)
                    resolve(res.data);
                  } else {
                    reject(res.errMsg);
                  }

                },
                fail: function (err) {

                  reject(err)
                  console.log("failed", err)

                },

              })

            }).catch((res) => {

              if (res.code && res.code == 220) {//注册
                console.log('loginByWeixin to register')
                wx.redirectTo({
                  url: '/pages/user/login'
                })
                return ;
              } else {//登录失败提示
                console.log('loginByWeixin other error', res)
                toast({
                  context: this,
                  content:  "请求失败，请稍后重试"
                })
              }
            });
          } else {
            
            console.log(res.data, url, data)
            if (typeof res.data == 'string' && res.data.substr(0, 1)!='{'){//解决BOM
              res.data = JSON.parse(res.data.substr(res.data.indexOf('{')))
            }
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        
        reject(err)
        console.log("failed")

      },

    })
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}


/**
 * 调用微信登录 返回code
 * 调用接口获取登录凭证（code）进而(服务器)换取用户登录态信息，包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

let extend = function (oldObj, newObj) {
  for (var key in newObj) {
    oldObj[key] = newObj[key];
  }
  return oldObj;
};

module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast,
  checkSession,
  login,
  getUserInfo,
  extend,
  toast,
  timeUtil,
  showActionSheet,
}


