// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class promise{
    constructor(executor) {
        try{
            executor(this.resolve,this.reject)
        }catch (e) {
            this.reject(e)
        }

    }

    // 储存状态的变量，初始值是 pending
    status = PENDING;
    // 成功之后的值
    value = null;
    // 失败之后的原因
    reason = null;

    // 存储成功回调函数
    onFulfilledCallbacks = [];
    // 存储失败回调函数
    onRejectedCallbacks = [];

    resolve = (value) => {
        if(this.status === PENDING){
            this.status = FULFILLED
            this.value = value
            while(this.onFulfilledCallbacks.length){
                this.onFulfilledCallbacks.shift()(value)
            }
        }
    }

    reject = (reason) => {
        //确保同步函数只执行一个
        if(this.status === PENDING){
            this.status = REJECTED
            this.reason = reason
            while(this.onRejectedCallbacks.length){
                this.onRejectedCallbacks.shift()(reason)
            }
        }
        

    }

    //书写callback
    then(onFulfilled, onRejected){
        const promise2 = new promise((resolve,reject)=>{
            if(this.status === REJECTED){   
                const res = onRejected(this.reason)
                rejectPromise(res,resolve,reject)
                    
            }
            if(this.status === FULFILLED){
                const res = onFulfilled(this.value)
                resolvePromise(res,resolve,reject)
            }
            if(this.status === PENDING){
                //加入回调队列
                //只有异步代码才可以实现回调队列
                this.onFulfilledCallbacks.push(onFulfilled)
                this.onRejectedCallbacks.push(onRejected)
            }
           
        })
        return promise2
    }

}
function resolvePromise(x,resolve,reject){
    if(x instanceof promise){

        x.then(resolve,reject)
    }else{
        resolve(x)
    }
}
function rejectPromise(x,resolve,reject){
    if(x instanceof promise){ 
        x.then(resolve,reject)
    }else{
        reject(x)
    }
}
module.exports = promise