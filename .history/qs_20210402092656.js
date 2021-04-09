const qs = require('qs')
let url1 = 'a=1&b=2&c=3';  
let url2 = "http://www.baidu.com?id=1&name='jj'" 
const u = qs.parse(url1);
console.log(u)