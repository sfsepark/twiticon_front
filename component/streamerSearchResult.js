

import '../scss/searchResult.scss';
import Router from 'next/router'
//import '../scss/streamerSearchResult.scss';

function SearchSingleResult(props){

    return(
        <div className = 'streamer-single-result-container' onClick = {() => {Router.push('/s/[id]','/s/' + props.res.name)}}>
            <div className = 'streamer-single-result-flex'>
                <img 
                    className = 'streamer-single-result-logo' 
                    src = {props.res.logo}/>
                <div className = 'streamer-single-result-contents'>
                    <div className = 'streamer-single-result-name'>
                        {props.res.display_name}
                    </div>
                    <div className = 'streamer-single-result-follower'>
                        {'팔로워 ' + props.res.followers}
                    </div>
                </div>
            </div>
        </div>
    )
}

function StreamerSearchResult(props){


    var SearchResult = props.res.map(function(channel){
        if(channel.broadcaster_type != '')
        {
            return <SearchSingleResult res={channel}/>;
        }
    });

    return(
        <div className="search-result streamer-search-result">
            <div className = "search-result-title-container">
                <div className = "search-result-dropdown-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22.374" height="15.835" viewBox="0 0 22.374 15.835">
                    <g id="그룹_65" data-name="그룹 65" transform="translate(-274.313 -397.583)">
                        <line id="선_4" data-name="선 4" x2="10.821" y2="14" transform="translate(275.5 398.5)" fill="none" stroke="#0189ff" strokeWidth="3"/>
                        <line id="선_5" data-name="선 5" x1="10.821" y2="14" transform="translate(284.679 398.5)" fill="none" stroke="#0189ff" strokeWidth="3"/>
                    </g>
                    </svg>
                </div>
                <div className = "search-result-title">
                    스트리머
                </div>
            </div>
            {SearchResult}
        </div>
    )
}

export default StreamerSearchResult;