const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class mypromise {
    promiseState = PENDING
    data = null
    reason = null
    onResolved = []
    onRejected = []
    constructor(executor){
        executor(this.resolve,this.reject)
    }
    //状态只能改变一次
   
    resolve = (data) =>{
        if (this.promiseState === PENDING){
            this.promiseState = FULFILLED
            this.data = data
        }
        
    }
    reject = (reason) => {
        if (this.promiseState === PENDING){
            this.promiseState = REJECTED
            this.reason = reason
        }

    }
    then(onResolved,onRejected){
        //处理同步代码
        if(this.status === FULFILLED){
            onRejected(this.data)
        }
        if(this.status === REJECTED){
            onResolved(this.reason)
        }
        //处理异步代理
        if(this.status === PENDING){
            //存储到回调队列
        }
    }
}
module.exports = mypromise