const promise = require('./promise')
const p1 = new promise ((resolve,reject) =>{
    // setTimeout(()=>{
    //     resolve('success')
    // },1000)
    resolve('suce')
}) 

console.log(p1)

p1.then((r) => {
    console.log(r);
},(v) =>{
    console.log(v)
})
p1.then((r) => {
    console.log(r);
},(v) =>{
    console.log(v)
})