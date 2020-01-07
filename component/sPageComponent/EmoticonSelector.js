import React from 'react'
import '../../scss/emoticonSelector.scss'
import Emoticon from '../Emoticon'

import checkEmote from '../../methods/checkEmote'

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
            search : '',
            dropdown : 0 // 0 : init , 1 : open , 2 : close
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClickDropdown = this.handleClickDropdown.bind(this);
    }

    handleChange(event){
        var value = event.target.value;
        var curState = JSON.parse(JSON.stringify(this.state));
        curState.search = event.target.value;

        var emoticonIds = [];

        if(value != ''){
            var emoticonLists = Object.values(this.props.emoticonInfo);
            var filteredEmoticonLists = emoticonLists.map(emoticonList => (
                    emoticonList.filter(
                        emoticonInfo =>
                            checkEmote.queryLikeAlias(emoticonInfo,value) || 
                            checkEmote.queryLikeName(emoticonInfo,value)
                    )
                )
            );
    
            for(var i = 0 ; i < filteredEmoticonLists.length ; i ++){
                var filteredEmoticonList = filteredEmoticonLists[i];
                var filteredEmoticonIds = filteredEmoticonList.map(emoticonInfo => emoticonInfo.id);
                emoticonIds = emoticonIds.concat(filteredEmoticonIds);
            }    
        }
        else{
            emoticonIds = undefined;
        }

        this.props.handleSelectEmoticon(emoticonIds);

        this.setState(curState)
    }

    handleClickDropdown(){
        var curState = JSON.parse(JSON.stringify(this.state));
        if(curState.dropdown == 0){
            curState.dropdown = 1;
        }
        else if(curState.dropdown == 1){
            curState.dropdown = 2;
        }
        else{
            curState.dropdown = 1;
        }
        this.setState(curState)
    }

    render(){

        var emoticonSets = Object.values(this.props.emoticonInfo);
        var activeEmoticon = this.props.activeEmoticon;
        var handleSelectEmoticon = this.props.handleSelectEmoticon;

        var emoticonLists = emoticonSets.map(
            emoticonInfos => emoticonInfos.map(
                info =>   (
                    <div key = {'emoticon-selector-info-' + info.id} 
                        className = {'emoticon-wrapper-button-' + (activeEmoticon.includes(info.id) ? 'visible' : 'invisible')}
                        onClick = {() => {
                            if(activeEmoticon.length == 1 && activeEmoticon[0] == info.id)
                                handleSelectEmoticon(undefined)
                            else
                                handleSelectEmoticon([info.id])
                            }
                        }>
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
            <div className = {'emoticon-selector-container ' +(
                this.state.dropdown != 1 
                ? (this.state.dropdown == 0 
                ? 'emoticon-selector-container-init'
                : 'emoticon-selector-container-open')
                : 'emoticon-selector-container-close'
            ) }>
                <div className = 'emoticon-selector-search'>
                    <div className = 'emoticon-selector-flex'>
                        <div className = 'emoticon-selector-searchmark'>
                            <svg className='emoticon-selector-searchmark-svg' xmlns="http://www.w3.org/2000/svg" width="21.285" height="24.845" viewBox="0 0 21.285 24.845">
                            <g id="icon_search" transform="translate(1.5 1.5)">
                                <path id="패스_1551" data-name="패스 1551" d="M0,0,4.622,5.424" transform="translate(14.021 16.948)" fill="none" stroke="#b9b9b9" strokeWidth="3"/>
                                <ellipse id="타원_1" data-name="타원 1" cx="8.736" cy="8.987" rx="8.736" ry="8.987" transform="translate(0 0)" fill="none" stroke="#e5e5e5" strokeMiterlimit="10" strokeWidth="3"/>
                            </g>
                            </svg>
                        </div>
                        <textarea placeholder='이모티콘 검색' className = 'emoticon-selector-searchbar' value = {this.state.search} onChange={this.handleChange}>
                            
                        </textarea>
                        <div className = {'emoticon-selector-mobile-dropdown ' 
                            + (
                                this.state.dropdown != 1 
                                ? (this.state.dropdown == 0 
                                ? 'emoticon-selector-mobile-dropdown-close'
                                : 'emoticon-selector-mobile-dropdown-open')
                                : 'emoticon-selector-mobile-dropdown-close'
                            )}
                            onClick = {() => this.handleClickDropdown()}/>
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