import '../scss/header.scss';
import Link from 'next/link';

const Header  = function(props){

    return (
        <div className = "header-box">
            <div className = "header-logo-twiti">트위티</div>
            <div className = "header-logo-con">콘</div>
            <Link href ='' ><a className = "header-menu header-basic-emote">기본 이모티콘</a></Link>
            <Link href =''><a className = "header-menu header-usage">사용법</a></Link>
            <Link href =''><a className = "header-menu header-twiticon-portal">트위티콘 차원문</a></Link>
            <Link href =''><a className = "header-menu header-notice">공지사항</a></Link>


        
        </div>
    )
}

export default Header;


/*
    <UserInfo 
                className = "header-userinfo" 
                userLogo = {props.userLogo}
            ></UserInfo>
*/