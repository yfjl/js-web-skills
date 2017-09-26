var Response=function(){
	this.begin=new Buffer([0x7E]);
	this.responseId=new Buffer([0x80,0x01]);//服务器通用应答
	this.end=new Buffer([0x00,0x7E]);
	this.bufhead=new Buffer([0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]);

}

     /**
     * 通用应答
     * @author bajian
     * @param  buffer类型！！
     * @return buffer
     */
Response.prototype.common = function(buf) {
	var len=buf.length
	var lenBuf=new Buffer([0x00,len])

	return Buffer.concat([
		this.begin,
		this.responseId,
		lenBuf,
		this.bufhead,//没用的部分包头
		buf,
		this.end
		])
};

     /**
     * 登录出错
     * @author bajian
     * @param  
     * @return 
     */
Response.prototype.loginErr = function(buf) {
	return this.common(new Buffer([0x00,0x00,0x0b,0x00,0x01]))
};
Response.prototype.loginSucc = function(buf) {
	return this.common(new Buffer([0x00,0x00,0x0b,0x00,0x00]))
};

Response.prototype.lockStatusSucc = function(buf) {
	return this.common(new Buffer([0x00,0x00,0x0b,0x01,0x00]))
};
Response.prototype.lockHistorySucc = function(buf) {
	return this.common(new Buffer([0x00,0x00,0x0b,0x03,0x00]))
};
Response.prototype.lockLocationSucc = function(buf) {
	return this.common(new Buffer([0x00,0x00,0x0b,0x02,0x00]))
};

Response.prototype.ICCIDSucc = function(buf) {
	return this.common(new Buffer([0x00,0x00,0x0b,0x04,0x00]))
};

Response.prototype.BSSucc = function(buf) {
	return this.common(new Buffer([0x00,0x00,0x0b,0x05,0x00]))
};
Response.prototype.electricitySucc = function(buf) {
	return this.common(new Buffer([0x00,0x00,0x0b,0x06,0x00]))
};
Response.prototype.alarmSucc = function(buf) {
	return this.common(new Buffer([0x00,0x00,0x0b,0x07,0x00]))
};


exports = module.exports=new Response()