import '../../scss/chatbox.scss'
import '../../scss/twiticon/style.css'

import React from 'React'

import chatUsingTmi from '../../methods/chat_using_tmi'
import ChatBoxAlert from './ChatBoxAlert';

import portal_for_twiticon from '../../methods/twiticon_portal/frontend/portal_for_twiticon';
import shortcut_background from '../../methods/twiticon_portal/backend/shortcut_background';

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
        this.registerSendEventListener = this.registerSendEventListener.bind(this);

        this.CHATBOX_CHAT_INPUT_CLASSNAME = 'chatbox-chat-input' + ( typeof(props.type) === 'string' ? ('-' + props.type)  : '-unique' );
        this.CHATBOX_SEND_BUTTON_CLASSNAME = 'chatbox-send-button' + ( typeof(props.type) === 'string' ? ('-' + props.type) : '-unique' );

        this.twiticonPortal = portal_for_twiticon();
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

        shortcut_background.get(() => {
            this.twiticonPortal.register(this.CHATBOX_CHAT_INPUT_CLASSNAME, this.chatChangeHandler,this.registerSendEventListener , this.state.chat.length);
        })
    }

    componentWillUnmount(){
        this.twiticonPortal.destroy();
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