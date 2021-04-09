const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   //resolve('success')
   //reject('err')
    setTimeout(()=>{
        resolve('gg')
    },1000)
})
promise.then(value => {
    console.log(1)
    console.log('resolve', value)
  })
   
  promise.then(value => {
    console.log(2)
    console.log('resolve', value)
  })
  
  promise.then(value => {
    console.log(3)
    console.log('resolve', value)
  })



