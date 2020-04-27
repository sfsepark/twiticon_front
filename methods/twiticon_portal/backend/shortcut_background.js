import alias_info from "./alias_info"
import emoteInfo from './emote_info'
import userInfo from './user_info'

export default (function() {

    return {
        get : alias_info.get,
        init : function(user_info){
            userInfo.register(user_info)
            emoteInfo.refresh();
        }
    }
}())