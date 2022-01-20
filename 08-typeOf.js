const myObject = {
	key1: 'a value',   // 'a value' (string)
	key2: null,        // null      (object)
	key3: undefined,   // undefined (undefined)
	key4: 1/0,         // Infinity  (number)
	key5: 0/0,         // NaN       (number)
};

console.log(typeof myObject.key1);
console.log(typeof myObject.key2);
console.log(typeof myObject.key3);
console.log(typeof myObject.key4);
console.log(typeof myObject.key5);
console.log(typeof myObject.key6);

/*
string
object
undefined
number
number
undefined
*/
