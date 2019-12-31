import { useRouter } from 'next/router';


import next_cookies from 'next-cookies'

import '../../scss/streamer_contents.scss';

import StreamerInfo  from '../../component/streamerInfo.js';
import '../../scss/body.scss'

import {apiURL} from '../../URL'

const axios  = require('axios');

async function getInfoFromServer(name){
    
    var [emoticonInfo, channelInfo] = await Promise.all([
        axios.get(
            apiURL + '/api/streamer/' + name
        ),
        axios.get(
            apiURL + '/api/channel/' + name
        )]
    );


    return {
        emoticonInfo : emoticonInfo.data,
        channelInfo : channelInfo.data
    }

}

class Streamer extends React.Component{

    static async getInitialProps(ctx){
    
        var info = await getInfoFromServer(ctx.query.id);

        if(info.channelInfo.users.length == 0){
            if (ctx.res) {
                ctx.res.writeHead(302, {
                    Location: '/'
                })
                ctx.res.end();
            } else {
                Router.push('/');
            }
        }
    
        return {
            cookie : {
                twitchToken : next_cookies(ctx).twitchToken,
                profile : next_cookies(ctx).profile,
            },
            info : info
        }

    }

    constructor(props){

        super(props);

        var twitchToken = null;

        if(this.props.cookie.twitchToken != undefined){
            twitchToken = this.props.cookie.twitchToken;
        }

        this.state = {
            searchResult : this.props.searchResult,
            twitchToken : twitchToken
        };

        this.name = this.props.name;
    }


    render(){

        var streamer_contents = (<div/>);

        
        if(this.props.info.emoticonInfo.hasOwnProperty('error') ||
            this.props.info.channelInfo.hasOwnProperty('error')){
            streamer_contents = (
                <div className = 'streamer-contents-404'>
                    이런! 원하는 것을 찾을 수 없습니다!
                </div>
            )        
        }
        else{
            streamer_contents = (
                <StreamerInfo channelInfo = {this.props.info.channelInfo['users'][0]} emoticonInfo = {this.props.info.emoticonInfo} twitchToken={this.state.twitchToken}/>
            )     
        }
        

        return streamer_contents
    }

}


export default Streamer;