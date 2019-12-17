import App, { Container, createUrl } from 'next/app'
import Head from 'next/head'
import Navbar from '../component/navbar'

export default class MyApp extends App{
    static async getInitialProps({ Component, router, ctx }) {
    
        let pageProps = {}
    
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
                    : <Navbar type={router.route == '/' ?'main' : 'sub'}/>
                }

                <Component url = {createUrl(router)} {...pageProps} />
            </Container>
        )
    }
}