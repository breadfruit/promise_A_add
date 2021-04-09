const promise = require('./promise')
const p1 = new promise ((resolve,reject) =>{
    // setTimeout(()=>{
    //     resolve('success')
    // },1000)
    resolve('suce')
}) 



p1.then((r) => {
    console.log(r);
})