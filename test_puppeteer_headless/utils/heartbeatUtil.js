var heartbeatSecond = appConfig.heartbeat ||300;

function checkHeartbeat(){
    Object.keys(bike_data).forEach(function(value,index){
        var obj=bike_data[value]
        if (!obj) return;
        if (Date.now()/1000-(obj.last_time||obj.connect_time) > heartbeatSecond) {
            obj.socket && obj.socket.end()
            log.log('checkHeartbeat >'+heartbeatSecond,obj['device_id']||value,value)
            delete obj.socket
            delete bike_data[value]
            
        }

    });
}

setInterval(checkHeartbeat, 10000);