import '../scss/header.scss';
import Link from 'next/link';

import UserInfo from './userInfo.js'
import SearchBar from './searchBar.js';
import cookies from '../methods/cookies'

import {useEffect,useState} from 'react'

import nextCookies from 'next-cookies';
import Router from 'next/router';

import NavbarMenu from './NavbarMenu';

const Navbar  = function(props){

    var userInfo ;

    var profile = props.profile;

    function handleClickLogin(){
        cookies.setCookie('history', window.location.pathname)
        Router.push("/login");
    }

    var active = '';

    if(props.url.route == '/' || props.url.route == '/index'){
        if(profile)
            active = 'follow'
        else
            active = 'explore'
    }
    else if(props.url.route == '/explore'){
        active = 'explore'
    }
    else if(props.url.route == '/follow'){
        active = 'follow'
    }
    else if(props.url.route == '/portal'){
        active = 'portal'
    }
    else if(props.url.route == '/notice'){
        active = 'notice'
    }
    else if(props.url.route == '/basic'){
        active = 'basic'
    }

    if(profile){
        userInfo =  <UserInfo profile = {profile}/>
    }
    else{
        userInfo =  <div onClick = {() => handleClickLogin()} className = "header-menu header-login">로그인</div>
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
            <div className = "header-layout">
                <NavbarMenu url = '/explore' menu = '탐색' active = {active == 'explore'}/>
                {profile ? <NavbarMenu url = '/follow' menu = '팔로잉' active = {active == 'follow'}/> : null}
                <NavbarMenu url = '/basic' menu = {profile ? '내 이모티콘' : '기본 이모티콘'} active = {active == 'basic'}/>
                <NavbarMenu url = '/notice' menu = '공지사항' active = {active == 'notice'}/>
                <NavbarMenu url = '/portal' menu = '크롬익스텐션' active = {active == 'portal'}/>
                {searchBar}
                {userInfo}
            </div>
        </div>
    )
}

Navbar.getInitialProps = async function(ctx){
    var profile = nextCookies(ctx)['profile']

    return {profile}
}

export default Navbar;

