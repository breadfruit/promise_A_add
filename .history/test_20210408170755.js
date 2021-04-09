const pri = require('./promise.js')
const promise = new MyPromise((resolve, reject) => {
//    resolve('success')
//    reject('err')
    setTimeout(()=>{
        resolve('gg')
    },1000)
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})


