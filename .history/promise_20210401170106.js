const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class mypromise {
    promiseState = PENDING
    data = null
    reason = null
    onResolvedCallback = []
    onRejectedCallback = []
    constructor(executor){
        executor(this.resolve,this.reject)
    }
    //状态只能改变一次
   
    resolve = (data) =>{
        if (this.promiseState === PENDING){
            this.promiseState = FULFILLED
            this.data = data
            console.log(this.onResolvedCallback)
            while(this.onResolvedCallback.length){
                this.onResolvedCallback.shift()(data)
            }
        }
        
    }
    reject = (reason) => {
        if (this.promiseState === PENDING){
            this.promiseState = REJECTED
            this.reason = reason
            while(this.onRejectedCallback.length){
                this.onRejectedCallback.shift()(reason)
            }
        }

    }
    then(onResolved,onRejected){
        //处理同步代码
        if(this.promiseState === FULFILLED){
            onResolved(this.data)
        }
        if(this.promiseState === REJECTED){
            onRejected(this.reason)
        }
        //处理异步代理
        if(this.promiseState === PENDING){
            //存储到回调队列
            this.onResolvedCallback.push (onResolved)
            this.onRejectedCallback.push (onRejected)
            console.log(this.onResolvedCallback)
            
        }
    }
}
