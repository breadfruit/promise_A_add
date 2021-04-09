import promise from './promise';
const p1 = new promise ((resolve,reject) =>{
    setTimeout(()=>{
        resolve('success')
    },1000)
}) 



p1.then((r) => {
    console.log(r);
})