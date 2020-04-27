import '../../scss/introduceContents.scss'

import {baseURL} from '../../URL'
import Logo from '../Logo';
import IntroduceFirstSection from './IntroduceFirstSection';
import IntroduceSecondSection from './IntroduceSecondSection';

export default (props) => {
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
            <IntroduceFirstSection {...props}/>
            <IntroduceSecondSection {...props}/>
        </div>
    );
}