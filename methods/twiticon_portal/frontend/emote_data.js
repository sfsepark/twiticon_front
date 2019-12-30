export default (() => {

    var EmoteInfoList = null;
    var EmoteAliasList = null;
    var EmoteRegexList = null;
    var EmoteAutoCompleteTable = null ;

    return {

        aliasLoad :(emoteData) => {
            EmoteInfoList = emoteData['info'];
            EmoteAliasList = emoteData['alias'];
            EmoteRegexList = emoteData['regex'];
            EmoteAutoCompleteTable = emoteData['autocomplete'];
        },
        get EmoteAliasList(){
            return EmoteAliasList
        },
        get EmoteInfoList(){
            return EmoteInfoList
        } ,
        get EmoteRegexList(){
            return EmoteRegexList
        },
        get EmoteAutoCompleteTable(){
            return EmoteAutoCompleteTable
        } 
    }
})()