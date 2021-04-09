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
        try {
            executor(this.resolve,this.reject)
        } catch (error) {
            this.reject(error)
        }
        
    }
    //状态只能改变一次
   
    resolve = (data) =>{
        if (this.promiseState === PENDING){
            this.promiseState = FULFILLED
            this.data = data
            
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
        onResolved = typeof onResolved === 'function' ? onResolved : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
        const promise = new mypromise((res,rej) => {
            if(this.promiseState === FULFILLED){
                
                queueMicrotask(() => {
                    try {
                        const x = onResolved(this.data)
                        callback(promise,x,res,rej)
                    } catch (error) {
                       
                        rej(error)
                    }
                    
                })
                
            }
            else if(this.promiseState === REJECTED){
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reason)
                        callback(promise,x,res,rej)
                    } catch (error) {
                        rej(error)
                    }
                    
                })   
            }
            //处理异步代理
            else if(this.promiseState === PENDING){
                //存储到回调队列
                this.onResolvedCallback.push (() => {
                    try {
                        const x = onResolved(this.reason)
                        callback(promise,x,res,rej)
                    } catch (error) {
                        rej(error)
                    }
                })
                this.onRejectedCallback.push (() => {
                    try {
                        const x = onRejected(this.reason)
                        callback(promise,x,res,rej)
                    } catch (error) {
                        rej(error)
                    }
                })   
            }
        })
        return promise

    }
    //因为要采取链式调用，所以需要判断返回值类型并且判断是否是自身
    //这涉及了事件循环问题
    //可以采用eventloop，宏任务完成以后才会执行微任务
    static resolve (params) {
            // 如果传入 MyPromise 就直接返回
        if (params instanceof mypromise) {
            return parameter;
        }
    
        // 转成常规方式
        return new mypromise(resolve =>  {
            resolve(params);
        });

    }
    static reject (params) {
        
    }
    
}

function callback (promiseother,x,resolve,reject){
    if(promiseother === x){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof mypromise){
        x.then(resolve,reject)
    }else{
        resolve(x)
    }
}
