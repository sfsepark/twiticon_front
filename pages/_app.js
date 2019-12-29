import App, { Container, createUrl } from 'next/app'
import Head from 'next/head'
import Navbar from '../component/navbar'
import next_cookies from 'next-cookies'

import Banner from '../component/banner.js';
import ChatBox from '../component/chatBox.js';

const mainPageRoutes = ['/','/index','/follow','/explore']

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
                        } type = {
                            router.route == '/' || router.route == '/index' || router.route == '/follow' || router.route == '/explore'
                            ? 'main'
                            : 'other'
                        } {...pageProps}/>
                    </div>
                </div>
            </Container>
        )
    }
}