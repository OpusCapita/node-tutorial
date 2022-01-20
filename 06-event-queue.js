const {print, sleep} = require('./lib/helpers.js');
const EventEmiter = require('events');

class MyClass extends EventEmiter {
	constructor(name) {
		super();
		this.name = name;
	}
	async doSomething(jobId) {
		this.emit('starting', jobId);
		print(`Job ${jobId} started`);
		await sleep(1000);
		print(`Job ${jobId} finished`);
		this.emit('done', jobId);
	}
}

async function main() {
	const instance1 = new MyClass('first');
	
	instance1.on('starting', (jobId) => { print(`instance1.on:starting ${jobId}`); } );

	instance1.on('done', (jobId) => { print(`instance1.on:done ${jobId}`); } );

	for (i=0; i<5; i++) {
		instance1.doSomething(i);
	}
}
main();

/*
2022-01-20T10:05:49.755Z instance1.on:starting 0
2022-01-20T10:05:49.760Z Job 0 started
2022-01-20T10:05:49.761Z instance1.on:starting 1
2022-01-20T10:05:49.761Z Job 1 started
2022-01-20T10:05:49.761Z instance1.on:starting 2
2022-01-20T10:05:49.761Z Job 2 started
2022-01-20T10:05:49.761Z instance1.on:starting 3
2022-01-20T10:05:49.761Z Job 3 started
2022-01-20T10:05:49.761Z instance1.on:starting 4
2022-01-20T10:05:49.761Z Job 4 started
2022-01-20T10:05:50.763Z Job 0 finished
2022-01-20T10:05:50.763Z instance1.on:done 0
2022-01-20T10:05:50.764Z Job 1 finished
2022-01-20T10:05:50.764Z instance1.on:done 1
2022-01-20T10:05:50.764Z Job 2 finished
2022-01-20T10:05:50.764Z instance1.on:done 2
2022-01-20T10:05:50.764Z Job 3 finished
2022-01-20T10:05:50.765Z instance1.on:done 3
2022-01-20T10:05:50.765Z Job 4 finished
2022-01-20T10:05:50.765Z instance1.on:done 4

Every job was started
Then "await" caused it to "dock".
Node returned to them in FIFO (First-In-First-Out) order whenever it was ready
*/
