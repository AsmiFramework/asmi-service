var util = require('util');
var	config = require('config');

require('debug-trace')({
	always: true,
	methods: config.global.trackConsoleMethods
});

function AsmiService(modName) {
	var root = this;

	this.conf = config.modules[modName] || {};
	if (this.conf.protocolOpts) {
		protocol = this.conf.protocolOpts.protocol || null;
	} else {
		protocol = null;
	}
	if (!protocol && config.modules["asmi-service"]) {
		protocol = config.modules["asmi-service"].protocol || "direct";
	} else {
		protocol = "direct";
	}

	protocolServer = require('asmi-protocol-' + protocol)(modName);
	protocolServer.initServer(this);
}

var p = AsmiService.prototype;

p.getInstanceID = function () {
	return this.instanceID;
};

// properties not declared on prototype (var x) will behave like static variables, so sub classes of this class will have these as static variables
p.conf = null;
p.modName = null;
p.mod = null;
p.instanceID = null;

module.exports = exports = function (modpath) {
	return new AsmiService(modpath);
};
