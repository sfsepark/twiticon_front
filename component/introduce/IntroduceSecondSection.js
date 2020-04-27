import IntroduceSectionHOC from './IntroduceSectionHOC';

import React from 'react';

export default (props) => {
    const SecondSeciton =  IntroduceSectionHOC(
        'introduce-section-second',
        <div className = 'introduce-section-second__title-text'>
            5000개 이상의 구독이모티콘에 준비된 별명
        </div>
    )

    return <SecondSeciton/>
}