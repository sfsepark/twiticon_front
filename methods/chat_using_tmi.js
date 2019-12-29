import tmi from 'tmi.js'

export default function(user_info) {
    var msg_KR_dict = {
        msg_banned : "이 방에서 영구히 정지당하였습니다."
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

    var addChatLog = function(logDiv, message){

    }

    var connectPromise = new Promise(function(resolve, reject){

        console.log(user_info);

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
                    /*
                    if(chatTarget.frame != null){
                        console.log('notice : ',channel,msgid, message);
                        var parentFrame = chatTarget.frame.parentElement;
                        var chatLine = parentFrame.getElementsByClassName('chat-list__lines')[0];
                        var logLine = chatLine.getElementsByClassName('tw-flex-grow-1 tw-full-height tw-pd-b-1')[0];

                        if(logLine.getAttribute('role') == 'log'){
                            addChatLog(logLine,message);                            
                        }
                    }*/
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


    var chatClient = null;
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
                                console.log(err);
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
        connectPromise : connectPromise
            
    }
}