
import Hangul from '../methods/hangul.min'
function queryLikeName(emote,searchStr){
    return emote.name.toLowerCase().includes(searchStr.toLowerCase());
}

function queryLikeAlias(emote, searchStr){
    var alias_list = emote.alias_list;
    for(var i = 0 ; i < alias_list.length ; i ++){
        let alias = alias_list[i].toLowerCase();
        let aliasTokens = alias.split('');
        let disassembledLen = aliasTokens.map(token => Hangul.disassemble(token).length);
        
        let res = Hangul.search(alias,searchStr.toLowerCase());


        if(res != -1){
            while(disassembledLen.length > 0 && res >= 0){
                if(res == 0) return true;
                var curLen = disassembledLen.shift();

                res -= curLen;                    
            }
        }
    }

    return false;
}

export default {
    queryLikeAlias : queryLikeAlias,
    queryLikeName : queryLikeName
}