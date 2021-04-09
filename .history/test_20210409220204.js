const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   resolve('success')
   //reject('err')
    // setTimeout(()=>{
    //     reject('gg')
    // },1000)
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
}).then(v =>{
    console.log(3)
},reason => {
    return other()
})
   
  

 

