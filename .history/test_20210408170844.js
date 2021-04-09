const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   resolve('success')
   reject('err')
    // setTimeout(()=>{
    //     resolve('gg')
    // },1000)
})

p1.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})


