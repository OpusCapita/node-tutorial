const {print} = require('./lib/helpers.js');

              function f1() { print(this.name); }
        async function f2() { print(this.name); }
const f3 =       function() { print(this.name); }
const f4 = async function() { print(this.name); }
const f5 =              ()=>{ print(this.name);}
const f6 =        async ()=>{ print(this.name);}

class MyClass{
	constructor(name) {
		this.name = name;
	}
	f1=f1;
	f2=f2;
	f3=f3;
	f4=f4;
	f5=f5;
	f6=f6;
}

async function main() {
	const myInstance = new MyClass('className');
	myInstance.f1();
	myInstance.f2();
	myInstance.f3();
	myInstance.f4();
	myInstance.f5();
	myInstance.f6();
}
main();

/*
2022-01-20T12:28:35.817Z className
2022-01-20T12:28:35.822Z className
2022-01-20T12:28:35.822Z className
2022-01-20T12:28:35.822Z className
2022-01-20T12:28:35.822Z undefined  <-- no this.name
2022-01-20T12:28:35.823Z undefined  <-- no this.name

Arrow functions can be used to define anonymous (name-less) functions.
  Arrow functions are available since ES6
  Arrow functions have no "context"
    Arrow functions have no access to "this", "super", arguments nor new.target
  Arrow functions cannot be used as constructors
  Arrow functions lack context thus might be faster (but have no context ;) )
*/
