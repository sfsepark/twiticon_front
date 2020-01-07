import '../../scss/hamburger.scss'
import UserInfo from './UserInfo';
import cookies from '../../methods/cookies';
import Router from 'next/router';
import Logo from '../Logo';
import NavbarMenu from './NavbarMenu';

function NavbarHamburgerMenu(props){

    return <div className = 'hamburger-navbar-menu'
                onClick = { (e) => props.onoff()}>
        <NavbarMenu {...props}/>
    </div>
}

export default (props) => {

    const profile = props.cookie.profile;
    var userInfo;

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

    const onoff = props.onoff

    return (
        <div className = {'hamburger-container ' 
            + (props.toggle ? 'hamburger-container-on' : '')}
            onClick = {
                () => {
                    props.onoff();
                }
            }>
            <div className = 'hamburger-menu'
                onClick = {
                    (e) => e.stopPropagation()
                }>
                <div className = 'hamburger-user-info'>
                    {userInfo}
                </div>
                <div className = 'hamburger-close-button'
                    onClick = {(e) => props.onoff()}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="19" viewBox="0 0 32 19">
                    <g id="그룹_144" data-name="그룹 144" transform="translate(-498.5 -30)">
                        <line id="선_10" data-name="선 10" x2="32" transform="translate(498.5 31.5)" fill="none" stroke="#707070" strokeWidth="3"/>
                        <line id="선_11" data-name="선 11" x2="32" transform="translate(498.5 39.5)" fill="none" stroke="#707070" strokeWidth="3"/>
                        <line id="선_12" data-name="선 12" x2="32" transform="translate(498.5 47.5)" fill="none" stroke="#707070" strokeWidth="3"/>
                    </g>
                    </svg>

                </div>
                <div onClick = {(e) => props.onoff()}>
                    <Logo/>
                </div>
                <NavbarHamburgerMenu url = '/explore' menu = '탐색' active = {props.active == 'explore'} onoff = {onoff}/>
                {profile ? <NavbarHamburgerMenu url = '/follow' menu = '팔로잉' active = {props.active == 'follow'} onoff = {onoff}/> : null}
                <NavbarHamburgerMenu url = '/basic' menu = {'이모티콘'} active = {props.active == 'basic'} onoff = {onoff}/>
                <NavbarHamburgerMenu url = '/notice' menu = '공지사항' active = {props.active == 'notice'} onoff = {onoff}/>
                <NavbarHamburgerMenu url = '/portal' menu = '크롬익스텐션' active = {props.active == 'portal'} onoff = {onoff}/>
                
            </div>
        </div>
    )
}