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
// usage:
//WXML <include src="../../templates/toast/toast.wxml" />
//JS 建议封装到util。js内 const toastlib = require('../templates/toast/toast.js');
// 
// function toast(obj) {
//   toastlib.showToast(obj)
// }