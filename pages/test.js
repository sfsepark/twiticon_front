
import Emoticon from '../component/emoticon'
import Hangul from '../methods/hangul.min'

export default () => {

    function isEmoteAlias(emote, searchStr){
        var alias_list = emote.alias_list;
        for(var i = 0 ; i < alias_list ; i ++){
            let alias = alias_list[i];
            let aliasTokens = alias.split('');
            let disassembledLen = aliasTokens.map(token => Hangul.disassemble(token).length);
            
            let res = Hangul.search(alias,searchStr);


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
    console.log(isEmoteAlias('안녕하세요','안녀'));
    return null;
}