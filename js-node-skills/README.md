# nodejs-skills
nodejs知识点摘要

***
####
```

```


***
####inherited是基与原型的继承，call是基于对象继承，可以获取对象方法
```
var events = require('events');
var util = require('util');

function Pulser(){
    events.EventEmitter.call(this);
}
util.inherits(Pulser, events.EventEmitter);

Pulser.prototype.start = function(){
    var self = this;
    this.id = setInterval(function(){
        util.log('>>>>pulse');
        self.emit('pulse');
        util.log('...pulse');
    }, 1000);
}

var pulser = new Pulser();
pulser.on('pulse', function(){
    util.log('pulse received');
});
pulser.start();

```
