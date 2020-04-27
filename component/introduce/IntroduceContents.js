import '../../scss/introduceContents.scss'
import IntroduceSectionHOC from './IntroduceSectionHOC';
import ChatBoxInput from '../chatboxComponent/ChatBoxInput';
import {baseURL} from '../../URL'
import Logo from '../Logo';

export default (props) => {
    const FirstSection = IntroduceSectionHOC(
        'introduce-section-first',
        <React.Fragment>
            <svg xmlns="http://www.w3.org/2000/svg" id="logo-_-wordmark-extruded-_-purple" data-name="logo-/-wordmark-extruded-/-purple" width="119" height="39.666" viewBox="0 0 119 39.666">
                <g id="logo-_-wordmark-extuded" data-name="logo-/-wordmark-extuded">
                    <path id="Combined-Shape" d="M11.483,0l5.271,7.307H49.062V0H72.026V7.307h7.307v3.131l3.131-3.131H91.83L97.1,0h11.46V7.307h5.219L119,12.526V30.272l-9.4,9.395h-26.1l-4.175-4.175v4.175H65.763l-4.175-4.175v4.175H33.4l-4.176-4.175v4.175H14.614L0,25.053V0Z" fill="#9146ff" fillRule="evenodd"/>
                    <path id="Combined-Shape-2" data-name="Combined-Shape" d="M15.279,6.928v7.307h7.307v8.351H15.279v2.088h7.307v8.351H11.1L6.929,28.849V6.928Zm17.746,7.307V24.673h2.087V14.235h8.351V24.673h2.088V14.235H53.9v18.79H28.849l-4.175-4.175V14.235ZM74.779,6.928v7.307h7.307v8.351H74.779v2.088h7.307v8.351H70.6l-4.175-4.175V6.928Zm36.535,0v7.307h6.264l4.175,4.175V33.024H113.4V22.585h-2.088V33.024h-8.351V6.927ZM64.341,14.235V33.024H55.99V14.235Zm36.535,0v8.351H92.525v2.088h8.351v8.351H88.35l-4.175-4.175V18.41l4.175-4.175ZM64.341,6.927v5.219H55.99V6.927Z" transform="translate(-4.841 -4.84)" fill="#fff" fillRule="evenodd"/>
                </g>
            </svg>
            <div className = 'introduce-title-txt'>
                에서 바로 사용하세요
            </div>
        </React.Fragment>,
        <div className = 'introduce-chatbox'>
            <ChatBoxInput cookie = {props.cookie} type = 'introduce'/>
        </div>,
        <div className = 'introduce-section-first__content'>
            PC에서 크롬익스텐션을 설치하고 트위치에 접속하면<br></br>
            모든 실시간 채팅창에서 바로 사용이 가능합니다.
        </div>
        
    );

    const SecondSeciton = IntroduceSectionHOC(
        'introduce-section-second',
        <div className = 'introduce-section-second__title-text'>
            5000개 이상의 구독이모티콘에 준비된 별명
        </div>
    )

    return (
        <div className = 'introduce-contents-container'>
            <div className = 'introduce-contents-top'>
                <img className = 'introduce-contents-top__logo-image' src = {baseURL + '/images/portal_128.png'}/>
                <Logo main = {false}/>
                <div className = 'introduce-contents-top__logo-text'>
                    차원문
                </div>
                <div className = 'introduce-cotents-top__content-text'>
                    트위치 채팅창에서 트위치 이모티콘을  한글로 입력할 수 있는 서비스입니다
                </div>

            </div>
            <FirstSection/>
            <SecondSeciton/>
        </div>
    );
}