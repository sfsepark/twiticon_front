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
                twitchToken : next_cookies(ctx).twitchToken,
                profile : next_cookies(ctx).profile
            }
        }

        return props;
    }


    constructor(props){

        super(props);

        var twitchToken = null;

        if(this.props.cookie.twitchToken != undefined){
            twitchToken = this.props.cookie.twitchToken;
        }

        this.state = {
            twitchToken : twitchToken,
            liveStreams : [],
            emoticons : {}
        };

        this.nextOffset = 0;

        this.fetchFollowStreams = this.fetchFollowStreams.bind(this);
        this.fetchPoppularStreams = this.fetchPoppularStreams.bind(this);
    }

    componentDidMount(){

        var access_token = new URLSearchParams( window.location.hash.substr(1)).get('access_token') ;
        if(access_token != null){
            var newState = JSON.parse(JSON.stringify(this.state));
            newState.twitchToken = access_token;
            
            cookies.setCookie('twitchToken',access_token, 7);
            this.setState(newState);
        }

        if(this.nextOffset == 0){
            if(this.state.twitchToken == null){
                this.fetchPoppularStreams();
            }
            else{
                this.fetchFollowStreams();
            }

            this.nextOffset = 1;
        }
    }

    async fetchPoppularStreams(){
        var liveStreamsRes = await fetch('https://api.twitch.tv/kraken/streams/?language=ko&limit=30', {
            headers : {
                'Client-ID' : client_id,
                Accept: 'application/vnd.twitchtv.v5+json' 
            }
        })

        if(liveStreamsRes.ok){
            var liveStreams = await liveStreamsRes.json();

            var curState = JSON.parse(JSON.stringify(this.state));
            curState.liveStreams = liveStreams.streams;
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
                <Banner/>
                <div style = {{width : '100%'}}>
                    <MainPageContents 
                        liveStreams={this.state.liveStreams}/>
                </div>
            </div>
        )
    }


}

export default Index;