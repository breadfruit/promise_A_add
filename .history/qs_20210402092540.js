const qs = require('qs')
let url = 'a=1&b=2&c=3';  
  
const u = qs.parse(url);
console.log(u)