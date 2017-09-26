     /**
     * 微博爬虫 大V监控
     * @author bajian
     * @begin 2017-08-14  
     */

const puppeteer = require('puppeteer');
const httpUtil=require('./utils/httpUtil.js');
const appConfig = require('./conf/app.js');
timeUtil = require('./utils/timeUtil.js');

var log = {
 log:function(){
   console.log(timeUtil.parseTime(),arguments);
 }
};


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // await page.goto('https://www.baidu.com/');
  await page.goto('http://weibo.com/yanglinke');
  page.setCookie({
    url:'http://weibo.com/yanglinke',
    
    name:'SINAGLOBAL',
    value:'5244859165737.37.1484915419883',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'UM_distinctid',
    value:'15b3cccae5999-08e6106dd54cd4-3e64430f-1fa400-15b3cccae5a579',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'UOR',
    value:'bbs.sdbeta.com,widget.weibo.com,baike.baidu.com',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'SCF',
    value:'AllLFTCby-OpdW1_Lc9UGM7nchRhNFFymBASVkUHEyJ2A6f7v6b0zOBDopNW6z5f3xUVxfmffOjUbS6NGpAtwAU.',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'SUB',
    value:'_2A250vls6DeRhGeVM6lAR9C_Fwj-IHXVXysvyrDV8PUNbmtBeLVCikW-Mjqk13XBkrWxlfbvd2uj5p_emAA..',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'SUBP',
    value:'0033WrSXqPxfM725Ws9jqgMF55529P9D9W5rc3Isl1AReuMsZqU3HxDb5JpX5KMhUgL.FoeEeKz7Sh241Ke2dJLoI7UbqgDDqg4R',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'SUHB',
    value:'0qjEHfcmK49ozE',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'ALF',
    value:'1536909033',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'SSOLoginState',
    value:'1505373034',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'YF-Page-G0',
    value:'5c7144e56a57a456abed1d1511ad79e8',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'YF-V5-G0',
    value:'c948c7abbe2dbb5da556924587966312',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'_s_tentry',
    value:'-',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'Apache',
    value:'6503564523349.081.1505379529565',
  },{
    url:'http://weibo.com/yanglinke',
    
    name:'ULV',
    value:'1505379529575:155:10:4:6503564523349.081.1505379529565:1505360881296',
  }
  ).catch((e)=>{
    console.error(e);
})

  var urls=[
  'http://weibo.com/zhaodong1982',
  'http://weibo.com/yanglinke',
  'http://weibo.com/bylixiaolai',
  'http://weibo.com/MyBitcoin',
  'http://weibo.com/u/5941645212',
  
  ]

  setInterval(async()=>{
    for (var i = 0; i < urls.length; i++) {
    let url=urls[i]
    console.log('url====>',url);
    let suffix='?is_all=1';
    await page.goto(url+suffix);

    var SfFeArticleList = await page.evaluate(() => {
        var list = [...document.querySelectorAll('[action-type="feed_list_item"]')]
        list=list.map(el => {
          var content=el.querySelector('[node-type="feed_list_content"]')
          var time=el.querySelector('[node-type="feed_list_item_date"]')
            return {
              content: content && content['innerText'] || '',
              mid: el.getAttribute('mid'),
              time: time && time['innerText'] || ''
            }
        })

        var username= document.querySelector('.username')

        return {
          username: username && username['innerText'] || '',
          list:list
        }
    }).catch(function(e){
      console.log('catch',e);
    })
  console.log('SfFeArticleList',SfFeArticleList);
  SfFeArticleList && SfFeArticleList.list.length && sendTpCheckServer(url,JSON.stringify(SfFeArticleList))
  }

}, appConfig.interval_time);
  // browser.close();
  // await page.goto('http://weibo.com/yanglinke?is_all=1');
  // await page.goto('http://weibo.com/yanglinke?retcode=6102&is_hot=1');
  // await page.pdf({path: 'hn.pdf', format: 'A4'});

  //TODO ASYNC FOREACH

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
  browser.close();
});
  
})();


function sendTpCheckServer(url,fields){
      var opts = {
        hostname: appConfig.laravel_host,
        path: appConfig.weibo_path
      },
      postData = {
        fields:fields,
        url:url,
      };
      httpUtil.http_request(opts,postData,function(data){
        log.log(postData,data)
      },function(err){
        log.log(err,'error')
      });
    }



