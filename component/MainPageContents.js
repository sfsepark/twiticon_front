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

        this.scrollMutex = 1;
        this.mainPageScorllEvent = this.mainPageScorllEvent.bind(this);
    }

    async mainPageScorllEvent(event){

        var mainDOM = event.target;

        if(mainDOM.children[0].offsetHeight - mainDOM.scrollTop <= (window.innerHeight + 94)){
            if(this.scrollMutex == 0){
                this.scrollMutex = 1;
                await this.curFetchFunction();
            }
        }
    }

    componentDidMount(){

        var fetchPoppularStreams = this.getFetchStreams(
            'https://api.twitch.tv/kraken/streams/?language=ko&limit=30&offset=' ,
            'streams'
        ).bind(this);

        var fetchFollowStreams = this.getFetchStreams(
            'https://api.twitch.tv/kraken/users/' + this.props.userId + '/follows/channels?limit=30&direction=asc&offset=' ,
            'follows'
        ).bind(this);


        if(this.nextOffset == 0){
            if(this.props.userId === undefined){
                this.curFetchFunction = fetchPoppularStreams;
            }
            else{
                this.curFetchFunction = fetchFollowStreams;
            }
        }

        this.curFetchFunction();
        
        var mainDOM = document.getElementsByClassName('main')[0];
        mainDOM.addEventListener('scroll',this.mainPageScorllEvent)

    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.liveStreams.length != this.state.liveStreams.length){
            this.scrollMutex = 0;
            this.nextOffset ++;
        }
    }

    componentWillUnmount(){
        var mainDOM = document.getElementsByClassName('main')[0];
        mainDOM.removeEventListener('scroll',this.mainPageScorllEvent)
    }

    getFetchStreams(url , attribute){
        return async function fetchPoppularStreams(){
            var liveStreamsRes = await fetch(url + this.nextOffset * 30 , {
                headers : {
                    'Client-ID' : client_id,
                    Accept: 'application/vnd.twitchtv.v5+json' 
                }
            })
    
            if(liveStreamsRes.ok){
    
                var prevStreamerList = this.state.liveStreams.map(liveStream => liveStream.channel.name);
    
                var liveStreams = await liveStreamsRes.json();
    
                var curState = JSON.parse(JSON.stringify(this.state))
                curState.liveStreams = curState.liveStreams.concat(liveStreams[attribute].filter(
                    liveStream => 
                        
                        liveStream.channel.partner 
                        && ! prevStreamerList.includes(liveStream.channel.name)
                ));
                
                this.setState(curState);
            }   
        }
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