import StreamerSearchResult from '../component/streamerSearchResult.js';

import '../scss/body.scss'
import '../scss/searchResult.scss'

import {apiURL} from '../URL'

import next_cookies from 'next-cookies'
import  Router from 'next/router';

const axios  = require('axios');

class Search extends React.Component{

    static async getInitialProps(ctx){

        var result = undefined;
        
        var query = '';

        if(ctx.query.query != undefined){
            query = ctx.query.query;
        }

        if(query != ''){
            var result = await axios.get(
                apiURL + '/api/search?query=' + encodeURIComponent(query)
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

    shouldComponentUpdate(nextProps, nextState){
        
        if(nextProps.url.query.query != this.props.url.query.query){
            var curState = JSON.parse(JSON.stringify(this.state));
            curState.searchResult = 'initial';
            this.setState(curState);
        }
        
        console.log(nextProps, this.props)

        return true;
    }


    componentDidUpdate(prevProps){
        
        
        if(prevProps.url.query.query != this.props.url.query.query){
            var query = this.props.url.query.query;
            var curState = JSON.parse(JSON.stringify(this.state));
            var setState = this.setState.bind(this);
            if(query != ''){
                axios.get(
                    apiURL + '/api/search?query=' + encodeURIComponent(query)
                ).then(res => {
                    curState.searchResult = res.data;
                    setState(curState)
                });
            }
            else{
                
            }
        }


    }

    render(){
        var streamerRes = [];

        if(this.state.searchResult == 'initial'){
            SearchResults = null;
        }
        else{
            if(this.state.searchResult != undefined 
                && this.state.searchResult.hasOwnProperty('streamer')
                && this.state.searchResult.streamer.hasOwnProperty('channels'))
            {
                streamerRes = this.state.searchResult.streamer.channels.filter(channel => channel.broadcaster_type != '');
            }
    
            var SearchResults ;
    
            if(streamerRes.length == 0){
                SearchResults = <div style = {{'margin-left': '28px'}}>이런! 결과를 찾을 수 없습니다!</div>
            }
            else{
                if(streamerRes.length == 1){
                    //Router.push('/s/[id]','/s/' + streamerRes[0].name)
                }
                //유사도 분석 후 정렬해서 보여줘야 한다.
                SearchResults = (
                    <StreamerSearchResult res={streamerRes}/>
                )
            }
        }



        return (
            <div className= "main">
                <div className = "contents-container">
                    <div className = "search-title">{'"' + (this.props.url.query.query ? this.props.url.query.query : '') + '" ' + (this.state.searchResult == 'initial' ? '검색 중.....' : '검색 결과')}</div>
                    {SearchResults}
                </div>

            </div>
            
        )
    }


}

export default Search;