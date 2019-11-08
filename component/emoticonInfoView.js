import ERROR from '../methods/error';
import EmoticonAlias from './EmoticonAlias';
import EmoticonAliasTextArea from './EmoticonAliasTextArea';

import '../scss/emoticonList.scss'

import {apiURL} from '../URL'

class EmoticonInfoView extends React.Component{
    constructor(props){
        super(props);

        this.state = {
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
        if(this.state.dispatch == 0){
            var curState = JSON.parse(JSON.stringify(this.state));
            curState.info.alias_list[id] = event.target.value;
            this.setState(curState);
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
            this.setState(curState);
        }
    }



    handleSubmit(){

        var failSubmit = function(){
            switchDispatchState(0);
        }.bind(this);

        var terminateSubmit =  function(){
            switchDispatchState(0);
            this.old_alias = this.state.info.alias_list;
        }.bind(this);
        
        function checkAliasIntegrity(new_alias, old_alias){
            if(! Array.isArray(new_alias) && ! Array.isArray(old_alias)){
                throw ERROR.wrong_parameter;
            }

            for(let i = 0 ; i < new_alias.length ; i ++){
                if(! (typeof(new_alias[i]) === 'string'))
                    throw ERROR.wrong_parameter;
                if(new_alias[i].length > 5)
                    throw ERROR.alias_length_over;
                if(new_alias[i].match(/\s+/g) != null)
                    throw ERROR.wrong_parameter;
            }

            for(let i = 0 ; i < old_alias.length ; i ++){
                if(! (typeof(old_alias[i]) === 'string'))
                    throw ERROR.wrong_parameter;
                if(old_alias[i].length > 5)
                    throw ERROR.alias_length_over;
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

    render(){

        var aliasList;

        if(this.state.edit == false){
            aliasList = this.state.info.alias_list.map(alias => <EmoticonAlias alias = {alias}/>)
        }
        else{
            let aliasKey = 0;

            aliasList = this.state.info.alias_list.map(alias => 
            {
                aliasKey ++;

                return <EmoticonAliasTextArea 
                    alias = {alias}
                    key = {aliasKey}
                    id = {aliasKey}
                    handleChange = {handleChange}
                    handleDelete = {handleDelete}
                />
            })
        }

        var loader = null;

        if(this.state.dispatch == 1){
            loader = (
                <div className = 'emotcion-info-view-lodaer-container'>
                    <div className = 'emoticon-info-view-loader-wrapper'>
                        <div className = 'emoticon-info-view-loader'/>
                    </div>
                </div>
            )
        }

        return (
            <div className = 'emoticon-info-view-container'>
                {loader}
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
                                {this.state.info.alias_list.length > 0 ? 
                                    '이 트위티콘의 별명은..' : 
                                    '이 트위티콘의 별명이 아직 생성되지 않았습니다.'}
                            </div>
                            <div className = 'emoticon-info-view-aliases'>
                                {aliasList}
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'emoticon-info-view-right'>

                </div>
            </div>
        )
    }
}

export default EmoticonInfoView;