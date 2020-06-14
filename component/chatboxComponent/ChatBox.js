import '../../scss/chatbox.scss'
import '../../scss/twiticon/style.css'

import ChatBoxInput from './ChatBoxInput';
import ChatBoxHeader from './ChatBoxHeader';

export default class ChatBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            height : this.props.height,
        }

        this.heightChange = this.heightChange.bind(this);
        this.offsetHeight = 0;
    }

    heightChange(height){
        const curState = JSON.parse(JSON.stringify(this.state));
        curState.height = height;
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
                <ChatBoxHeader/>
                <div className = 'chatbox-twitch-embed-chat'>
                    <iframe frameBorder="0"
                        scrolling="no"
                        id="chat_embed"
                        src="https://www.twitch.tv/embed/twiticon/chat?parent=twiticon.com"
                        height={this.state.height - 27}
                        width={this.props.width}>
                    </iframe>
                </div>
                <ChatBoxInput
                    cookie = {this.props.cookie}/>
            </div>
        )
    }
}
