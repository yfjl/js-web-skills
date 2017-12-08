     /**
     * 
     * @author bajian
     * @param params 占用在arguments第一位
     * @return 
     */
     Function.prototype.before = function(func,params) {
            var _this=this //函数本身
            return function(){
                
                if (func.apply(this, [params,arguments])===false) { //若调用了before后返回false则不再执行
                    return false
                }
                return _this.apply(this, arguments) //调用函数本身
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