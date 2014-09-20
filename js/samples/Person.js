// COMMONJS - ESEMPIO DI module.export (costrutture classe Person)
function Person(fname, lname) {
	this.firstName = fname || '';
	this.lastName = lname || '';
}
Person.prototype.fullName = function() {
	return this.firstName + ' ' + this.lastName;
};

exports = module.exports = Person;