const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   //resolve('success')
   //reject('err')
    
       re
})
p1.then(value => {
    console.log(1)
    console.log('resolve', value)
    return new promise((res,rej) =>{res('2')})
}).then(v =>{
    console.log(3)
})
   
  

 

