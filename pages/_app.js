import App, { Container, createUrl } from 'next/app'
import Head from 'next/head'
import Navbar from '../component/NavBar/Navbar'
import next_cookies from 'next-cookies'

import Banner from '../component/Banner.js';
import ChatBox from '../component/chatboxComponent/ChatBox';

import mobileCheck from '../methods/mobileCheck'
import alias_info from '../methods/twiticon_portal/backend/alias_info';
import emote_data from '../methods/twiticon_portal/frontend/emote_data';
import shortcut_background from '../methods/twiticon_portal/backend/shortcut_background';

const mainPageRoutes = ['/','/index','/follow','/explore']
const chatBoxHideRoutes = ['/introduce']

export default class MyApp extends App{
    static async getInitialProps({ Component, router, ctx }) {

        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        pageProps.cookie =   {
            twitchToken : next_cookies(ctx).twitchToken,
            userId : next_cookies(ctx).userId,
            profile : next_cookies(ctx).profile,
            name : next_cookies(ctx).name,
            'last-visited' : next_cookies(ctx)['last-visited']
        }

        const userAgent = ctx.req
        ? ctx.req.headers["user-agent"]
        : navigator.userAgent;
  
        if (mobileCheck(userAgent)) {
            pageProps.isMobile = true;
        } else {
            pageProps.isMobile = false;
        }

        return { pageProps }
    }

    constructor(props){
        super(props);

        this.mainPageScrollEvent = this.mainPageScrollEvent.bind(this);


    }

    async mainPageScrollEvent(event) {
    
        if(event.target.scrollTop > 318){
            if(this.state.type  == 'main'){
                this.setState({type : 'sub'})
            }
        }
        else {
            if(this.state.type  == 'sub'){
                this.setState({type : 'main'})
            }
        }
    }

    componentDidMount(){

        if(mainPageRoutes.includes(this.props.router.route)){
            var mainDOM = document.getElementsByClassName('main')[0];
            if(mainDOM != undefined){
                mainDOM.addEventListener('scroll',this.mainPageScrollEvent);
            }
        }

        //트위티콘 차원문 초기화

        const { pageProps } = this.props;

        if( pageProps.cookie.userId &&  pageProps.cookie.twitchToken){
            shortcut_background.init({
                authToken :  pageProps.cookie.twitchToken,
                id :  pageProps.cookie.userId
            })
        }
        else{
            shortcut_background.init(null);
        }

        alias_info.refresh((response) => {
            emote_data.aliasLoad(response);
        });

    }

    componentDidUpdate(prevProps,prevState){

        if(prevState.type == this.state.type){

            var mainDOM = document.getElementsByClassName('main')[0];

            if(mainDOM != undefined){
                mainDOM.removeEventListener('scroll',this.mainPageScrollEvent);
            }

            if(mainPageRoutes.includes(this.props.router.route)){
                
                if(mainDOM != undefined){
                    mainDOM.addEventListener('scroll',this.mainPageScrollEvent);
                }
            }
        }
    
    }



    state = {
        type : 'main'
    }

    render(){
        const { Component, router, pageProps } = this.props;

        if(router.route == '/login' || router.route == '/logout'){
            return <Component url = {createUrl(router)} {...pageProps} />
        }

        return (
            <Container>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet"/>
                    <link rel="icon" href="/images/favicon.ico?v=2" type="image/x-icon"/>
                    <link rel="shortcut icon" href="https://twiticon.com/images/favicon.ico?v=2" type="image/x-icon"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
                </Head>

                <Navbar 
                    type={
                        mainPageRoutes.includes(router.route) 
                        ? this.state.type
                        : 'sub'}
                    url={createUrl(router)}
                    {...pageProps}/>
                
                <div className={"main "  + (mainPageRoutes.includes(router.route) 
                        ? ('main-' + this.state.type)
                        : 'main-sub')}>
                    {
                        router.route == '/' || router.route == '/index' || router.route == '/follow' || router.route == '/explore'
                        ? <Banner/>
                        : null
                    }
                    
                    <div className = {
                        "main-contents-container " 
                        + (chatBoxHideRoutes.includes(router.route) 
                        ? 'main-contents-container-chatbox-hide'
                        : '')
                        }>
                        <Component url = {createUrl(router)} {...pageProps} />
                        {   
                            pageProps.isMobile ? null :
                            <ChatBox width = {300} height = {
                                router.route == '/' || router.route == '/index' || router.route == '/follow' || router.route == '/explore'
                                ? 460
                                : 612
                            } type = {
                                router.route == '/' || router.route == '/index' || router.route == '/follow' || router.route == '/explore'
                                ? 'main'
                                : 'other'
                            } {...pageProps}/>
                        }
                    </div>
                </div>
            </Container>
        )
    }
}
