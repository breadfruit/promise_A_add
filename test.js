
const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   // 目前这里只处理同步的问题
   resolve('success')
})

function other () {
   return new promise((resolve, reject) =>{
      resolve('other')
   })
}
p1.then(value => {
   console.log(1)
   console.log('resolve', value)
   return other()
}).then(value => {
   console.log(2)
   console.log('resolve', value)
})
promise.reject('dd')

console.log(res)
 // const res3 = promise.resolve('res3')
    // const res4 = promise.resolve('res4')
    // const res8 = promise.resolve('res8')
    // const res9 = promise.all([res3,res4,res8])
    // const res10 = promise.race([res4,res3,res8])
    // console.log(res9)
    // console.log(res10)
    // const res3 = Promise.resolve('res3')
    // const res4 = Promise.resolve('res4')
    // const res8 = Promise.resolve('res8')
    // const res9 = Promise.all([res3,res4,res8])
    // const res10 = Promise.race([res4,res3,res8])
    // console.log(res9)
    // console.log(res10)

p1.then(v=>{
   console.log(v)
},e=>{

   console.log(e)
})


  
 
  
 
// 运行的时候会走reject


   
  

 

