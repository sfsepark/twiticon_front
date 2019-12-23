
import Head from 'next/head';

import '../scss/body.scss'


import MainPageContentsHeader from '../component/MainPageContentsHeader'
import MainPageContents from '../component/MainPageContents'


import ChatBox from '../component/chatBox.js';

import next_cookies from 'next-cookies'

 
class Index extends React.Component{

    static async getInitialProps(ctx){
        
        let twitchToken = next_cookies(ctx).twitchToken;
        if(!twitchToken){
            if(ctx.res){
                ctx.res.writeHead(302,{
                    Location : '/'
                })
                ctx.res.end();
                

            }
            else {
                Router.push('/');
            }
        }

        return {};
    }

    constructor(props){

        super(props);

    }

    render(){
        var mainPageContents = [];

        mainPageContents.push(<MainPageContents userId = {this.props.cookie.userId}/>);
        
        return (
            <div className = "main-contents">
                <Head>
                    <title>트위티콘 - 트위치 이모티콘에 한글 별명을 달아보세요.</title>
                </Head>
                <MainPageContentsHeader 
                    isLogin = {this.props.cookie.userId !== undefined}
                    mainPageState = {1}
                />
                {mainPageContents[0]}
            </div>    

        )
    }


}

export default Index;