
import '../scss/StreamerCardview.scss'
import Link from 'next/link';

import StreamerTwiticonList from '../component/streamerTwiticonList'

export default class StreamerCardView extends React.Component{

    componentDidUpdate(prevProps){
        
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
            <div className = 'streamer-cardview-container'>
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
                    channelName = {channelName}/>

            </div>
        )
    }

}