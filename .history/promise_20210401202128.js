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
       
        const promise = new mypromise((res,rej) => {
            if(this.promiseState === FULFILLED){
                
                queueMicrotask(() => {
                    try {
                        const x = onResolved(this.data)
                        callback(promise,x,res,rej)
                    } catch (error) {
                        this.reject(error)
                    }
                    
                })
                
            }
            else if(this.promiseState === REJECTED){
                queueMicrotask(() => {
                    const x = onRejected(this.reason)
                    callback(promise,x,res,rej)
                })   
            }
            //处理异步代理
            else if(this.promiseState === PENDING){
                //存储到回调队列
                this.onResolvedCallback.push (onResolved)
                this.onRejectedCallback.push (onRejected)   
            }
        })
        return promise

    }
    //因为要采取链式调用，所以需要判断返回值类型并且判断是否是自身
    //这涉及了事件循环问题
    //可以采用eventloop，宏任务完成以后才会执行微任务
    
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