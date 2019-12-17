
import '../scss/StreamerCardview.scss'
import Link from 'next/link';

import StreamerTwiticonList from '../component/streamerTwiticonList'

export default class StreamerCardView extends React.Component{

    /*
        this.props.emotesInfo 받음
        streamerTwiticonList 의 componentDidUpdate 에서 loadComplete 실행
        loading = false
        streamerTwiticonList 에서 this.state.loading false에 의해 변화
    */

    constructor(props){
        super(props);
        this.state = {
            offsetHeight : 142,
            loading : true
        }
    }

    loadComplete(){        
        var curTwiticonList = document.getElementById(this.props.id).getElementsByClassName('streamer-twiticon-list')[0];
        var curTwiticonListBody = curTwiticonList.getElementsByClassName('streamer-twiticon-list-body')[0];
        var offsetHeight = 142 + (curTwiticonListBody.offsetHeight-50) ;
        

        this.setState({
            offsetHeight : offsetHeight,
            loading : false
        })

    }


    render(){

        var channel = this.props.channel;

        var logo = this.props.channel.logo;

        var channelDisplayName = channel.display_name;
        var channelName = channel.name;
        var detailURL = '/s/' + channelName;

        var setFocusId = this.props.setFocusId;
        var id = this.props.id;

        return (
            <div id = {this.props.id} className = 'streamer-cardview-container'                        
                {
                    ... this.props.focus == true 
                    ? {style : {"marginBottom" : this.state.offsetHeight}}
                    : null
                }>
                <div className = 'streamer-cardview' onClick = {() => {setFocusId(id)}}>
                    <div className = {'streamer-cardview-bg' + (this.props.focus == true ? '-on' : '') }>
                        <div className = 'streamer-cardview-profile'>
                            <img className = 'streamer-profile-img' src = {logo}>
                            </img>
                        </div>
                        <div className = 'streamer-cardview-name'>
                            {channelDisplayName}
                        </div>
                        <Link href = '/s/[id]' as = {detailURL}>
                            <a className = 'streamer-show-detail'>
                                    자세히 보기
                            </a>
                        </Link>
                    </div>
                </div>
                <StreamerTwiticonList
                    focus = {this.props.focus}
                    channelDisplayName = {channelDisplayName}
                    channelName = {channelName}
                    channelLogo = {logo}
                    emotesInfo = {this.props.emotesInfo}
                    loading = {this.state.loading}
                    loadComplete = {this.loadComplete.bind(this)}/>

            </div>
        )
    }

}