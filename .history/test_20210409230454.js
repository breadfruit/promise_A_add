const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   resolve('1')
   //reject('err')
    // setTimeout(()=>{
    //     reject('gg')
    // },1000)
    
})

const p2 = new promise((res,rej) => {
    res('2')
})
const p3 = new promise((res,rej) =>{
    res('3')
})
promise.all([p1,p2,p3]).then(v=>{console.log(v)})
// 打印 err

  
 
  
 
// 运行的时候会走reject


   
  

 

