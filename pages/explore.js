
import Head from 'next/head';

import '../scss/body.scss'


import MainPageContentsHeader from '../component/MainPageContentsHeader'
import MainPageContents from '../component/MainPageContents'


import ChatBox from '../component/chatBox.js';

 
class Index extends React.Component{

    constructor(props){

        super(props);
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