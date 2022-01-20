//// lib/helpers.js:
// function print(message) { console.log(new Date().toISOString(), message);}
// function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms));}
// 
// module.exports.print = print;
// module.exports.sleep = sleep;

const {print, sleep} = require('./lib/helpers.js');

async function main() {
	print('Begin');
	await sleep(1000);
	print('End'); // prints after 1s
}
main();

/*
2022-01-20T10:09:32.620Z Begin
2022-01-20T10:09:33.628Z End

Our helper methods are moved to a library
We will re-use them in following examples
*/
