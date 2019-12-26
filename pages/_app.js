import App, { Container, createUrl } from 'next/app'
import Head from 'next/head'
import Navbar from '../component/navbar'
import next_cookies from 'next-cookies'

import Banner from '../component/banner.js';
import ChatBox from '../component/chatBox.js';

export default class MyApp extends App{
    static async getInitialProps({ Component, router, ctx }) {

        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        pageProps.cookie =   {
            twitchToken : next_cookies(ctx).twitchToken,
            userId : next_cookies(ctx).userId,
            profile : next_cookies(ctx).profile
        }

        return { pageProps }
    }

    componentDidMount(){
        var mainDOM = document.getElementsByClassName('main')[0];

        ((_this) => {
            mainDOM.addEventListener('scroll',async event => {

                if(mainDOM.scrollTop > 318){
                    if(_this.state.type  == 'main'){
                        _this.setState({type : 'sub'})
                    }
                }
                else {
                    if(_this.state.type  == 'sub'){
                        _this.setState({type : 'main'})
                    }
                }
            })
        })(this);
    }

    state = {
        type : 'main'
    }

    render(){
        const { Component, router, pageProps } = this.props
        const mainPageRoutes = ['/','/index','/follow','/explore']

        if(router.route == '/login' || router.route == '/logout'){
            return <Component url = {createUrl(router)} {...pageProps} />
        }

        return (
            <Container>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet"/>
                </Head>

                <Navbar 
                    type={
                        mainPageRoutes.includes(router.route) 
                        ? this.state.type
                        : 'sub'}
                    url={createUrl(router)}
                    {...pageProps}/>
                
                <div className="main">
                    {
                        router.route == '/' || router.route == '/index' || router.route == '/follow' || router.route == '/explore'
                        ? <Banner/>
                        : null
                    }
                    
                    <div className = "main-contents-container">
                        <Component url = {createUrl(router)} {...pageProps} />
                        <ChatBox width = {300} height = {
                            router.route == '/' || router.route == '/index' || router.route == '/follow' || router.route == '/explore'
                            ? 460
                            : 612
                        }/>
                    </div>
                </div>
            </Container>
        )
    }
}