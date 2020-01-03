
import Head from 'next/head';

import '../scss/body.scss'


import MainPageContentsHeader from '../component/mainpageComponent/MainPageContentsHeader'
import MainPageContents from '../component/mainpageComponent/MainPageContents'

import cookies from '../methods/cookies'

class Index extends React.Component{

    constructor(props){

        super(props);
    }

    componentDidMount(){
        var mainDOM = document.getElementsByClassName('main')[0];
        mainDOM.scrollTop = 0;

        cookies.setCookie('last-visited', 'follow', 7);
    }

    render(){
        var mainPageContents = [];

        mainPageContents.push(<MainPageContents/>)

        return (
            <div className = "main-contents">
                <Head>
                    <title>트위티콘 - 트위치 이모티콘에 한글 별명을 달아보세요.</title>
                </Head>
                <MainPageContentsHeader 
                    isLogin = {this.props.cookie.userId !== undefined}
                    mainPageState = {0}
                />
                {mainPageContents[0]}
            </div>    
        )
    }


}

export default Index;