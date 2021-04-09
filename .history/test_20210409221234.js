const promise = require('./promise.js')
const p1 = new promise((resolve, reject) => {
   //resolve('success')
   //reject('err')
    // setTimeout(()=>{
    //     reject('gg')
    // },1000)
    throw new Error('ERROR')
})
 
promise.then(value => {
    console.log(1)
    console.log('resolve', value)
  }, reason => {
    console.log(2)
    console.log(reason.message)
  })
  
  作者：ITEM
  链接：https://juejin.cn/post/6945319439772434469
  来源：掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 
// 运行的时候会走reject


   
  

 

