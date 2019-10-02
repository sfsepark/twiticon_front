
import Header from '../component/header.js';
import Head from 'next/head';

import '../scss/body.scss'

const Index  = function({url: {query: access_token}}){

    return (
        <div className="main">
            <Head>
                <title>트위티콘 - 트위치 이모티콘에 한글 별명을 달아보세요.</title>
            </Head>
            <Header/>
        </div>
    )

}

export default Index;