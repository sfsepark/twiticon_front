import '../scss/introducePortal.scss'
import IntroduceBanner from '../component/introduce/IntroduceBanner'
import IntroduceContents from '../component/introduce/IntroduceContents'

import Head from 'next/head';

export default (props) => {
    return (
        <div className = 'introduce-portal-container'>
                <Head>
                    <title>트위티콘 차원문을 사용해보세요!</title>
                </Head>
            <IntroduceBanner/>
            <IntroduceContents cookie = {props.cookie}/>
        </div>
    );
}