const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   //resolve('success')
   //reject('err')
    // setTimeout(()=>{
    //     reject('gg')
    // },1000)
    throw new Error('ERROR')
})
 
promise.then(value => {
    console.log(1)
    console.log('resolve', value)
  }, reason => {
    console.log(2)
    console.log(reason.message)
  })
  
 
// 运行的时候会走reject


   
  

 

