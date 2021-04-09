// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class promise{
    constructor(executor) {
        try{
            executor(this.resolve,this.reject)
        }catch (e) {
            this.reject()
        }

    }

    // 储存状态的变量，初始值是 pending
    status = PENDING;
    // 成功之后的值
    value = null;
    // 失败之后的原因
    reason = null;

    // 存储成功回调函数
    onFulfilledCallbacks = null;
    // 存储失败回调函数
    onRejectedCallbacks = null;


    reject = (value) => {
        //确保同步函数只执行一个
        if(this.status === PENDING){
            this.status = REJECTED
            this.value = value
        }

    }
    resolve = (reason) => {
        if(this.status === PENDING){
            this.status = FULFILLED
            this.reason = reason
        }
    }
    //书写callback
    then(onFulfilled, onRejected){
        
        if(this.status === REJECTED){
            onRejected(this.reason)
            this.onRejectedCallbacks && this.onRejectedCallbacks(this.reason)
        }
        if(this.status === FULFILLED){
            onFulfilled(this.value)
            this.onFulfilledCallbacks && this.onFulfilledCallbacks(this.value)
        }
        if(this.status === PENDING){
            //加入回调队列
            this.onFulfilledCallbacks = onFulfilled 
            this.onRejectedCallbacks = onRejected
        }
    }
 

}
module.exports = promise