import '../scss/main.scss'
import MainPageStreamerList from '../component/MainPageStreamerList'

import client_id from '../data/client_id'
import fetch from 'isomorphic-fetch'

/*
    SSR 해야하는 것 : 최초 
*/

class MainPageContents extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            liveStreams : []
        }

        this.nextOffset = 0;

        this.fetchFollowStreams = this.fetchFollowStreams.bind(this);
        this.fetchPoppularStreams = this.fetchPoppularStreams.bind(this);

        this.scrollMutex = 1;
    }

    componentDidMount(){
        if(this.nextOffset == 0){
            if(this.props.twitchToken === undefined){
                this.fetchPoppularStreams();
            }
            else{
                this.fetchFollowStreams();
            }
        }
        
        var mainDOM = document.getElementsByClassName('main')[0];

        ((_this) => {
            mainDOM.addEventListener('scroll',async event => {

                if(mainDOM.children[0].offsetHeight - mainDOM.scrollTop <= (window.innerHeight + 94)){
                    if(_this.scrollMutex == 0){
                        _this.scrollMutex = 1;
                        await _this.fetchPoppularStreams();
                    }
                }
            })
        })(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.liveStreams.length != this.state.liveStreams.length){
            this.scrollMutex = 0;
            this.nextOffset ++;
        }
    }

    async fetchPoppularStreams(){
        var liveStreamsRes = await fetch('https://api.twitch.tv/kraken/streams/?language=ko&limit=30&offset=' + this.nextOffset * 30 , {
            headers : {
                'Client-ID' : client_id,
                Accept: 'application/vnd.twitchtv.v5+json' 
            }
        })

        if(liveStreamsRes.ok){

            var prevStreamerList = this.state.liveStreams.map(liveStream => liveStream.channel.name);

            var liveStreams = await liveStreamsRes.json();

            var curState = JSON.parse(JSON.stringify(this.state))
            curState.liveStreams = curState.liveStreams.concat(liveStreams.streams.filter(
                liveStream => 
                    liveStream.channel.partner 
                    && ! prevStreamerList.includes(liveStream.channel.name)
            ));
            
            this.setState(curState);
        }   
    }

    
    async fetchFollowStreams(){
        var followChannelRes = await fetch('https://api.twitch.tv/kraken/streams/?language=ko&limit=30', {
            headers : {
                'Client-ID' : client_id,
                Accept: 'application/vnd.twitchtv.v5+json' 
            }
        })
    }

    render(){
        return (
            <MainPageStreamerList
                liveStreams={this.state.liveStreams}
            />                  
        )
    }
}

export default MainPageContents;