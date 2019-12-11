import '../scss/header.scss';
import Link from 'next/link';

import UserInfo from './userInfo.js'
import SearchBar from './searchBar.js';
import cookies from '../methods/cookies'

import {useEffect,useState} from 'react'


import {baseURL} from '../URL'
import Router from 'next/router';

const Navbar  = function(props){

    var userInfo ;

    var [profile, setProfile] = useState(0);

    useEffect(() => {
        setProfile(cookies.getCookie('profile'));
    },[])

    function handleClickLogin(){
        cookies.setCookie('history', window.location.pathname)
        Router.push("/login");
    }


    if(profile){
        userInfo =  <UserInfo profile = {profile}/>
    }
    else{
        userInfo =  <a onClick = {handleClickLogin} className = "header-menu header-login">로그인</a>
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
            <div className = "header-logo" onClick = {() => Router.push('/')}>
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

export default Navbar;

