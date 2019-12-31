import RightTriangle from '../rightTriangle';

import '../../scss/main.scss';
import '../../scss/StreamerCardView.scss'

import Link from 'next/link'
import Emoticon from '../emoticon'
import EmoticonAlias from '../EmoticonAlias'

export default class StreamerTwiticonList extends React.Component{


    componentDidUpdate(prevProps){
        if(this.props.emotesInfo != 'loading' && this.props.lazy == false && this.props.loading == true){
            this.props.loadComplete();
        }
    }


    render(){

        var channelDisplayName = this.props.channelDisplayName;
        var detailURL = '/s/' + this.props.channelName;

        var list = null;
    
        if(this.props.emotesInfo != 'loading'){
            list = Object.values(this.props.emotesInfo)
                .map(values => 
                    values.map(value => {
                        var alias = value.alias_list[0]; 
                        var AliasComponent = alias 
                            ? <EmoticonAlias key = {'twiticon-alias-' + value.id} alias = {alias} height = {30}/> 
                            : null

                        return <div key = {'twiticon-' + value.id} className = 'twiticon-emote-info'>
                            <div className = 'flex'>
                                <Emoticon  info = {value}/>
                                <div className = 'twiticon-alias-container'>
                                    {AliasComponent}
                                </div>
                            </div>
                        </div>
                    }

                    )
                )
        }

        return (
            <div className = {
                'streamer-twiticon-list ' 
                + (this.props.focus == true ? 'streamer-twiticon-list-on ' : 'streamer-twiticon-list-off ')
                + (this.props.loading == true ? 'streamer-twiticon-list-loading' : 'streamer-twiticon-list-loaded')
            } >
                <div className = 'streamer-twiticon-list-head'>
                    <div className = 'flex space-between'>
                        <div className = 'streamer-twiticon-list-head-title'>
                            <div className = 'flex'>
                                <img className = 'streamer-twiticon-list-twitich-logo'
                                    src = "http://twiticon.com/twitch_logo.png">
                                </img>
                                <div className = 'streamer-twiticon-list-header-title-text'>
                                    스트리머
                                </div>
                                <div className = 'streamer-twiticon-list-header-title-name'>
                                    {channelDisplayName}
                                </div>  
                                <div className = 'streamer-twiticon-list-profile'>
                                    <img className = 'streamer-profile-img'
                                        src = {this.props.channelLogo}>
                                    </img>
                                </div>
                                <div className = 'streamer-twiticon-list-header-title-text'>
                                    님의 트위티콘 리스트
                                </div>
                            </div>
                        </div>
                        <Link href = {detailURL}>
                            <a>
                                <div className = 'flex'>
                                    <div className = 'streamer-twiticon-list-show-detail'>
                                        자세히 보기
                                    </div>
                                    <div className = 'right-button'>
                                        <RightTriangle/>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className = 'streamer-twiticon-loading'>
                    <div className="loader"></div>
                </div>
                <div className = 'streamer-twiticon-list-body'>
                    {this.props.lazy ? null : list}
                </div>
            </div>
        )
    }
}