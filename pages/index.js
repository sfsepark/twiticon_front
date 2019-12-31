
import Head from 'next/head';

import '../scss/body.scss'


import MainPageContentsHeader from '../component/mainpageComponent/MainPageContentsHeader'
import MainPageContents from '../component/mainpageComponent/MainPageContents'

 
class Index extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            mainPage : this.props.cookie.twitchToken ? 1 : 0
        };
    }

    componentDidMount(){
        var mainDOM = document.getElementsByClassName('main')[0];
        mainDOM.scrollTop = 0;
    }

    render(){
        var mainPageContents = [];

        mainPageContents.push(<MainPageContents/>)

        if(this.props.cookie.userId){
            mainPageContents.push(<MainPageContents userId = {this.props.cookie.userId}/>);
        }

        return (
            <div className = "main-contents">
                <Head>
                    <title>트위티콘 - 트위치 이모티콘에 한글 별명을 달아보세요.</title>
                </Head>
                <MainPageContentsHeader 
                    isLogin = {this.props.cookie.userId !== undefined}
                    mainPageState = {this.state.mainPage}
                />
                {mainPageContents[this.state.mainPage]}
            </div>                
        )
    }


}

export default Index;