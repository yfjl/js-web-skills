     /**
     * 
     * @author bajian
     * @param  
     * @return 
     */
Function.prototype.before = function(func,params) {
    var _this=this
    return function(){

        if (func.apply(this, [params,arguments])===false) {
            return false
        }
        return _this.apply(this, arguments)
    }
};

Function.prototype.after = function(func,params){
    var _this=this
    return function(){
        var re=_this.apply(this, arguments)
        if (re===false) {
            return false;
        }
        func.apply(this, [params,arguments])
        return re;
    }
}

Function.prototype.getName = function(){
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}