import '../scss/main.scss'
import StreamerCardView from './StreamerCardview';

/*
    SSR 해야하는 것 : 최초 
*/

class MainPageContents extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            focusID : '-1'
        }

        this.setFocusId = this.setFocusId.bind(this);
    }

    setFocusId(id){
        var curState = JSON.parse(JSON.stringify(this.state));
        curState.focusID = id;
        this.setState(curState)
    }

    render(){
        var focusID = this.state.focusID
        var setFocusId = this.setFocusId

        var streamList = this.props.liveStreams.map((liveStream,i) =>{

            var id = 'livestream-' + liveStream.channel['_id']

            return <StreamerCardView key = {id}
                focus = {(focusID == '-1' && i == 0) || focusID == id}
                id = {id}
                channel = {liveStream.channel}
                setFocusId = {setFocusId}
            />
        });

        return (
            <div className = "main-contents">
                <div className = 'main-contents-header'>
                    <div className = 'flex space-between'>
                        <div className = "main-contents-title">
                            <div className = 'flex'>
                                <div className = "main-contents-title-state">
                                    방송 중
                                </div>
                                <div className = "main-contents-title-streamer">
                                    인 스트리머
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'main-contents-body'>
                    {streamList}
                </div>
            </div>    
        )
    }
}

export default MainPageContents;