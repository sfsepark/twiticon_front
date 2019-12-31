import ERROR from '../methods/error';
import EmoticonAlias from './EmoticonAlias';
import EmoticonAliasTextArea from './EmoticonAliasTextArea';

import '../scss/emoticonList.scss'

import {apiURL} from '../URL'

import ColorThief from '../methods/color-thief'

class EmoticonInfoView extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            color : null,
            info : JSON.parse(JSON.stringify(this.props.info)),
            edit : false,
            dispatch : 0
        }

        this.old_alias = this.props.info.alias_list;

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleClickEditState = this.handleClickEditState.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchDispatchState = this.switchDispatchState.bind(this);
    }

    switchDispatchState(curDispatch){
        var curState = JSON.parse(JSON.stringify(this.state));
        curState.dispatch = curDispatch;
        this.setState(curState);
    }

    handleChange(event , id){
        if(event.target.value.length > 6){
            alert('별칭은 최대 6글자까지만 가능합니다.');
            event.preventDefault();
        }
        else{
            if(this.state.dispatch == 0){
                var curState = JSON.parse(JSON.stringify(this.state));
                curState.info.alias_list[id] = event.target.value;
                this.setState(curState);
            }
        }
 
    }
    
    handleAdd(){
        if(this.state.dispatch == 0){
            if(this.state.info.alias_list.length < 5){
                var curState = JSON.parse(JSON.stringify(this.state));
                curState.info.alias_list.push('');
                this.setState(curState);
            }
        }
    }

    handleDelete(id){
        if(this.state.dispatch == 0){
            var curState = JSON.parse(JSON.stringify(this.state));
            curState.info.alias_list.splice(id, 1);
            this.setState(curState);
        }

    }

    handleClickEditState(){
        if(this.state.dispatch == 0){
            var curState = JSON.parse(JSON.stringify(this.state));
            curState.edit = !curState.edit;
            curState.info.alias_list = JSON.parse(JSON.stringify(this.old_alias));
            this.setState(curState);
        }
    }



    handleSubmit(){

        var switchDispatchState = this.switchDispatchState;

        var failSubmit = function(){
            switchDispatchState(0);
        }.bind(this);

        var terminateSubmit =  function(){
            switchDispatchState(0);
            this.old_alias = this.state.info.alias_list;
            this.handleClickEditState();
        }.bind(this);
        
        function checkAliasIntegrity(new_alias, old_alias){
            if(! Array.isArray(new_alias) && ! Array.isArray(old_alias)){
                throw ERROR.wrong_parameter;
            }

            if(new_alias.length > 5){
                throw ERROR.alias_number_over;
            }
        
            for(let i = 0 ; i < new_alias.length ; i ++){
                if(! (typeof(new_alias[i]) === 'string'))
                    throw ERROR.wrong_parameter;
                if(new_alias[i].length > 6)
                    throw ERROR.alias_length_over;
                if(new_alias[i].length <= 0)
                    throw ERROR.alias_empty;
                if(new_alias[i].match(/\s+/g) != null)
                    throw ERROR.wrong_parameter;
            }
        
            for(let i = 0 ; i < old_alias.length ; i ++){
                if(! (typeof(old_alias[i]) === 'string'))
                    throw ERROR.wrong_parameter;
                if(old_alias[i].match(/\s+/g) != null)
                    throw ERROR.wrong_parameter;
            }
        

        }

        if(this.state.dispatch == 0){
            switchDispatchState(1);

            var old_alias = this.old_alias;
            var new_alias = this.state.info.alias_list;

            try{
                checkAliasIntegrity(old_alias,new_alias);
            }
            catch(e){
                alert(e);
            }
            finally{
                var emote_id = this.state.info.id;
                var twitch_token = this.props.twitchToken;
    
                fetch( apiURL + '/api/update-alias', {
                    method : 'POST',
                    body : JSON.stringify({
                        emote_id : emote_id,
                        old_alias : old_alias,
                        new_alias : new_alias
                    }),
                    headers : {
                        'twitch-auth' : twitch_token,
                        'Content-Type': 'application/json'
                    }
                }
                ).then(response => response.json()
                ).then(response => {
    
                    if(response.hasOwnProperty('error')){
                        alert(response.msg);
                        failSubmit();
                    }
                    else{
                        terminateSubmit();
                    }
    
                }).catch(err => {
    
                    alert('통신에 장애가 있습니다. 네트워크 상황을 확인해주세요.');
    
                    failSubmit();
                });
            }

        }
    }

    componentDidMount(){
        var url  = 'https://static-cdn.jtvnw.net/emoticons/v1/' + this.state.info.id +  '/4.0';
        var color = ColorThief.getColor(url);
        ((_this) => {
            color.then((data) => {
                var curState = JSON.parse(JSON.stringify(_this.state));
                curState.color = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')'
                _this.setState(curState)
            }).catch();
        })(this)
        
    }

    render(){

        var aliasList;

        if(this.state.edit == false){
            aliasList = this.state.info.alias_list.map(alias => <EmoticonAlias alias = {alias} height = {39}/>)
        }
        else{

            var handleChange = this.handleChange;
            var handleDelete = this.handleDelete;

            aliasList = this.state.info.alias_list.map((alias,i) => 
            {
                return <EmoticonAliasTextArea 
                    alias = {alias}
                    key = {this.props.info.name + '-' + i}
                    index = {i}
                    handleChange = {handleChange}
                    handleDelete = {handleDelete}
                    height = {39}
                />
            })
        }

        var loader = null;

        if(this.state.dispatch == 1){
            loader = (
                <div className = 'emotcion-info-view-loader-container'>
                    <div className = 'emoticon-info-view-loader-wrapper'>
                        <div className = 'emoticon-info-view-loader'/>
                    </div>
                </div>
            )
        }

        var rightSection = null;

        if(this.state.info.fixed){
            rightSection = (
                <div className = 'emoticon-info-view-fixed'>
                    <div className = 'emoticon-info-view-fixed-log'>
                        관리자에 의해 별명이 확정되었습니다.
                    </div>
                    <div className = 'emoticon-info-view-fixed-svg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34.78" height="45.587" viewBox="0 0 34.78 45.587">
                        <g id="lock-padlock-symbol-for-protect_icon-icons.com_56926" transform="matrix(1, -0.017, 0.017, 1, -60.133, 2.143)">
                            <path id="패스_1" dataName="패스 1" d="M88.151,19.25V11a11,11,0,1,0-22,0v8.25a5.5,5.5,0,0,0-5.5,5.5V38.5a5.5,5.5,0,0,0,5.5,5.5h22a5.5,5.5,0,0,0,5.5-5.5V24.75A5.5,5.5,0,0,0,88.151,19.25ZM78.526,32.578v4.547a1.375,1.375,0,0,1-2.75,0V32.578A2.708,2.708,0,0,1,74.4,30.25a2.75,2.75,0,1,1,5.5,0A2.709,2.709,0,0,1,78.526,32.578ZM82.651,19.25h-11V11a5.5,5.5,0,1,1,11,0v8.25Z" fill="#b5b5b5" stroke="#fff" stroke-width="1"/>
                        </g>
                        </svg>
                    </div>
                </div>
            )
        }
        else{
            if(this.state.edit == false){
                rightSection = (
                    <div className = 'emoticon-info-edit-button edit-button'
                        onClick = {() => this.handleClickEditState()}>
                        <div className = 'emoticon-info-edit-txt'>
                            별명 이름 짓기
                        </div>
                    </div>
                )
            }
            else{
                rightSection = (
                    <div className = 'emoticon-info-editing'>
                        <div className = 'emoticon-submit-button edit-button'>
                            <div className = 'emoticon-info-edit-txt'
                                onClick = {() => this.handleSubmit()}>
                                변경
                            </div>
                        </div>
                        <div className = 'emoticon-cancle-button edit-button'
                            onClick = {() => this.handleClickEditState()}>
                            <div className = 'emoticon-info-edit-txt'>
                                취소
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className = 'emoticon-info-view-container' 
                style = {{

                        'borderLeft' : '15px solid ' + this.state.color
                    
                }}>
                {loader}
                <img src = "http://twiticon.com/logo.png" className = 'emoticon-info-view-logo'/>
                
                <div className = 'emoticon-info-view-left'>
                    <div className = 'emoticon-info-view-flex'>
                        <img 
                            src = {'https://static-cdn.jtvnw.net/emoticons/v1/' + this.state.info.id +  '/4.0'} 
                            className = 'emoticon-info-view-x4'/>
                        <div className = 'emoticon-info-view-contents'>
                            <div className = 'emoticon-info-view-title'>
                                <div className = 'emoticon-info-view-flex'>
                                    <img 
                                        src = {this.state.info.url}
                                        className = 'emoticon-info-view-icon'/>
                                    <div className = 'emoticon-info-view-name'>
                                        {this.state.info.name}
                                    </div>
                                </div>
                            </div>
                            <div className = 'emoticon-info-view-contents-label'>
                                {   this.state.edit 
                                    ? '트위티콘 수정 중 ...'
                                    : (this.state.info.alias_list.length > 0 ? 
                                    '이 트위티콘의 별명은..' : 
                                    '이 트위티콘의 별명이 아직 생성되지 않았습니다.')
                                }
                            </div>
                            <div className = 'emoticon-info-view-aliases'>
                                {aliasList}
                                {this.state.edit  && this.state.info.alias_list.length < 5
                                ? <div className = 'emoticon-info-view-add-button'
                                    onClick = {e => this.handleAdd()}>
                                    <svg className = 'emoticon-info-view-add-button-svg' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <g id="그룹_141" data-name="그룹 141" transform="translate(-601.5 -920.5)">
                                        <line id="선_7" data-name="선 7" x2="20" transform="translate(601.5 930.5)" fill="none" stroke="#fff" strokeWidth="5"/>
                                        <line id="선_8" data-name="선 8" y1="20" transform="translate(611.5 920.5)" fill="none" stroke="#fff" strokeWidth="5"/>
                                    </g>
                                    </svg>
                                    </div>
                                : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'emoticon-info-view-right'>
                    {rightSection}
                </div>
            </div>
        )
    }
}

export default EmoticonInfoView;