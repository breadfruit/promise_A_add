const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   //resolve('success')
   reject('err')
    // setTimeout(()=>{
    //     reject('gg')
    // },1000)
    
})

 
promise.then().then().then(value => console.log(value), reason => console.log(reason))

// 打印 err

  
 
  
 
// 运行的时候会走reject


   
  

 

