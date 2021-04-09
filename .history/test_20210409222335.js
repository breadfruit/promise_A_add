const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   //resolve('success')
   //reject('err')
    // setTimeout(()=>{
    //     reject('gg')
    // },1000)
    throw new Error('ERROR')
})
 
// 第一个then方法中的错误要在第二个then方法中捕获到
p1.then(value => {
    console.log(1)
    console.log('resolve', value)
    throw new Error('then error')
  }, reason => {
    console.log(2)
    console.log(reason.message)
  }).then(value => {
    console.log(3)
    console.log(value);
  }, reason => {
    console.log(4)
    console.log(reason.message)
  })
  
 
  
 
// 运行的时候会走reject


   
  

 

