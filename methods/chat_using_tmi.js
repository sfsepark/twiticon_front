import tmi from 'tmi.js'

export default function(user_info) {
    var msg_KR_dict = {
        msg_banned : "이 방에서 영구히 정지당하였습니다.",
        msg_duplicate : "30초 이내에 보낸 메시지와 내용이 같은 메시지입니다.",
        msg_ratelimit : '메시지를 너무 빨리 보냈습니다.'
    }

    var join_cache = (function(){

        var cache = [];

        return {
            join : function(channel){
                return new Promise(function(resolve, reject){

                    if(cache.includes(channel)){
                        var index = cache.indexOf(channel);
                        if (index !== -1) cache.splice(index, 1);
                    }

                    if(!chatClient.getChannels().includes('#' + channel))
                    {
                        chatClient.join(channel).then(function(data){
                            cache.push(channel);
                            resolve(channel);
                        }).catch(function(data){
                            reject(data);
                        })                          
                    }
                    else{
                        cache.push(channel);
                        resolve(channel);
                    }

                    if(cache.length > 5){
                        var victim = cache.shift();
                        chatClient.part(victim);
                    }
                       
                });
            }
        };
    })();

    var connectPromise = null;
    var chatClient = null;
    var logFunction = null;

    var addChatLog = function(message){
        if(logFunction){
            logFunction(message);
        }
    }

    var connectPromise = new Promise(function(resolve, reject){

        function connect(){
            var authToken = user_info.authToken;
            var userName = user_info.name;
    
            var chatClientOptions = {
                options: {
                    debug: false
                },
                connection: {
                    reconnect: true,
                    secure : true
                },
                identity: {
                    username: userName,
                    password: "oauth:" + authToken
                }
            }
    
            chatClient = new tmi.client(chatClientOptions);            
            var chatClientPromise = chatClient.connect();
            chatClientPromise.then(() => resolve(true));
            
            chatClientPromise.then(function(result){
                
                chatClient.on("notice", function(channel, msgid, message){
                    console.log(msgid);
                    if(msg_KR_dict[msgid]){
                        addChatLog(msg_KR_dict[msgid])
                    }
                    else{
                        addChatLog(message);
                    }
                });
                
            });
            
        }

   
        if(chatClient != null){
            chatClient.disconnect();
        }

        if(user_info != null)
        { 
            if(user_info.authToken != null){
                connect();
            }
            else{
                chatClient = null;
                resolve(true); // 유저가 로그인 되어있지 않더라도 chatMethod는 작동해야한다.(단, 채팅은 보내지면 안 됨)
            }
        }
        else{
            chatClient = null;
            resolve(false);
        }
        
    
    });

    var chatClientConnected = false;
    var chatClientChannel = '';

    return {
        sendChat :
            function(message)
            {
                if(chatClientConnected && chatClientChannel != '')
                {
                    chatClient.say(chatClientChannel, message);
                }
            },

        readyChat :
            function(channel)
            {
                return new Promise((resolve, reject) => {
                    if(chatClient != null)
                    {
                        connectPromise.then(function(){
                            join_cache.join(channel).then(function(channel){
                                chatClientChannel = channel;
                                chatClientConnected = true;
                                resolve();
                            }).catch(function(err){
                                reject();
                            })
                        });
                    }
                    else{
                        reject();
                    }
                });

            },
        
        //트위치 이모티콘을 이용한 chatMethod에서만 pause/restart 기능이 필요하다.
        pauseReadyChat : function(){ },
        restartReadyChat :  function()  { },
    
        cleanUpReadyChat :
            function()
            {
                chatClientConnected = false;
                chatClientChannel = '';
            },
        connectPromise : connectPromise,
        registerLogFunction(func){
            logFunction = func;
        }
    }
}