var pool=null;
Q = require('q');
var dbConfig = require('../conf/db.js');

var DBProvider = function(dbname) {
    if (!dbConfig[dbname]) return console.error('no such dbConfig name!!',dbname)
    pool  = require('mysql').createPool({
        connectionLimit : dbConfig[dbname].connectionLimit,
        host            : dbConfig[dbname].host,
        port            : dbConfig[dbname].port,
        user            : dbConfig[dbname].user,
        password        : dbConfig[dbname].password,
        database        : dbConfig[dbname].database
    });
    console.log("connect mysql success!");
};

DBProvider.prototype.getCollection= function(callback) {
    pool.getConnection(function(error, connection){
        if( error ) 
            console.error(error);
        else
            callback&&callback(connection);
    });
};


DBProvider.prototype.sql_select= function(sql, param , callback) {
    this.getCollection(function(connection){
        connection.query(sql,param, function(error, result){
            connection.release();
            if( error ) 
                console.error(error);
            callback&&callback(error, result);
        });
    })
};

DBProvider.prototype.q_sql_select= function(sql,param){
    var deferred = Q.defer();
    this.sql_select(sql, param,function(err, rows, fields){
        if (err){
            deferred.reject(err);
        }else{
            deferred.resolve(rows);
        }
    });
    return deferred.promise;
}



DBProvider.prototype.sql_insert= function(sql, param , callback) {
    this.getCollection(function(connection){
        connection.query(sql,param, function(error, result){
            connection.release();
            if( error ) 
                console.error(error);
            callback&&callback(error, result);
        });
    })
};

DBProvider.prototype.q_sql_insert = function(sql,param){
    var deferred = Q.defer();
    this.sql_insert(sql,param, function(error, result){
        if (error){
            deferred.reject(error);
            return;
        } 
        deferred.resolve(result);
    });
    return deferred.promise;
}

exports = module.exports=DBProvider