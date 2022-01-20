const myObject = {
	key1: 'a value',   // 'a value' (string)
	key2: null,        // null
	key3: undefined,   // undefined
	key4: 1/0,         // Infinity
	key5: 0/0,         // NaN
	key6: {
		subkey1: 0 // 0 (number)
	}
};

console.log(myObject.key1);
console.log(myObject.key2);
console.log(myObject.key3);
console.log(myObject.key4);
console.log(myObject.key5);
console.log(myObject.key6);
console.log(myObject.key6.subkey1);
console.log(myObject.key6.subkey2);
console.log(myObject.key7.subkey2);

/*
a value
null
undefined
Infinity
NaN
{ subkey1: 0 }
0
undefined

07-null-undefined.js:20
console.log(myObject.key7.subkey2);
                          ^
TypeError: Cannot read property 'subkey2' of undefined
*/
