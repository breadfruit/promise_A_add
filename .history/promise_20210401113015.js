var mypromise = function(excutor){
    //属性
    this.promiseState = 'pending'
    this.promiseResult = null
    //构造函数
    constructor = function(){
        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    console.log(this)

    executor = function(resolve,reject){
        
    }
    function resolve(data){
        this.promiseResult = data
        this.promiseState = 'fulfilled'
        

    }
    function reject(reponse){
        this.promiseResult = reponse
        this.promiseState = 'rejected'
    }
}
mypromise.prototype.catch = function(){

}
mypromise.prototype.then = function(onResolved,onRejected){
    //判断
}