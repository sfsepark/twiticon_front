import Banner from '../component/banner.js';
import Head from 'next/head';

import '../scss/body.scss'
import fetch from 'isomorphic-fetch'
const axios = require('axios');

import next_cookies from 'next-cookies'
import cookies from '../methods/cookies';
import MainPageContents from '../component/MainPageContents.js'

import client_id from '../data/client_id'

 
class Index extends React.Component{

    static async getInitialProps(ctx){

        var props = {
            cookie : {
                twitchToken : next_cookies(ctx).twitchToken
            }
        }

        return props;
    }


    constructor(props){

        super(props);

        this.state = {
            liveStreams : []
        };

        this.nextOffset = 0;

        this.fetchFollowStreams = this.fetchFollowStreams.bind(this);
        this.fetchPoppularStreams = this.fetchPoppularStreams.bind(this);

        this.scrollMutex = 1;
    }

    componentDidMount(){

        if(this.nextOffset == 0){
            if(this.props.cookie.twitchToken == null){
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
        console.log('fetch....', this.nextOffset);
        var liveStreamsRes = await fetch('https://api.twitch.tv/kraken/streams/?language=ko&limit=30&offset=' + this.nextOffset * 30 , {
            headers : {
                'Client-ID' : client_id,
                Accept: 'application/vnd.twitchtv.v5+json' 
            }
        })

        if(liveStreamsRes.ok){
            var liveStreams = await liveStreamsRes.json();

            var curState = JSON.parse(JSON.stringify(this.state))
            curState.liveStreams = curState.liveStreams.concat(liveStreams.streams.filter(
                liveStream => liveStream.channel.partner
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
            <div className="main">
                <Head>
                    <title>트위티콘 - 트위치 이모티콘에 한글 별명을 달아보세요.</title>
                </Head>
                <div className = "main-contents-container">
                    <Banner/>
                    <MainPageContents 
                        liveStreams={this.state.liveStreams}
                    />
                </div>
            </div>
        )
    }


}

export default Index;