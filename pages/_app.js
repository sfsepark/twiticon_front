import App, { Container, createUrl } from 'next/app'
import Head from 'next/head'
import Navbar from '../component/navbar'
import next_cookies from 'next-cookies'

export default class MyApp extends App{
    static async getInitialProps({ Component, router, ctx }) {
    
        let pageProps = {
            cookie : {
                twitchToken : next_cookies(ctx).twitchToken,
                userId : next_cookies(ctx).userId,
                profile : next_cookies(ctx).profile
            }
        }
    
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }
    render(){
        const { Component, router, pageProps } = this.props

        return (
            <Container>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet"/>
                </Head>
                {
                    router.route == '/login' || router.route == '/logout'
                    ? null
                    : <Navbar 
                        type={router.route == '/' ?'main' : 'sub'}
                        url={createUrl(router)}
                        {...pageProps}/>
                }

                <Component url = {createUrl(router)} {...pageProps} />
            </Container>
        )
    }
}