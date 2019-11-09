import '../scss/chatbox.scss'
import tmi from 'tmi.js'

export default class ChatBox extends React.Component{
    constructor(props){
        super(props);
        
    }

    componentDidMount(){

    }

    render(){
        return (
            <div className = 'chatbox-container'
                style = {{width : this.props.width, height : this.props.height}}>
                <div className = 'chatbox-twitch-embed-chat'>
                    <iframe frameborder="0"
                        scrolling="no"
                        id="chat_embed"
                        src="https://www.twitch.tv/embed/twiticon/chat"
                        height={this.props.height}
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