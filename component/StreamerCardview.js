
import '../scss/StreamerCardview.scss'
import Link from 'next/link';

import StreamerTwiticonList from '../component/streamerTwiticonList'

export default class StreamerCardView extends React.Component{

    render(){

        var channel = this.props.channel;

        var channelDisplayName = channel.display_name;
        var channelName = channel.name;
        var detailURL = '/s/' + channelName;

        return (
            <div className = 'streamer-cardview-container'>
                <div className = 'streamer-cardview'>
                    <div className = {'streamer-cardview-bg' + (this.props.focus == true ? '-on' : '') }>
                        <div className = 'streamer-cardview-profile'>
                            <img className = 'streamer-profile-img'>
                            </img>
                        </div>
                        <div className = 'streamer-cardview-name'>
                            {channelDisplayName}
                        </div>
                        <Link href = {detailURL}>
                            <a>
                                <div className = 'streamer-show-detail'>
                                    자세히 보기
                                </div>
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