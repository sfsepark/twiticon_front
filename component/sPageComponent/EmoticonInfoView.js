import ERROR from '../../methods/error';

import '../../scss/emoticonList.scss'
import '../../scss/mobileEmoticonList.scss'

import {apiURL} from '../../URL'

import ColorThief from '../../methods/color-thief'
import ButtonPannel from './emoteViewComponent/ButtonPannel'
import AliasContainer from './emoteViewComponent/AliasContainer';
import EmoteTitle from './emoteViewComponent/EmoteTitle';

import Router from 'next/router';

import cookies from '../../methods/cookies'

class EmoticonInfoView extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            color : undefined,
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
            if(this.props.twitchToken == null){
                let result = confirm('로그인 후 진행 가능합니다. \n로그인하시겠습니까?');

                if(result){
                    cookies.setCookie('history', window.location.pathname);
                    Router.push("/login");
                }
            }
            else{
                var curState = JSON.parse(JSON.stringify(this.state));
                curState.edit = !curState.edit;
                curState.info.alias_list = JSON.parse(JSON.stringify(this.old_alias));
                this.setState(curState);
            }

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
                }).then(res => res.json()
                ).then(response => {

    
                    if(response.hasOwnProperty('error')){
                        let msg = response.msg ? response.msg : response.message;
                        alert(msg);
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

        var aliasContainer = 
            <AliasContainer
                edit = {this.state.edit}
                alias_list  = {this.state.info.alias_list}
                name = {this.props.info.name}
                handleChange = {this.handleChange}
                handleDelete = {this.handleDelete}
                handleAdd = {this.handleAdd}
            />;

        var loader = null;

        if(this.state.dispatch == 1){//  true){//   
            loader = (
                <div className = 'emotcion-info-view-loader-container'>
                    <div className = 'emoticon-info-view-loader-wrapper'>
                        <div className = 'emoticon-info-view-loader'/>
                    </div>
                </div>
            )
        }

        var buttonPannel =  
            <ButtonPannel 
                fixed = {this.state.info.fixed}
                edit = {this.state.edit}
                handleClickEditState = {this.handleClickEditState}
                handleSubmit = {this.handleSubmit}
            />

        var emoticonTitle = 
            <EmoteTitle url = {this.state.info.url} name = {this.state.info.name}/>

        return <React.Fragment>
            {/* PC 버전 (min-width : 881px) */}          
            <div className = 'emoticon-info-view-container' 
                style = {{
                        'borderLeft' : '15px solid ' + this.state.color
                }}>
                {loader}
                <img src = "https://twiticon.com/images/logo.png" className = 'emoticon-info-view-logo'/>
                
                <div className = 'emoticon-info-view-left'>
                    <div className = 'emoticon-info-view-flex'>
                        <img 
                            src = {'https://static-cdn.jtvnw.net/emoticons/v1/' + this.state.info.id +  '/4.0'} 
                            className = 'emoticon-info-view-x4'/>
                        <div className = 'emoticon-info-view-contents'>
                            {emoticonTitle}
                            <div className = 'emoticon-info-view-contents-label'>
                                {   this.state.edit 
                                    ? '트위티콘 수정 중 ...'
                                    : (this.state.info.alias_list.length > 0 ? 
                                    '이 트위티콘의 별명은..' : 
                                    '이 트위티콘의 별명이 아직 생성되지 않았습니다.')
                                }
                            </div>
                            {aliasContainer}
                        </div>
                    </div>
                </div>
                <div className = 'emoticon-info-view-right'>
                    {buttonPannel}
                </div>
            </div>

            {/* 모바일 버전  (max-width : 880px) */} 
            <div className = {'emoticon-info-view-container mobile-emoticon-info-view-container ' + (this.state.info.fixed ? 'mobile-emoticon-info-view-container-fixed' : '')}
                style = {{
                        'borderLeft' : '15px solid ' + this.state.color
                }}>
                {loader}
                <img src = "https://twiticon.com/images/logo.png" className = 'emoticon-info-view-logo'/>
                {
                    this.state.info.alias_list.length == 0 && ! this.state.edit  && !this.state.info.fixed 
                    ? <div className = 'mobile-emoticon-info-view-empty'>
                        <div className = 'mobile-emoticon-info-view-empty-left'>
                            <img 
                                src = {'https://static-cdn.jtvnw.net/emoticons/v1/' + this.state.info.id +  '/4.0'} 
                                className = 'emoticon-info-view-x4'/>
                            {emoticonTitle}
                        </div>
                        <div className = 'mobile-emoticon-info-view-empty-right'>
                            <div className = 'mobile-emoticon-info-view-empty-txt'>
                                이 트위티콘의 <br className = 'mobile-emoticon-info-view-empty-br'/>별명이 없습니다.
                            </div>
                            {buttonPannel}
                        </div> 
                    </div>
                    : (
                        <React.Fragment>
                            {buttonPannel}
                            {emoticonTitle}
                            <div className = 'emoticon-info-view-flex'>
                                <img 
                                    src = {'https://static-cdn.jtvnw.net/emoticons/v1/' + this.state.info.id +  '/4.0'} 
                                    className = 'emoticon-info-view-x4'/>
                                <div className = 'mobile-emoticon-info-view-info-section'>
                                    <div className = 'mobile-emoticon-info-view-label'>
                                        {   

                                            this.state.edit 
                                            ? '트위티콘 수정 중 ...'
                                            : (this.state.info.alias_list.length > 0 ? 
                                            '이 트위티콘은..' : 
                                            '')
                                        }
                                    </div>
                                    {aliasContainer}
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
            
        </React.Fragment>
    }
}

export default EmoticonInfoView;
