function Stats(totalDuration) {
	this.totalDuration = totalDuration;
}

Stats.prototype.setTotalDuration = function(duration) {
	this.totalDuration = duration;
}

Stats.prototype.getTotalDuration = function() {
	return this.totalDuration;
}

module.exports = Stats;  