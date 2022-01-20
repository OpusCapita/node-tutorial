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
	const instance2 = new MyClass('second');
	
	instance1.on('starting', (jobId) => { print(`instance1.on:starting ${jobId}`); } );
	instance2.on('starting', (jobId) => { print(`instance2.on:starting ${jobId}`); } );

	instance1.on('done', (jobId) => { print(`instance1.on:done ${jobId}`); } );
	instance2.on('done', (jobId) => { print(`instance2.on:done ${jobId}`); } );

	print(`Instance 1 = ${instance1.name}`);
	print(`Instance 2 = ${instance2.name}`);

	instance1.doSomething(1);
	instance2.doSomething(2);
}
main();

/*
2022-01-20T10:03:47.690Z Instance 1 = first
2022-01-20T10:03:47.695Z Instance 2 = second
2022-01-20T10:03:47.695Z instance1.on:starting 1
2022-01-20T10:03:47.695Z Job 1 started
2022-01-20T10:03:47.696Z instance2.on:starting 2
2022-01-20T10:03:47.696Z Job 2 started
2022-01-20T10:03:48.697Z Job 1 finished
2022-01-20T10:03:48.698Z instance1.on:done 1
2022-01-20T10:03:48.699Z Job 2 finished
2022-01-20T10:03:48.699Z instance2.on:done 2

We have our first class created.
  To use it - we need to create an instance.
  Every instance has its own variables.
We have learned about the events (emiter and listener).
*/
