import Banner from '../component/banner.js';
import Head from 'next/head';

import '../scss/body.scss'

import next_cookies from 'next-cookies'
import MainPageContentsHeader from '../component/MainPageContentsHeader'
import MainPageContents from '../component/MainPageContents'


import ChatBox from '../component/chatBox.js';

 
class Index extends React.Component{

    static async getInitialProps(ctx){

        var props = {
            cookie : {
                twitchToken : next_cookies(ctx).twitchToken,
                userId : next_cookies(ctx).userId
            }
        }

        return props;
    }


    constructor(props){

        super(props);

        this.state = {
            mainPage : this.props.cookie.twitchToken ? 1 : 0
        };
    }

    render(){

        console.log(this.props);

        var mainPageContents = [];

        mainPageContents.push(<MainPageContents/>)

        if(this.props.cookie.userId){
            mainPageContents.push(<MainPageContents userId = {this.props.cookie.userId}/>);
        }

        return (
            <div className="main">
                <Head>
                    <title>트위티콘 - 트위치 이모티콘에 한글 별명을 달아보세요.</title>
                </Head>
                
                <Banner/>
                <div className = "main-contents-container">
                    <div className = "main-contents">
                        <MainPageContentsHeader 
                            isLogin = {this.props.cookie.userId !== undefined}
                            mainPageState = {this.state.mainPage}
                        />
                        {mainPageContents[this.state.mainPage]}
                    </div>    
                    <ChatBox width = {300} height = {1000}/>
                </div>
            </div>
        )
    }


}

export default Index;