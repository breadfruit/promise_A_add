const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
//    resolve('success')
//    reject('err')
    setTimeout(()=>{
        
    })
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})


