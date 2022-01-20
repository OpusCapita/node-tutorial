const {print, sleep} = require('./lib/helpers.js');

async function main() {

	sleep(100).then( (resolve, reject) => {
		print('first');
		sleep(100).then( (resolve, reject) => {
			print('second');
			sleep(100).then( (resolve, reject) => {
				print('third');
			});
		});
	});

	await sleep(100);
	print('First');
	await sleep(100);
	print('Second');
	await sleep(100);
	print('Third');

}
main();

/*
2022-01-20T10:32:00.323Z first
2022-01-20T10:32:00.329Z First
2022-01-20T10:32:00.428Z second
2022-01-20T10:32:00.429Z Second
2022-01-20T10:32:00.528Z third
2022-01-20T10:32:00.529Z Third

Promises can get complex...
*/
