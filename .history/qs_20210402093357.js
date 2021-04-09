const qs = require('qs')

let url1 = 'a=1&b=2&c=3';  
let url2 = "d=1&name='jj'" 
const u1 = qs.parse(url1);
console.log(u1)
var obj = JSON.parse('{ "name":"runoob", "alexa":10000, "site":"www.runoob.com" }');
console.log(obj)