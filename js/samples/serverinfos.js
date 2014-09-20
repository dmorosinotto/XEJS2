// COMMONJS - ESEMPIO DI exports (espone oggeto con più proprietà/metodi)
exports.nodeVer = process.version;

var _platform = {
	SO: process.platform === 'darwin' ? 'Mac OSx' : process.platform
	, architecture: process.arch || ''
};

exports.platform = _platform;

exports.hostedBy = function() {
	return 'Node ' + process.version + ' running on ' + _platform.OS + ' ' + _platform.architecture;
};

exports.currentTimeUTC = function() {
	return (new Date()).toISOString();
};