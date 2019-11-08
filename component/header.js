import '../scss/header.scss';
import Link from 'next/link';

import UserInfo from '../component/userInfo.js'
import SearchBar from '../component/searchBar.js';

import client_id from '../data/client_id'

import {baseURL} from '../URL'

const Header  = function(props){

    var userInfo ;

    if(props.twitchToken && typeof(props.twitchToken) == 'string'){
        userInfo =  <UserInfo twitchToken = {props.twitchToken} profile = {props.profile}/>
    }
    else{
        userInfo =  <a href = {"https://id.twitch.tv/oauth2/authorize?client_id=" + client_id +"&redirect_uri="+ baseURL + "&response_type=token&scope=user_subscriptions+user_read"} className = "header-menu header-login">로그인</a>
    }

    //
    var header_box_class = 'header-box';
    var searchBar = null;

    if(props.type == 'main'){
        header_box_class += ' header-box-main';
    }
    else{
        header_box_class += ' header-box-sub';
        searchBar = <SearchBar value = {props.query} type = 'header'/>
    }

    return (
        <div className = {header_box_class}>
            <div className = "header-logo" onClick = {() => window.location.href = '/'}>
                <div className = "header-logo-twiti">트위티</div>
                <div className = "header-logo-con">콘</div>
            </div>
            <Link href ='' ><a className = "header-menu header-basic-emote">기본 이모티콘</a></Link>
            <Link href =''><a className = "header-menu header-usage">사용법</a></Link>
            <Link href =''><a className = "header-menu header-twiticon-portal">트위티콘 차원문</a></Link>
            <Link href =''><a className = "header-menu header-notice">공지사항</a></Link>
            {searchBar}
            {userInfo}
        </div>
    )
}

export default Header;

