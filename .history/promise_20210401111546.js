var mypromise = function(excutor){
    //属性
    this.promiseState = 'pending'
    this.promiseResult = null
    try {
        excutor(resolve,reject)
    } catch (error) {
        reject(error)
    }

    //
    function resolve(data){
        return data
    }
    function reject(reponse){
        return reponse
    }
}