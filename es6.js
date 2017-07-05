console.log('start');

setTimeout(()=>{
 console.log('hahaha');
}, 2000);

function p(argument) {
	return new Promise(function(resolve,reject){
		if (true) {
			resolve('succ')
		}else{
			reject(Error('err'))
		}
	});
}

// p().then(function(argument) {
// 	console.log(argument,'then');
// })


 const asyncTest=async (argument)=>{
	console.log('asyncTest start ');
	let re=await p()
	console.log('re',re);
	console.log('asyncTest end ');
}

asyncTest()//node --harmony-async-await es6.js