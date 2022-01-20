const {print} = require('./lib/helpers.js');

async function myFunction(arg) {
	if (arg > 0) {
		return `OK ${arg}`;
	} else {
		throw `Invalid value ${arg}`;
	}
}

async function main() {

	myFunction(1) // A promise
	.then( (result) => print(result) )
	.catch( (error) => print(error)	)
	.finally( ()=>{print('.')} )

	myFunction(-2) // A promise
	.then( (result) => print(result) )
	.catch( (error) => print(error)	)
	.finally( ()=>{print('..')} )

	try {
		await myFunction(-3);
		// Important: do NOT forget about the "await"
	} catch (error) {
		print(`Error: ${error}`);
	} finally {
		print('Finally...');
	}

	myFunction(-5)
	.then( ()=>{print(-5)});

	try {
		myFunction(-6);
	} catch {};

}
main();

/*
2022-01-20T12:14:59.818Z OK 1
2022-01-20T12:14:59.825Z Error: Invalid value -3
2022-01-20T12:14:59.825Z Finally...
2022-01-20T12:14:59.825Z Invalid value -2
2022-01-20T12:14:59.826Z .
2022-01-20T12:14:59.826Z ..

(node:839) UnhandledPromiseRejectionWarning: Invalid value -6
(Use `node --trace-warnings ...` to show where the warning was created)
(node:839) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 4)

(node:839) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

(node:839) UnhandledPromiseRejectionWarning: Invalid value -5
(node:839) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 5)


Error handling of a promise seems "clean".
"Await" is very similar.
Unexpected unhandled exceptions can happen with both promises and await.
*/
