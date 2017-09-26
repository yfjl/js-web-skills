
let execute = (context,open) => {
  /* 动画部分 */
  // 第1步：创建动画实例   
  var animation = wx.createAnimation({
    duration: 200,  //动画时长  
    timingFunction: "linear", //线性  
    delay: 0  //0则不延迟  
  });

  // 第2步：这个动画实例赋给当前的动画实例  
  context.animation = animation;


  // 显示抽屉  
  if (open) {
    animation.translateY(-240).step()
    
    context.setData({
      animationDataDrawer: animation,
      showModalStatus: true
    })
  }
  
  // 关闭抽屉
  if (!open) {
    animation.translateY(0).step()
    
    context.setData({
      animationDataDrawer: animation,
    })
    setTimeout(()=>{
      context.setData({
        showModalStatus: false
      })
    },200)
  }
}

function showActionSheet(obj) {
  if (obj.context == null || obj.sheetList == null) {
    console.error("必须传入微信小程序页面的 context 对象, 和 sheetList 的内容");
		return;
	}
  let hideModalCancellBtn = obj.hideModalCancellBtn

  let hideByClickMask = obj.hideByClickMask

	obj.context.setData({
		'showModalStatus': true,
    'sheetList': obj.sheetList,
    hideModalCancellBtn: obj.hideModalCancellBtn,
    hideByClickMask: obj.hideByClickMask,

	});


  obj.context.tapMask = function (e) {
    console.log('tapMask', obj.hideByClickMask)
    if (obj.hideByClickMask){
      execute(obj.context, false)
      typeof obj.onCancel == 'function' && obj.onCancel()
    }
    
  }
  obj.context.tapItem = function (e) {
    console.log('tapItem', e.target.dataset.index)
    if (e.target.dataset.index !=undefined){
      if (e.target.dataset.index == 'cancel'){
        obj.context.tapMask()
      }else{

        execute(obj.context, false)
        typeof obj.onItemClick == 'function' && obj.onItemClick(e.target.dataset.index)

      }
    }
  }
  execute(obj.context,true)
  return obj.context.tapMask
}

//TODO 监听返回键事件？
module.exports = {
  showActionSheet: showActionSheet,
}

//usage:
// util.js:   const sheetlib = require('../templates/action_sheet/action_sheet.js');

// function showActionSheet(obj) {
//   sheetlib.showActionSheet(obj)
// }
//app.wxss:   @import "templates/action_sheet/action_sheet.wxss";

// util.showActionSheet({
//   context: this,
//   sheetList: ['a', 'b', 'qqqq', 'b', 'qqqq', 'b', 'qqqq', 'b', 'qqqq', 'qqqq', 'b', 'qqqq', 'b', 'qqqq'],
//   hideByClickMask: true,
//   onCancel: () => {
//     console.log('onCancel cb')
//   },
//   onItemClick: (index) => {
//     console.log('onItemClick cb', index)
//   },
// })
