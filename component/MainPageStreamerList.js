import '../scss/main.scss'
import StreamerCardView from './StreamerCardview';
import {apiURL} from '../URL'

/*
    SSR 해야하는 것 : 최초 
*/

class MainPageContents extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            focusID : '-1',
            emotesInfo  : {}
        }

        this.setFocusId = this.setFocusId.bind(this);
    }

    setFocusId(id){
        var curState = JSON.parse(JSON.stringify(this.state));
        curState.focusID = id;
        this.setState(curState)
    }
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.liveStreams.length != this.props.liveStreams.length){
            var prevStreamerList = prevProps.liveStreams.map(liveStream => liveStream.channel.name);
            var newStreamerList =  this.props.liveStreams
                .map(liveStreams=>liveStreams.channel.name)
                .filter(name => ! prevStreamerList.includes(name));
            this.fetchStreamerEmotes(newStreamerList);
        }
    }

    fetchStreamerEmotes(newStreamerList){
        var _this = this;
        new Promise(async res => {
            var streamerEmotes = await fetch(apiURL + '/api/streamer/streamers',{
                headers : {"Content-Type": "application/json"},
                method : "POST",
                body : JSON.stringify(newStreamerList)
            })

            if(streamerEmotes.ok){
                res(await streamerEmotes.json())
            }
        }).then(value => {
            var curState = JSON.parse(JSON.stringify(_this.state));

            for(var i = 0 ; i < newStreamerList.length ; i ++){
                curState.emotesInfo[newStreamerList[i]] = [];
            }

            Object.keys(value).forEach(name => {
                curState.emotesInfo[name] = value[name];
            });
            this.setState(curState)
        })
    }

    render(){
        var focusID = this.state.focusID
        var setFocusId = this.setFocusId
        var emotesInfo = this.state.emotesInfo

        var streamList = this.props.liveStreams.map((liveStream,i) =>{

            var id = 'livestream-' + liveStream.channel['_id']

            return <StreamerCardView key = {id}
                focus = {(focusID == '-1' && i == 0) || focusID == id}
                id = {id}
                channel = {liveStream.channel}
                setFocusId = {setFocusId}
                emotesInfo = {emotesInfo[liveStream.channel.name] ? emotesInfo[liveStream.channel.name] : "loading"}
            />
        });

        return (
            <div className = 'main-contents-body'>
                {streamList}
            </div> 
        )
    }
}

export default MainPageContents;