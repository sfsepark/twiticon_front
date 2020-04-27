import RightTriangle from '../RightTriangle';
import Link from 'next/link';

export default function(){
    return (
        <div className = 'chatbox-header-container'>
            <div className = 'chatbox-header-nav'>
                <Link href = '/extension'>
                    <a>
                    <div className = 'flex chatbox-header-nav-button'>
                        <img src = "https://twiticon.com/images/favicon.ico?v=2"/>
                        <div className = 'chatbox-header-nav-txt'>
                            트위티콘 차원문 알아보기
                        </div>
                        <RightTriangle/>
                    </div>
                    </a>
                </Link>
            </div>
            <div className = 'chatbox-header-try'>
                <div className = 'chatbox-header-try-txt'>
                    트위티콘 차원문을 사용해보세요!
                </div>
            </div>

        </div>
    )
}