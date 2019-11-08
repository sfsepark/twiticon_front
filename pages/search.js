import Header from '../component/header.js';
import StreamerSearchResult from '../component/streamerSearchResult.js';

import '../scss/body.scss'
import '../scss/searchResult.scss'

import {apiURL} from '../URL'

import next_cookies from 'next-cookies'

const axios  = require('axios');

class Search extends React.Component{

    static async getInitialProps(ctx){

        var result = undefined;
        
        this.query = '';

        if(ctx.query.query != undefined){
            this.query = ctx.query.query;
        }

        if(this.query != ''){
            var result = await axios.get(
                apiURL + '/api/search?query=' + encodeURIComponent(this.query)
            );

            result = result.data;
        }

        return {
            cookie : {
                twitchToken : next_cookies(ctx).twitchToken,
                profile : next_cookies(ctx).profile
            },
            searchResult : result
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

        var streamerRes = [];

        if(this.state.searchResult != undefined 
            && this.state.searchResult.hasOwnProperty('streamer')
            && this.state.searchResult.streamer.hasOwnProperty('channels'))
        {
            streamerRes = this.state.searchResult.streamer.channels;
        }

        var SearchResults ;

        if(streamerRes.length == 0){
            SearchResults = <div style = {{'margin-left': '28px'}}>이런! 결과를 찾을 수 없습니다!</div>
        }
        else{
            //유사도 분석 후 정렬해서 보여줘야 한다.
            SearchResults = (
                <StreamerSearchResult res={streamerRes}/>
            )
        }

        return (
            <div className= "main">
                <Header query={this.query} type = 'sub' twitchToken={this.state.twitchToken} profile={this.props.cookie.profile}/>
                <div className = "contents-container">
                    <div className = "search-title">{'"' + (this.props.url.query.query ? this.props.url.query.query : '') + '" 검색 결과'}</div>
                    {SearchResults}
                </div>

            </div>
            
        )
    }


}

export default Search;