import '../scss/chatbox.scss'

import RightTriangle from './rightTriangle';

import chatUsingTmi from '../methods/chat_using_tmi'

export default class ChatBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            height : this.props.height
        }

        this.heightChange = this.heightChange.bind(this);
        this.offsetHeight = 0;
    }

    heightChange(height){
        this.setState({height : height});
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

        console.log(this.props);

        if(this.props.cookie.name && this.props.cookie.twitchToken){
            var chat = chatUsingTmi({
                authToken : this.props.cookie.twitchToken,
                name : this.props.cookie.name
            })

            chat.connectPromise.then(() => console.log('succecss'));
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
                        <RightTriangle/>
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
                        height={this.state.height - 22}
                        width={this.props.width}>
                    </iframe>
                </div>
                <div className = 'chatbox-chat-input-container'>
                    <div className = 'chatbox-chat-input-wrapper'>
                        <textarea className = 'chatbox-chat-input'/>
                    </div>
                </div>
            </div>
        )
    }
}