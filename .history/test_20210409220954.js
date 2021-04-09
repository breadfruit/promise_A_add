const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   resolve('success')
   //reject('err')
    // setTimeout(()=>{
    //     reject('gg')
    // },1000)
})
 
// 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
const p2 = p1.then(value => {
   console.log(1)
   console.log('resolve', value)
   return p1
})
 
// 运行的时候会走reject
p2.then(value => {
  console.log(2)
  console.log('resolve', value)
}, reason => {
  console.log(3)
  console.log(reason.message)
})

   
  

 

