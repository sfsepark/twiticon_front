import auto_complete from "./auto_complete"
import tcf_for_twiticon from "./tcf_for_twiticon";

export default () => {
    
    const tcf = tcf_for_twiticon();
    const autoComplete = auto_complete(tcf);

    return {
        register : function(chatTargetClassName , setMethod, sendMethod, initChatLength){
            if(tcf.register(chatTargetClassName ,setMethod)){
                tcf.chatTarget.chat_input.addEventListener('click',autoComplete.onClick);
                //newChat.chat_input.addEventListener('focusout',autoComplete.onFocusout);
                tcf.chatTarget.chat_input.addEventListener('keydown', autoComplete.emotePickerChoiceEventListener);
                tcf.chatTarget.chat_input.addEventListener('input', autoComplete.autoCompleteEventListener ); 
                tcf.chatTarget.chat_input.addEventListener('keydown',autoComplete.keyDownListener);
                tcf.chatTarget.chat_input.addEventListener('keyup',autoComplete.keyUpListener);
                tcf.chatTarget.chat_input.addEventListener('input',autoComplete.emptyCheck);

                sendMethod((e) => autoComplete.clearChat());

                tcf.chatTarget.chat_input.selectionStart  = initChatLength
                tcf.chatTarget.chat_input.selectionEnd = initChatLength
                tcf.chatTarget.chat_input.click();
            }
            else{
                console.log('fail to load chatbox input');
            }
        },
        destroy : function(){

        }
    }
}