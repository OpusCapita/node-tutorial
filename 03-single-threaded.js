const {print, sleep} = require('./lib/helpers.js');

function blockingSleep(ms) {
	const msStart = new Date().valueOf();
	// msStart.valueOf() returns number of milliseconds since 1970-01-01 00:00:00 UTC
	let msCurrent = new Date().valueOf();
	while (msCurrent.valueOf() - msStart < ms) {
		msCurrent = new Date().valueOf();
	}
	return;
}

async function main() {
	print('Begin');

	// Every second print something
	// setInterval(callback, delay), returns handler to interval
	const myInterval = setInterval(() => print('Another second passed.') , 1000);
	// Hint: It will fail to print every second
	
	await sleep(1001);
	// Wait 1s to see first "Another second passed"

	print('Waiting for blockingSleep(3000)...');
	blockingSleep(3000);

	print('End'); // prints after  1s + 3s

	await sleep(1001);
	clearInterval(myInterval);

	// How many times "Another second passed" was printed?
}
main();


/*
2022-01-20T09:49:42.279Z Begin
2022-01-20T09:49:43.290Z Another second passed.
2022-01-20T09:49:43.293Z Waiting for blockingSleep(3000)...   <-- nothing was printed for 3s!
2022-01-20T09:49:46.293Z End
2022-01-20T09:49:46.293Z Another second passed.
2022-01-20T09:49:47.294Z Another second passed.

blockingSleep blocked everything
If we had a web server then other users would need to wait until first user request is completed!
*/
