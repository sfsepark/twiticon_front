import EmoticonInfoView from './EmoticonInfoView'
import {Dropdown} from 'react-bootstrap'
import '../../scss/dropdown.scss'

import '../../scss/emoticonList.scss';

class EmoticonList extends React.Component{
    constructor(props){
        super(props);
        var emoticonInfoValues = Object.values(this.props.emoticonInfo);

        var emoticonList = [];

        for(var i = 0 ; i < emoticonInfoValues.length ; i ++){
            emoticonList = emoticonList.concat(emoticonInfoValues[i]);
        }

        this.state = {
            emoticonList : emoticonList,
            type : '등록일자순'
        }

        this.sortEmoticonList = this.sortEmoticonList.bind(this);

    }

    sortEmoticonList(type, sortFunc){
        var curState = JSON.parse(JSON.stringify(this.state));
        curState.emoticonList = curState.emoticonList.sort(sortFunc);
        curState.type = type;
        this.setState(curState)
    }

    render(){

        var twitchToken = this.props.twitchToken;
    
        var activeEmoticon = this.props.activeEmoticon;

        var emoticonListComponent = this.state.emoticonList.map(info => {
                return (
                    <div key = {'emoticon-info-container-' + info.id} className = {'emoticon-info-view' + (activeEmoticon.includes(info.id) ? '-visible' : '-invisible')}>
                        <EmoticonInfoView 
                            info = {info}
                            twitchToken = {twitchToken}/>
                    </div>
                )
            }
        )
    
        return (
            <div className = 'streamer-info-container'>
                <div className = 'streamer-info-container-header'>
                    <div className = 'streamer-info-container-header-title'>
                        <img className = 'streamer-info-cotinaer-header-img' src = 'https://twiticon.com/images/logo.png'/>
                        <div className = 'streamer-info-container-header-title-txt'>
                            트위티콘 리스트
                        </div>
                    </div>
                    <div className = 'streamer-info-container-header-sort'>
                        <div className = 'streamer-info-container-header-sort-txt'>
                            정렬
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.type}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    onClick = {
                                        () => this.sortEmoticonList('등록일자순',(a,b) => {
                                             return  a.id- b.id
                                        }
                                    )
                                    }>등록일자순</Dropdown.Item>
                                <Dropdown.Item onClick = {
                                        () => this.sortEmoticonList('등록일자역순',(a,b) => {
                                             return  b.id- a.id
                                        }
                                    )}>등록일자역순</Dropdown.Item>
                                <Dropdown.Item onClick = {
                                    () => this.sortEmoticonList('별명이있는것부터',(a,b) => {
                                            if(b.alias_list.length == 0 && a.alias_list.length == 0){
                                                return 0;
                                            }
                                            else if(b.alias_list.length > 0 && a.alias_list.length > 0){
                                                return 0;
                                            }
                                            return  b.alias_list.length - a.alias_list.length
                                    }
                                )}>별명이있는것부터</Dropdown.Item>
                                <Dropdown.Item onClick = {
                                    () => this.sortEmoticonList('별명이없는것부터',(a,b) => {
                                            if(b.alias_list.length == 0 && a.alias_list.length == 0){
                                                return 0;
                                            }
                                            else if(b.alias_list.length > 0 && a.alias_list.length > 0){
                                                return 0;
                                            }
                                            return   a.alias_list.length - b.alias_list.length 
                                    }
                                )}>별명이없는것부터</Dropdown.Item>
                                <Dropdown.Item onClick = {
                                    () => this.sortEmoticonList('수정가능',(a,b) => {
                                            if(b.fixed != a.fixed){
                                                return -1;
                                            }
                                            else  return  0;
                                    }
                                )}>수정가능</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> 
                    </div>
                </div>
                {emoticonListComponent}
            </div>
        )

    }
}

export default EmoticonList
