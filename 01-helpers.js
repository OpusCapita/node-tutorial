function print(message) {
	console.log(new Date().toISOString(), message);
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
	// We run "async" function so we can use "await"
	print('Begin');
	sleep(1000);
	print('Half way done'); // prints immediately
	await sleep(1000);
	print('End'); // prints after 1s
}
main();

// This would throw an error: "await is only valid in async function"
// await sleep(1000);

/*
2022-01-20T10:08:24.273Z Begin
2022-01-20T10:08:24.281Z Half way done
2022-01-20T10:08:25.284Z End

First sleep runs "in background"
"Half way done" is printed immediately
Second sleep waits
*/
