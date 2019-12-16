import RightTriangle from './rightTriangle';

import '../scss/main.scss';
import '../scss/StreamerCardView.scss'
import { apiURL } from '../URL'

import fetch from 'isomorphic-fetch';
import Link from 'next/link'

export default class StreamerTwiticonList extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            emoteInfo : []
        }
    }

    componentDidMount(){

        var setState = function(emoteInfos){
            var curState = JSON.stringify(JSON.parse(this.state));

            curState.emoteInfo = [];

            Object.values(emoteInfos).forEach(info => {
                curState.emoteInfo.push(info);
            })


            this.setState(curState);
        }

        setState = setState.bind(this);

        fetch(
            apiURL + '/api/streamer/' + this.props.channelName,
            {headers :{
                'Content-Type' : 'application/json'
            }}
        ).then(res => {
            if(res.ok) return res.json();
            else throw res.statusText;
        }).then(res =>{
            setState(res);
        }).catch(err => {
            
        })
    }

    render(){

        var channelDisplayName = this.props.channelDisplayName;
        var detailURL = '/s/' + this.props.channelName;

        var list = this.state.emoteInfo.map(emoteInfo => {
            return (
                <div className = 'streamer-twiticon-list-emotes'>

                </div>
            )
        });

        return (
            <div className = {'streamer-twiticon-list ' + (this.props.focus == true ? 'streamer-twiticon-list-on' : '')} >
                <div className = 'streamer-twiticon-list-head'>
                    <div className = 'flex space-between'>
                        <div className = 'streamer-twiticon-list-head-title'>
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
                                <img className = 'streamer-profile-img'>
                                </img>
                            </div>
                            <div className = 'streamer-twiticon-list-header-title-text'>
                                님의 트위티콘 리스트
                            </div>
                        </div>
                        <Link href = {detailURL}>
                            <a>
                                <div className = 'streamer-twiticon-list-show-detail'>
                                    자세히 보기
                                </div>
                                <div className = 'right-button'>
                                    <RightTriangle/>
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className = 'streamer-twiticon-list-body'>
                    {list}
                </div>
            </div>
        )
    }
}