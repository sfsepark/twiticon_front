import '../scss/chatbox.scss'

import RightTriangle from './rightTriangle';

import chatUsingTmi from '../methods/chat_using_tmi'
import ChatBoxAlert from './chatBoxAlert';
import Link from 'next/link';

export default class ChatBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chat : '',
            height : this.props.height,
            logMsg : '',
            logToggle : false
        }

        this.heightChange = this.heightChange.bind(this);
        this.registerLog = this.registerLog.bind(this);
        this.turnOffLog = this.turnOffLog.bind(this);
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

    registerEventListener(listener){
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
        
        const mainDom = document.getElementsByClassName('main')[0];

        if(this.props.type == 'main'){
            //937 - 460
            this.offsetHeight = document.body.offsetHeight - (937 - this.props.height);
            this.heightChange(this.offsetHeight);
        }
        else{
            this.heightChange(mainDom.offsetHeight);
        }


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

        var registerEventListener = this.registerEventListener.bind(this);

        if(this.props.cookie.name && this.props.cookie.twitchToken){
            
            var chat = chatUsingTmi({
                authToken : this.props.cookie.twitchToken,
                name : this.props.cookie.name
            });


            ((_this) => {
                chat.connectPromise.then(() => {
                    chat.readyChat('twiticon').then(() => {
                        
                        chat.registerLogFunction(_this.registerLog);
    
                        registerEventListener((e) => {
                            chat.sendChat(_this.state.chat)
                            _this.chatChangeHandler('');
                        })
                    })
                })
            })(this)
        }
        else{
            registerEventListener((e) => this.registerLog('로그인 후 이용해주세요'))
        }
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
            <div className = {'chatbox-container ' + (this.props.type == 'other' ? 'chatbox-other' : null )}
                style = {{width : this.props.width, height : this.state.height}}>
                <div className = 'chatbox-header-container'>
                    <div className = 'chatbox-header-nav'>
                        <Link href = '/notice'>
                            <a>
                            <div className = 'flex chatbox-header-nav-button'>
                                <img src = "http://twiticon.com/favicon.ico?v=2"/>
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
                    <iframe frameborder="0"
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