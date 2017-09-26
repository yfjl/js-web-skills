function showToast(obj) {
  if (obj.context == null || obj.content == null) {
		console.error("必须传入微信小程序页面的 this 对象, 和 toast 的内容");
		return;
	}

	obj.context.setData({
		'show_toast': true,
    'toast_content': obj.content,
	});

	setTimeout(() => {
		obj.context.setData({
			'show_toast': false,
			'toast_content': null,
		});
	}, obj.duration || 1500);
}

module.exports = {
	showToast: showToast,
}

//usage:
// const keyboard1Arr = require('../../templates/keyboard1/keyboard1Arr.js');
// const keyboard2Arr = require('../../templates/keyboard1/keyboard2Arr.js');

// data: {
//   hideKeyboard1:false,
//   keyboard1Arr: keyboard1Arr
// }, 

// tapKeyBoard1: function (e) {
//   console.log('tapKeyBoard1', e.target.dataset.v)
//   if (e.target.dataset.v)
//     switch (e.target.dataset.v) {
//       case '完成':
//         this.setData({
//           hideKeyboard1: true
//         })
//         break;
//       case '删除':
//         this.setCurrentText("")
//         break;
//       default:
//         this.setCurrentText(e.target.dataset.v)
//         if (this.data.currentActive >= 8) {
//           this.setData({
//             "currentActive": 1,
//             "keyboard1Arr": keyboard1Arr
//           });
//         } else {
//           this.setData({
//             "currentActive": ++this.data.currentActive,
//             "keyboard1Arr": keyboard2Arr
//           });
//         }
//         break;
//     }
// },