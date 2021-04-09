const qs = require('qs')

let url1 = 'a=1&b=2&c=3';  
let url2 = "d=1&name='jj'" 
const u1 = qs.parse(url1);
console.log(u1)
const u2 = JSON.parse(url2)
console.log(u2)