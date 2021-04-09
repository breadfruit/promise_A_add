const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   reject('err')
   //reject('err')
    // setTimeout(()=>{
    //     reject('gg')
    // },1000)
    
})
 
// 第一个then方法中的错误要在第二个then方法中捕获到
p1.then(v=>{
    console.log(v)
},r=>{
    console.log(r)
})
  
 
  
 
// 运行的时候会走reject


   
  

 

