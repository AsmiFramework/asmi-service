var util = require('util');
var	config = require('config');
var serviceCache = {};

function AsmiService(modName) {
}

var p = AsmiService.prototype;

p.initService = function (modName) {
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

	protocolServer = require('asmi-protocol-' + protocol)(modName, this);
};

// properties not declared on prototype (var x) will behave like static variables, so sub classes of this class will have these as static variables
p.conf = null;
p.modName = null;
p.mod = null;

module.exports = exports = function (modpath) {
	if (serviceCache[modpath]) {
		return serviceCache[modpath];
	} else {
		var svc = new AsmiService(modpath);
		serviceCache[modpath] = svc;
		svc.initService(modpath);
		return svc;
	}
};
