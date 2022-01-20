function print(message) { console.log(new Date().toISOString(), message);}
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms));}

module.exports.print = print;
module.exports.sleep = sleep;
