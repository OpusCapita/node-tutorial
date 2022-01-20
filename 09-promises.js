const {print, sleep} = require('./lib/helpers.js');

async function main() {
	print(sleep(100));
	// prints "Promise { <pending> }

	print(await sleep(100));
	// prints "undefined" after 100ms (our "sleep" returns no value)
	
	sleep(100).then( (resolve, reject) => {
		print(resolve);
		// prints "undefined" after 100ms
	});
}
main();

/*
2022-01-20T10:27:39.757Z Promise { <pending> }
2022-01-20T10:27:39.863Z undefined
2022-01-20T10:27:39.964Z undefined

Promise is something that is "promised to execute someday".
Await is "a promise in disguise".
*/
