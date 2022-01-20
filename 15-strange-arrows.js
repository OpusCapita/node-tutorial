const {print} = require('./lib/helpers.js');

<!-- this is a line comment :O
print(1);

--> this is a comment as well
print(2);

 --> this is a comment (space doesn't matter) 
 print(3);

let n = 6;
if (n --> 0) print('6-- = 5 > 0');  // Not a comment...

(() => print(7))()  // Calls method print(7), returns its result

const c8 = ( () => {} )();
print(c8);  // we are NOT returning an empty object - this is an empty code block...

const c9 = ( () => ({}) )();
print(c9);  // This returns an empty object

const c10 = ( () => { return {} } )();
print(c10);  // This returns an empty object

/*
2022-01-20T12:58:49.001Z 1
2022-01-20T12:58:49.007Z 2
2022-01-20T12:58:49.007Z 3
2022-01-20T12:58:49.007Z 6-- = 5 > 0
2022-01-20T12:58:49.007Z 7
2022-01-20T12:58:49.007Z undefined
2022-01-20T12:58:49.007Z {}
2022-01-20T12:58:49.008Z {}

*/
