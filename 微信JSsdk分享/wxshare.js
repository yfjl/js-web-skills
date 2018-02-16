$(function(){
			//wx share
	$.post("http://activity.bhx-tech.com/api/v1/wxjs",{
    url:location.href
  },function(data){
  	console.log('wxjs',data);
  	if (data && data.signature) {
      if (wx) {
        // iniWx(data)
        setTimeout(function(){
          iniWx(data)
        }, 1000);
      }else{
        setTimeout(function(){
          iniWx(data)
        }, 5000);
      }
    }else{
    	console.error('wx not here ,',wx)
    }
  }, "json");


function iniWx(data){
  wx && wx.config({
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      ]
    });

  wx && wx.onMenuShareTimeline({

    title: document.title || '微信分享', // 分享标题

    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

    imgUrl: 'http://oy400cdoo.bkt.clouddn.com/bhxcode.jpg', // 分享图标

    success: function () { 

        // 用户确认分享后执行的回调函数

    },

    cancel: function () { 

        // 用户取消分享后执行的回调函数

    }

});

  wx && wx.onMenuShareAppMessage({

    title: document.title || '微信分享', // 分享标题

    desc: document.getElementsByTagName('meta')['description'].content || '', // 分享描述

    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

    imgUrl: 'http://oy400cdoo.bkt.clouddn.com/bhxcode.jpg',// 分享图标

    type: 'link', // 分享类型,music、video或link，不填默认为link

    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

    success: function () { 

        // 用户确认分享后执行的回调函数

    },

    cancel: function () { 

        // 用户取消分享后执行的回调函数

    }

});

  wx && wx.onMenuShareQQ({

    title: document.title || '微信分享', // 分享标题

    desc: document.getElementsByTagName('meta')['description'].content || '', // 分享描述

    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

    imgUrl: 'http://oy400cdoo.bkt.clouddn.com/bhxcode.jpg', // 分享图标

    type: 'link', // 分享类型,music、video或link，不填默认为link

    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

    success: function () { 

        // 用户确认分享后执行的回调函数

    },

    cancel: function () { 

        // 用户取消分享后执行的回调函数

    }

});
  wx && wx.onMenuShareWeibo({

    title: document.title || '微信分享', // 分享标题

    desc: document.getElementsByTagName('meta')['description'].content || '', // 分享描述

    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

    imgUrl: 'http://oy400cdoo.bkt.clouddn.com/bhxcode.jpg', // 分享图标

    type: 'link', // 分享类型,music、video或link，不填默认为link

    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

    success: function () { 

        // 用户确认分享后执行的回调函数

    },

    cancel: function () { 

        // 用户取消分享后执行的回调函数

    }

});
  wx && wx.onMenuShareQZone({

    title: document.title || '微信分享', // 分享标题

    desc: document.getElementsByTagName('meta')['description'].content || '', // 分享描述

    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

    imgUrl: 'http://oy400cdoo.bkt.clouddn.com/bhxcode.jpg', // 分享图标

    type: 'link', // 分享类型,music、video或link，不填默认为link

    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

    success: function () { 

        // 用户确认分享后执行的回调函数

    },

    cancel: function () { 

        // 用户取消分享后执行的回调函数

    }

});

}
	})