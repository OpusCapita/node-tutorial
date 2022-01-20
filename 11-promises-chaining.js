const {print} = require('./lib/helpers.js');

function sleep(ms) { return new Promise(resolve => setTimeout(()=>resolve(true), ms))}

async function main() {
	const myInterval = setInterval(() => print('Another second passed.') , 1000);

	sleep(1000)
	.then( (result) => {
		print(1);
		return sleep(1000);
		})
	.then( (result) => {
		print(2);
		return sleep(1000);
		})
	.then( (result) => {
		print(3);
		clearInterval(myInterval);
		});
}
main();

/*
2022-01-20T11:56:19.912Z Another second passed.
2022-01-20T11:56:19.934Z 1
2022-01-20T11:56:20.913Z Another second passed.
2022-01-20T11:56:20.937Z 2
2022-01-20T11:56:21.914Z Another second passed.
2022-01-20T11:56:21.938Z 3

We are returning a promise and creating a chain of steps to perform.
Background jobs are not blocked.
*/
