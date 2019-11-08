import React from 'react'
import '../scss/emoticonSelector.scss'
import Emoticon from './emoticon'
import Hangul from '../methods/hangul.min'

/*
    streamerInfo의 state emoticonInfo(필터링되어 아래에 나열되는 이모티콘정보)
    streamerInfo의 props emoticonInfo = 
        EmoticonSelector의 emoticonInfo (원본 데이터. 절대 수정하면 안됨)
    EmoticonSelector의 emoticonInfo(search bar에 대응되는 이모티콘 리스트)
*/

class EmoticonSelector extends React.Component{

    constructor(props ){
        super(props);

        this.state = {
            search : ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    isEmoteName(emote,searchStr){
        return emote.name.toLowerCase().includes(searchStr);
    }

    isEmoteAlias(emote, searchStr){
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

    handleChange(event){
        var curState = JSON.parse(JSON.stringify(this.state));
        curState.search = event.target.value;

        this.setState(curState)
    }

    render(){

        var emoticonSets = Object.values(this.props.emoticonInfo);

        var emoticonLists = emoticonSets.map(
            emoticonInfos => emoticonInfos.map(
                info =>   (
                    <div className = 'emoticon-wrapper-button'>
                        <Emoticon 
                            info = {info}/>
                    </div>
                )
            ))

        var emoticonTable = (
            <div className='emoticon-table'>
                <div className = 'emoticon-tier-1-table'>
                        {emoticonLists[0]}
                </div>
                <div className = 'emoticon-tier-2-table'>
                    {emoticonLists[1]}
                </div>
                <div className = 'emoticon-tier-3-table'>
                    {emoticonLists[2]}
                </div>
            </div>
        )
        

        return (
            <div className = 'emoticon-selector-container'>
                <div className = 'emoticon-selector-search'>
                    <div className = 'emoticon-selector-flex'>
                        <div className = 'emoticon-selector-searchmark'>
                            <svg className='emoticon-selector-searchmark-svg' xmlns="http://www.w3.org/2000/svg" width="21.285" height="24.845" viewBox="0 0 21.285 24.845">
                            <g id="icon_search" transform="translate(1.5 1.5)">
                                <path id="패스_1551" data-name="패스 1551" d="M0,0,4.622,5.424" transform="translate(14.021 16.948)" fill="none" stroke="#b9b9b9" stroke-width="3"/>
                                <ellipse id="타원_1" data-name="타원 1" cx="8.736" cy="8.987" rx="8.736" ry="8.987" transform="translate(0 0)" fill="none" stroke="#e5e5e5" stroke-miterlimit="10" stroke-width="3"/>
                            </g>
                            </svg>
                        </div>
                        <textarea placeholder='이모티콘 검색' className = 'emoticon-selector-searchbar' value = {this.state.search} onChange={this.handleChange}>
                            
                        </textarea>
                    </div>
                </div>
                <div className = 'emoticon-selector-list'>
                    {emoticonTable}
                </div>

            </div>
        );
        
    }
}

export default EmoticonSelector;