import App, { Container } from 'next/app'
import Head from 'next/head'

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
                <Header type='main' twitchToken={this.state.twitchToken} profile={this.props.cookie.profile}/>
                <Component url = {router} {...pageProps} />
            </Container>
        )
    }
}