const {print, sleep} = require('./lib/helpers.js');

async function main() {
	print('Begin');

	const myInterval = setInterval(() => print('Another second passed.') , 1000);
	
	await sleep(1001);

	print('Waiting for 3000 ms...');
	await sleep(3000);

	print('End'); // prints after  1s + 3s

	await sleep(1001);
	clearInterval(myInterval);

	// How many times "Another second passed" was printed?
}
main();

/*
2022-01-20T09:53:22.069Z Begin
2022-01-20T09:53:23.078Z Another second passed.
2022-01-20T09:53:23.080Z Waiting for 3000 ms...
2022-01-20T09:53:24.079Z Another second passed. <--.
2022-01-20T09:53:25.080Z Another second passed. <--+- our interval was still printing :)
2022-01-20T09:53:26.081Z Another second passed. <--' 
2022-01-20T09:53:26.082Z End
2022-01-20T09:53:27.083Z Another second passed.

To remind: Example 03 had this output:
                :42.279Z Begin
                :43.290Z Another second passed.
                :43.293Z Waiting for blockingSleep(3000)...
                :46.293Z End
                :46.293Z Another second passed.
                :47.294Z Another second passed.

We have desired "wait" logic but not blocking other work
If this was a web server - multiple users can be served at the same time
*/
