function ajax_get(a,b,c,d,e){""!=a&&(c=void 0==c||""==c?"json":c,d=void 0==d?defaultFailCallback:d,e=void 0==e?defaultMiddleware:e,$.ajax({url:a,type:"get",dataType:c,success:function(a){e(a),void 0!=b&&b(a)},error:function(a){d(a)}}))}function ajax_post(a,b,c,d,e,f){""!=a&&(b=void 0==b?"":b,d=void 0==d||""==d?"json":d,e=void 0==e?defaultFailCallback:e,f=void 0==f?defaultMiddleware:f,$.ajax({url:a,type:"POST",dataType:d,data:b}).done(function(a){f(a),c(a)}).fail(function(){e()}))}function defaultMiddleware(){}function defaultFailCallback(){A.showToast("网络错误")}