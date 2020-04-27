import IntroduceSectionHOC from './IntroduceSectionHOC';

import React from 'react';

export default (props) => {
    const ThirdSeciton =  IntroduceSectionHOC(
        'introduce-section-third',
         <div className = 'introduce-section-third__title-text'>
            너무나도 간단한 사용법
        </div>,
        <div className = 'introduce-section-third__image'>
        <video src="https://sfsepark.github.io/images/twiticon_portal_demo.mp4" autoPlay loop muted></video>
        </div>,
        <div className = 'introduce-section-third__content'>
            이모티콘 선택기에서 느릿느릿 이모티콘을 찾을 필요가 없습니다!<br/>
            채팅창에서 <img src = 'https://static-cdn.jtvnw.net/emoticons/v1/69/1.0'/>  '블러드트레일' 이라고 입력해보세요 <br/>
            추천이모티콘이 나오면 TAB이나 F1~F5를 입력해보세요<br/>
            스마트한 차원문이 상황에 맞게 이모티콘을 추천해드립니다<br/>
        </div>
    )

    return <ThirdSeciton/>
}