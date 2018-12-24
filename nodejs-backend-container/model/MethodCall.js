function MethodCall(name, duration) {
	this.name = name || null;
	this.duration = duration || null;
}

MethodCall.prototype.getName = function() {
	return this.name;
};

MethodCall.prototype.setName = function(name) {
	this.name = name;
};


MethodCall.prototype.getDuration = function() {
	return this.duration;
};

MethodCall.prototype.setDuration = function(d) {
	this.duration = d;
};

module.exports = MethodCall;    