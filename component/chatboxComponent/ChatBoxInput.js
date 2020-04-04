import '../../scss/chatbox.scss'
import '../../scss/twiticon/style.css'

import React from 'React'

import chatUsingTmi from '../../methods/chat_using_tmi'
import ChatBoxAlert from './ChatBoxAlert';

import twiticonPortal from '../../methods/twiticon_portal/backend/twiticon_portal'
import tcf from '../../methods/twiticon_portal/frontend/tcf_for_twiticon';
import emoteData from '../../methods/twiticon_portal/frontend/emote_data'
import autoComplete from '../../methods/twiticon_portal/frontend/auto_complete'

export default class ChatBoxInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chat : '블러드트ㄹ',
            logMsg : '',
            logToggle : false
        }

        this.registerLog = this.registerLog.bind(this);
        this.turnOffLog = this.turnOffLog.bind(this);
        this.chatChangeHandler = this.chatChangeHandler.bind(this);

        this.CHATBOX_CHAT_INPUT_CLASSNAME = 'chatbox-chat-input' + ( typeof(props.type) === 'string' ? ('-' + props.type)  : '-unique' );
        this.CHATBOX_SEND_BUTTON_CLASSNAME = 'chatbox-send-button' + ( typeof(props.type) === 'string' ? ('-' + props.type) : '-unique' );
    }

    chatChangeHandler(msg){
        const curState = JSON.parse(JSON.stringify(this.state));
        curState.chat = msg;
        this.setState(curState);
    }

    registerSendEventListener(listener){
        const chatInput = document.getElementsByClassName(this.CHATBOX_CHAT_INPUT_CLASSNAME)[0];
        chatInput.addEventListener('keypress', (e) => {
            if(e.keyCode == 13){
                listener(e);
                e.preventDefault();
            }
        })
        const sendButton = document.getElementsByClassName(this.CHATBOX_SEND_BUTTON_CLASSNAME)[0];
        sendButton.addEventListener('click', (e) => listener(e));
    }

    registerLog(logMsg){
        const curState = JSON.parse(JSON.stringify(this.state));
        curState.logToggle = true;
        curState.logMsg = logMsg;
        this.setState(curState);

    }

    turnOffLog(){
        const curState = JSON.parse(JSON.stringify(this.state));
        curState.logToggle = false;
        this.setState(curState);
    }

    componentDidMount(){

        //채팅창 send event 등록

        var registerSendEventListener = this.registerSendEventListener.bind(this);

        if(this.props.cookie.name && this.props.cookie.twitchToken){
            
            var chat = chatUsingTmi({
                authToken : this.props.cookie.twitchToken,
                name : this.props.cookie.name
            });


            ((_this) => {
                chat.connectPromise.then(() => {
                    chat.readyChat('twiticon').then(() => {
                        
                        chat.registerLogFunction(_this.registerLog);
    
                        registerSendEventListener((e) => {
                            chat.sendChat(_this.state.chat)
                            _this.chatChangeHandler('');
                        })
                    })
                })
            })(this)
        }
        else{
            registerSendEventListener((e) => this.registerLog('로그인 후 이용해주세요'))
        }

        //트위티콘 차원문 작동 시작
        if(this.props.cookie.userId && this.props.cookie.twitchToken){
            twiticonPortal.init({
                authToken : this.props.cookie.twitchToken,
                id : this.props.cookie.userId
            })
        }
        else{
            twiticonPortal.init(null);
        }

        ((_this) => {
            twiticonPortal.refresh((response) => {

                emoteData.aliasLoad(response);

                if(tcf.register(_this.CHATBOX_CHAT_INPUT_CLASSNAME ,_this.chatChangeHandler)){
                    tcf.chatTarget.chat_input.addEventListener('click',autoComplete.onClick);
                    //newChat.chat_input.addEventListener('focusout',autoComplete.onFocusout);
                    tcf.chatTarget.chat_input.addEventListener('keydown', autoComplete.emotePickerChoiceEventListener);
                    tcf.chatTarget.chat_input.addEventListener('input', autoComplete.autoCompleteEventListener ); 
                    tcf.chatTarget.chat_input.addEventListener('keydown',autoComplete.keyDownListener);
                    tcf.chatTarget.chat_input.addEventListener('keyup',autoComplete.keyUpListener);
                    tcf.chatTarget.chat_input.addEventListener('input',autoComplete.emptyCheck);

                    registerSendEventListener((e) => autoComplete.clearChat());

                    tcf.chatTarget.chat_input.selectionStart  = _this.state.chat.length
                    tcf.chatTarget.chat_input.selectionEnd = _this.state.chat.length
                    tcf.chatTarget.chat_input.click();
                }
                else{
                    console.log('fail to load chatbox input');
                }

            })
        })(this)
    }

    render(){
        return (
            <div className = 'chatbox-chat-input-container'>
                <ChatBoxAlert 
                    logMsg = {this.state.logMsg}
                    logToggle = {this.state.logToggle}
                    turnOff = {this.turnOffLog}
                />
                <div className = {'chatbox-chat-input-wrapper '+ (this.state.logToggle ? 'chatbox-chat-input-alert' : '')}>
                    <textarea className = {'chatbox-chat-input ' + this.CHATBOX_CHAT_INPUT_CLASSNAME}
                        value = {this.state.chat}
                        onChange = {(e) => this.chatChangeHandler(e.target.value)}/>
                </div>
                <div className = {'chatbox-send-button ' + this.CHATBOX_SEND_BUTTON_CLASSNAME}>
                    채팅
                </div>
            </div>
        )
    }
}