     /**
     * 
how to use
log = require('./utils/log.js');
log.log('bajian')
log.log('bajian','warn')
     * @author bajian
     */

var cluster = require('cluster');
var log4js = require('log4js'); 

if (!cluster.isMaster) {
    log4js.configure({
      "appenders": [{
        "type": "clustered",

        "appenders": [
        {
            "type": "dateFile",
            "filename": "storage/logs/bike.log",
            "pattern": "-yyyy-MM-dd",
            "alwaysIncludePattern": false
        },
        {
            "type": "console"
        }
        ]
    }
    ],
    "replaceConsole": false
});
    var logger = log4js.getLogger("worker_" + cluster.worker.id);
}else{
    log4js.configure({
        appenders: [
        {
          type: 'dateFile', 
          filename: 'storage/logs/bike.log', 
          maxLogSize: 1024,
          alwaysIncludePattern:false,
          patterm: '-yyyy-MM-dd',
      },
        {
            "type": "console"
        }
      ],
      "replaceConsole": false//pm2 下console不能被重写
  });
    var logger = log4js.getLogger("master");
}

     /**
     * 
     * @author bajian
     * @param  
     *  case 'trace':
        case 'debug':
        case 'info':
        case 'warn':
        case 'error':
        case 'fatal':
     * @return 
     */
     exports.log = function(content,level){
        if (!level)
            level='info'
        if (!logger[level]) 
            return;
        logger[level](content);
    }
