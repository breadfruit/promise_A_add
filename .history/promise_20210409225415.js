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
        onFulfilled =  typeof onFulfilled === 'function' ? onFulfilled: value => value
        onRejected = typeof onRejected === 'function' ? onRejected:reason => {throw reason}
        const promise2 = new promise((resolve,reject)=>{
            if(this.status === REJECTED){  
                queueMicrotask(() => {
                    try {
                        const res = onRejected(this.reason)
                        rejectPromise(promise2,res,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }
                  
                })        
            }
            if(this.status === FULFILLED){
                queueMicrotask(()=>{
                    try {
                        const res = onFulfilled(this.value)
                        resolvePromise(promise2,res,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }

                })
            }
            if(this.status === PENDING){
                //加入回调队列
                //只有异步代码才可以实现回调队列
                this.onFulfilledCallbacks.push(()=>{
                   
                    queueMicrotask(() => {
                        try {
                            const res = onFulfilled(this.reason)
                            resolvePromise(promise2,res,resolve,reject)
                        } catch (error) {
                            reject(error)
                        }
                      
                    }) 
                })
               
                
                    
                this.onRejectedCallbacks.push(()=>{
                    queueMicrotask(() => {
                        try {
                            const res = onRejected(this.reason)
                            rejectPromise(promise2,res,resolve,reject)
                        } catch (error) {
                            reject(error)
                        }
                      
                    }) 
                })
            }
           
        })
        return promise2
    }
    static resolve(parameter){
        if(parameter instanceof promise){
            return parameter
        }
        return new promise(resolve  =>{
            resolve(parameter)
        })
    }
    static reject(){
        return new promise(resolve  =>{
            reject(parameter)
        })
    }

}
function resolvePromise(promise2,x,resolve,reject){
    if(x === promise2){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof promise){

        x.then(resolve,reject)
    }else{
        resolve(x)
    }
}
function rejectPromise(promise2,x,resolve,reject){
    if(x === promise2){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof promise){ 
        x.then(resolve,reject)
    }else{
        reject(x)
    }
}
module.exports = promise