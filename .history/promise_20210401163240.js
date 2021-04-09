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
    resolve = (data) =>{
        this.promiseState = FULFILLED
        this.data = data
    }
    reject = (reason) => {
        this.promiseState = REJECTED
        this.reason = reason
    }
}