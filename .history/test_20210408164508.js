import promise from './promise'
promise.resolve().then(() => {
   setTimeout(()=>{

   },1000)
})

Promise.then((r) => {
    console.log(r);
})