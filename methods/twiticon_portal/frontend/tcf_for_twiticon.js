//twitch chat framework의 기능을 트위티콘 사이트에 맞게 개조

export default (() => {

    var chatTarget = {
        chat_input : null
    }

    var setTextMethod = null;

    return {
        register : function(chatTargetClassName , setMethod){
            var chatInput = document.getElementsByClassName(chatTargetClassName)[0];
            if(chatInput == undefined){
                return false;
            }
            else{
                chatTarget.chat_input = chatInput;
            }

            if(setMethod == undefined){
                return false;
            }
            else{
                setTextMethod = setMethod;
            }

            return true;
        },
        chatTarget : chatTarget,
        get chatText(){
            return chatTarget.chat_input.value;
        },
        set chatText(text){
            setTextMethod(text);
        },
        get chatCursor(){
            return chatTarget.chat_input.selectionEnd;
        },
        set chatCursor(pos){
            chatTarget.chat_input.selectionEnd = pos;
        },
        
    }
});