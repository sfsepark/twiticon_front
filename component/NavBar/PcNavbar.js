import '../../scss/header.scss';
import Link from 'next/link';

import UserInfo from './UserInfo.js'
import SearchBar from '../SearchBar.js';
import cookies from '../../methods/cookies'
import Logo from '../Logo'

import {useEffect,useState} from 'react'

import nextCookies from 'next-cookies';
import Router from 'next/router';

import NavbarMenu from './NavbarMenu';

const Navbar  = function(props){

    var userInfo ;

    var profile = props.cookie.profile;

    function handleClickLogin(){
        cookies.setCookie('history', window.location.pathname)
        Router.push("/login");
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
            <div className = "header-contents">
                <div className = 'header-layout'>
                    <Logo/>
                    {searchBar}
                </div>
                <div className = "header-layout">
                    <NavbarMenu url = '/explore' menu = '탐색' active = {props.active == 'explore'}/>
                    {profile ? <NavbarMenu url = '/follow' menu = '팔로잉' active = {props.active == 'follow'}/> : null}
                    {/*<NavbarMenu url = '/basic' menu = {'이모티콘'} active = {props.active == 'basic'}/>
                    <NavbarMenu url = '/notice' menu = '공지사항' active = {props.active == 'notice'}/>*/}
                    <NavbarMenu url = '/extension' menu = '크롬익스텐션' active = {props.active == 'portal'}/>
                    {userInfo}
                </div>
            </div>
        </div>
    )
}


export default Navbar;

