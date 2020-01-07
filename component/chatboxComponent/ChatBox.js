import '../../scss/chatbox.scss'
import '../../scss/twiticon/style.css'

import RightTriangle from '../RightTriangle';

import chatUsingTmi from '../../methods/chat_using_tmi'
import ChatBoxAlert from './ChatBoxAlert';
import Link from 'next/link';
import twiticonPortal from '../../methods/twiticon_portal/backend/twiticon_portal'
import tcf from '../../methods/twiticon_portal/frontend/tcf_for_twiticon';
import emoteData from '../../methods/twiticon_portal/frontend/emote_data'
import autoComplete from '../../methods/twiticon_portal/frontend/auto_complete'

export default class ChatBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chat : '블러드트ㄹ',
            height : this.props.height,
            logMsg : '',
            logToggle : false
        }

        this.heightChange = this.heightChange.bind(this);
        this.registerLog = this.registerLog.bind(this);
        this.turnOffLog = this.turnOffLog.bind(this);
        this.chatChangeHandler = this.chatChangeHandler.bind(this);
        this.offsetHeight = 0;
    }

    chatChangeHandler(msg){
        const curState = JSON.parse(JSON.stringify(this.state));
        curState.chat = msg;
        this.setState(curState);
    }

    heightChange(height){
        const curState = JSON.parse(JSON.stringify(this.state));
        curState.height = height;
        this.setState(curState);
    }

    registerSendEventListener(listener){
        const chatInput = document.getElementsByClassName('chatbox-chat-input')[0];
        chatInput.addEventListener('keypress', (e) => {
            if(e.keyCode == 13){
                listener(e);
                e.preventDefault();
            }
        })
        const sendButton = document.getElementsByClassName('chatbox-send-button')[0];
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
        
        //채팅창 사이즈 초기화
        const mainDom = document.getElementsByClassName('main')[0];

        if(this.props.type == 'main'){
            //937 - 460
            this.offsetHeight = document.body.offsetHeight - (937 - this.props.height);
            this.heightChange(this.offsetHeight);
        }
        else{
            this.heightChange(mainDom.offsetHeight);
        }

        //채팅창 사이즈 scroll 에 따라서 가변적으로 변화
        ((_this) => {
            
            const mainDom = document.getElementsByClassName('main')[0];

            mainDom.addEventListener('scroll',(e) => {
                if(_this.props.type == 'main'){
                    if(mainDom.scrollTop >= 355){
                        _this.heightChange(mainDom.offsetHeight);
                    }
                    else{
                        _this.heightChange(_this.offsetHeight + mainDom.scrollTop)
                    }
                }
            })
        }
        )(this)

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

                if(tcf.register('chatbox-chat-input',_this.chatChangeHandler)){
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
                }

            })
        })(this)

    }

    componentDidUpdate(prevProps){
        if(prevProps.type != this.props.type){

            const mainDom = document.getElementsByClassName('main')[0];
                
            if(this.props.type == 'main'){
                //937 - 460
                this.offsetHeight = document.body.offsetHeight - (937 - this.props.height);
                this.heightChange(this.offsetHeight);
            }
            else{
                this.heightChange(mainDom.offsetHeight);
            }
        }
    }

    render(){
        return (
            <div className = {'chatbox-container nc-light ' + (this.props.type == 'other' ? 'chatbox-other' : null )}
                style = {{width : this.props.width, height : this.state.height}}>
                <div className = 'chatbox-header-container'>
                    <div className = 'chatbox-header-nav'>
                        <Link href = '/notice'>
                            <a>
                            <div className = 'flex chatbox-header-nav-button'>
                                <img src = "https://twiticon.com/images/favicon.ico?v=2"/>
                                <div className = 'chatbox-header-nav-txt'>
                                    트위티콘 차원문 알아보기
                                </div>
                                <RightTriangle/>
                            </div>
                            </a>
                        </Link>
                    </div>
                    <div className = 'chatbox-header-try'>
                        <div className = 'chatbox-header-try-txt'>
                            트위티콘 차원문을 사용해보세요!
                        </div>
                    </div>

                </div>
                <div className = 'chatbox-twitch-embed-chat'>
                    <iframe frameBorder="0"
                        scrolling="no"
                        id="chat_embed"
                        src="https://www.twitch.tv/embed/twiticon/chat"
                        height={this.state.height - 27}
                        width={this.props.width}>
                    </iframe>
                </div>
                <div className = 'chatbox-chat-input-container'>
                    <ChatBoxAlert 
                        logMsg = {this.state.logMsg}
                        logToggle = {this.state.logToggle}
                        turnOff = {this.turnOffLog}
                    />
                    <div className = {'chatbox-chat-input-wrapper '+ (this.state.logToggle ? 'chatbox-chat-input-alert' : '')}>
                        <textarea className = 'chatbox-chat-input ' 
                            value = {this.state.chat}
                            onChange = {(e) => this.chatChangeHandler(e.target.value)}/>
                    </div>
                    <div className = 'chatbox-send-button'>
                        채팅
                    </div>
                </div>
            </div>
        )
    }
}
