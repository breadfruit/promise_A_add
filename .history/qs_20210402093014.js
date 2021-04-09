const qs = require('qs')

let url1 = 'a=1&b=2&c=3';  
let url2 = "id=1&name='jj'" 
const u = qs.parse(url2);
console.log(u)
JSON.parse(url1)