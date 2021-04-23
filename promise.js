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
    then(onFulfilled, onRejected) {
        const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

        // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
        const promise2 = new promise((resolve, reject) => {
            const fulfilledMicrotask = () =>  {
                // 创建一个微任务等待 promise2 完成初始化
                queueMicrotask(() => {
                    try {
                        // 获取成功回调函数的执行结果
                        const x = realOnFulfilled(this.value);
                        // 传入 resolvePromise 集中处理
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            const rejectedMicrotask = () => {
                // 创建一个微任务等待 promise2 完成初始化
                queueMicrotask(() => {
                    try {
                        // 调用失败回调，并且把原因返回
                        const x = realOnRejected(this.reason);
                        // 传入 resolvePromise 集中处理
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            // 判断状态
            if (this.status === FULFILLED) {
                fulfilledMicrotask()
            } else if (this.status === REJECTED) {
                rejectedMicrotask()
            } else if (this.status === PENDING) {
                // 等待
                // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
                // 等到执行成功失败函数的时候再传递
                this.onFulfilledCallbacks.push(fulfilledMicrotask);
                this.onRejectedCallbacks.push(rejectedMicrotask);
            }
        })

        return promise2;
    }


    catch(err){
        const p3 = new promise((res,rej) => {
            rej(err)
        })
        p3.then(undefined,r =>{
            console.log(r)
        })
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
    static all(arr){
        return new promise((res,rej) =>{
            let count = 0
            let resarr = []
            for (let i =0; i<arr.length;i++){
                arr[i].then(v => {
                    count ++
                    resarr = v
                    if(count === arr.length){
                        res(resarr)
                    }
                },e =>{
                    rej(e)
                })
            }
        })
    }
    static race(arr){
        return new promise((res,rej) =>{
            for (let i =0; i<arr.length;i++){
                arr[i].then(v => {
                    res(v)
                },e =>{
                    rej(e)
                })
            }
        })
    }



}
// MyPromise.js

// MyPromise.js

function resolvePromise(promise, x, resolve, reject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise === x) {
        return reject(new TypeError('The promise and the return value are the same'));
    }

    if (typeof x === 'object' || typeof x === 'function') {
        // x 为 null 直接返回，走后面的逻辑会报错
        if (x === null) {
            return resolve(x);
        }

        let then;
        try {
            // 把 x.then 赋值给 then
            then = x.then;
        } catch (error) {
            // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
            return reject(error);
        }

        // 如果 then 是函数
        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    x, // this 指向 x
                    // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                    y => {
                        // 如果 resolvePromise 和 rejectPromise 均被调用，
                        // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
                        // 实现这条需要前面加一个变量 called
                        if (called) return;
                        called = true;
                        resolvePromise(promise, y, resolve, reject);
                    },
                    // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    });
            } catch (error) {
                // 如果调用 then 方法抛出了异常 error：
                // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
                if (called) return;

                // 否则以 error 为据因拒绝 promise
                reject(error);
            }
        } else {
            // 如果 then 不是函数，以 x 为参数执行 promise
            resolve(x);
        }
    } else {
        // 如果 x 不为对象或者函数，以 x 为参数执行 promise
        resolve(x);
    }
}





promise.deferred = function () {
    var result = {};
    result.promise = new promise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });

    return result;
}
module.exports = promise