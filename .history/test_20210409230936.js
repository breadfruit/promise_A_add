const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   resolve('1')
   //reject('err')
    // setTimeout(()=>{
    //     reject('gg')
    // },1000)
    
})

    const res3 = Promise.resolve('res3')
    const res4 = Promise.reject('res4')
    const res8 = Promise.reject('res8')
    const res9 = Promise.all([res3,res4,res8])
    const res10 = Promise.race([res4,res3,res8])
    console.log(res9)
    console.log(res10)


// 打印 err

  
 
  
 
// 运行的时候会走reject


   
  

 

