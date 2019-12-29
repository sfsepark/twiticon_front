export default (() => {
    var refreshPending = true;
    var refreshResolve , refreshReject ;
    var refreshPromise = new Promise(function(resolve, reject){
        refreshResolve = function(res){
            refreshPending = false;
            resolve(res);
        };
        refreshReject = function(res){
            refreshPending = false;
            reject(res);
        };
    });


    return {
        register : function(user_info){
            refreshResolve(user_info);
        },
        get : function(callback){
            refreshPromise.then(function(result){
                callback(result);
            }).catch(function(err){
                callback(err);
            });

            return true;
        }
    }
})()

//id 와 authToken 형태로 넘겨줘야한다.