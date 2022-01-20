const {print} = require('./lib/helpers.js');

async function main() {
	print(new Promise(
		(resolve, reject) => {
			resolve(1);
		}
	));

	print(new Promise(
		(resolve, reject) => {
			reject(2);
		}
	));

	print(new Promise(
		(resolve, reject) => {
			throw 3;
		}
	));
}
main();

/*
2022-01-20T12:18:31.418Z Promise { 1 }
2022-01-20T12:18:31.424Z Promise { <rejected> 2 }
2022-01-20T12:18:31.424Z Promise { <rejected> 3 }

(node:860) UnhandledPromiseRejectionWarning: 2
(Use `node --trace-warnings ...` to show where the warning was created)
(node:860) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)

(node:860) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

(node:860) UnhandledPromiseRejectionWarning: 3
(node:860) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)


Call to resolve() returns a value and resolved the promise.
Call to reject() rejects the promise.
Error thrown rejects the promise as well.
*/
