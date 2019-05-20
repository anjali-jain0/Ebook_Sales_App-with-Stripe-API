if(process.env.NOD_ENV === 'production'){
	module.exports = require('key2');
} else {
	module.exports = require('key1');
}