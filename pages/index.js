
import Header from '../component/header.js';
import Banner from '../component/banner.js';
import Head from 'next/head';

import '../scss/body.scss'
import fetch from 'isomorphic-fetch'

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

        var liveStreams = await fetch('https://api.twitch.tv/kraken/streams/?language=ko&limit=30', {
            headers : {
                'Client-ID' : client_id,
                Accept: 'application/vnd.twitchtv.v5+json' 
            }
        })

        if(liveStreams.ok){
            props.liveStreams = await liveStreams.json();
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
            twitchToken : twitchToken
        };
    }

    componentDidMount(){
        var access_token = new URLSearchParams( window.location.hash.substr(1)).get('access_token') ;
        if(access_token != null){
            var newState = JSON.parse(JSON.stringify(this.state));
            newState.twitchToken = access_token;

            this.setState(newState);
            cookies.setCookie('twitchToken',access_token, 7);
        }
    }


    render(){

        //console.log(this.props.liveStreams.streams);

        return (
            <div className="main">
                <Head>
                    <title>트위티콘 - 트위치 이모티콘에 한글 별명을 달아보세요.</title>
                </Head>
                <Header type='main' twitchToken={this.state.twitchToken} profile={this.props.cookie.profile}/>
                <Banner/>
                <div style = {{width : '100%'}}>
                    <MainPageContents 
                        liveStreams={this.props.liveStreams.streams}/>
                </div>
            </div>
        )
    }


}

export default Index;