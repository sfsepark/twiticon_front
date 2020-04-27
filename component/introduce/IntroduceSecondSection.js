import IntroduceSectionHOC from './IntroduceSectionHOC';

import React from 'react';

export default (props) => {
    const SecondSeciton =  IntroduceSectionHOC(
        'introduce-section-second',
        <div className = 'introduce-section-second__title-text'>
            5000개 이상의 구독이모티콘에 준비된 별명
        </div>,
        null
        ,<div className = 'introduce-section-second__content'>
            진성 트수 개발자가 미리 입력해둔 6000개 이상의 이모티콘의 별명과 <br/>
            지금도 트위티콘 사이트에서 입력받고 있는 별명을 통해  <br/>
            이모티콘에 한글 이름을 준비해놨습니다. <br/>
        </div>
    )

    return <SecondSeciton/>
}