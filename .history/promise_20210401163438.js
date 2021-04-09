const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class mypromise {
    promiseState = PENDING
    data = null
    reason = null
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
}