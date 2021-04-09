const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   resolve('1')
   //reject('err')
    // setTimeout(()=>{
    //     reject('gg')
    // },1000)
    
})

    const res3 = Promise.resolve('res3')
    const res4 = promise.reject('res4')
    const res8 = promise.reject('res8')

console.log(res3)
// 打印 err

  
 
  
 
// 运行的时候会走reject


   
  

 

