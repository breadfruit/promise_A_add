var mypromise = function(excutor){
    //属性
    this.promiseState = 'pending'
    this.promiseResult = null
    //构造函数
    constructor = function(){
        try {
            excutor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }


    //
    excutor = function(resolve,reject){

    }
    function resolve(data){
        return data
    }
    function reject(reponse){
        return reponse
    }
}
mypromise.prototype.catch = function(){

}
mypromise.prototype.then = function(onResolved,onRejected){
    //判断
}