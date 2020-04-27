/*
    상단 이모티콘 검색기에서 이모티콘을 검색하면
    하단에서 실시간으로 반영될 수 있도록 state설정을 해야한다. 
    component에 wrapper class를 만들고, 
    이 className에 display:none; style이 포함되어있는 class를 state의 속성에 따라서 넣었다 뺄수있는 것을 만들면된다.
*/

import '../../scss/streamerInfo.scss';
import EmoticonSelector from './EmoticonSelector'
import EmoticonList from './EmoticonList'
import Head from 'next/head';

class StreamerInfo extends React.Component{

    constructor(props){
        super(props);

        var emoticonInfo = JSON.parse(JSON.stringify(this.props.emoticonInfo));

        this.emoticonKeys = [];
        this.emoticonDict = {};
        var emoticonList = Object.values(emoticonInfo);
        for(let i = 0 ; i < emoticonList.length ; i ++){
            this.emoticonKeys = this.emoticonKeys.concat(emoticonList[i].map(info => info.id));
            for(let j = 0 ; j < emoticonList[i].length ; j ++){
                this.emoticonDict[emoticonList[i][j].id] = emoticonList[i][j];
            }
        }

        this.state = {
            activeEmoticon : JSON.parse(JSON.stringify(this.emoticonKeys))
        }

        this.handleSelectEmoticon = this.handleSelectEmoticon.bind(this);
        
    }

    handleSelectEmoticon(ids){

        var curState = JSON.parse(JSON.stringify(this.state));
        

        if(ids == undefined){
            curState.activeEmoticon = JSON.parse(JSON.stringify(this.emoticonKeys));
        }
        else{
            var activeEmoticon = [];
            var emoticonInfo = JSON.parse(JSON.stringify(this.props.emoticonInfo));
            var emoticonList = Object.values(emoticonInfo);
            for(let i = 0 ; i < emoticonList.length ; i ++){
                activeEmoticon = activeEmoticon.concat(emoticonList[i].map(info => info.id).filter(id => ids.includes(id)));
            }

            curState.activeEmoticon = activeEmoticon;
        }

        this.setState(curState);
        
    }

    render(){
        /*
            {
                id: 1096502,
                name: 'jadongDia',
                url: 'https://static-cdn.jtvnw.net/emoticons/v1/1096502/1.0',
                width: 28,
                height: 28,
                emoticon_set: 42197,
                alias_list: [Array],
                fixed: true
            }
        */

        let emoteNameList = '' 
        let nonAliasEmoteNameList = ''
        Object.values(this.props.emoticonInfo).forEach(emote_set => {
            emote_set.forEach(emote => {
                if(emote.alias_list.length > 0)
                    emoteNameList += `${emote.name}(${emote.alias_list[0]}) `;
                else
                    nonAliasEmoteNameList += `${emote.name} `
            })
        })

        emoteNameList += nonAliasEmoteNameList;

        return (
            <div className = 'streamer-info'>
                <Head>
                    <title>{`트위티콘 - ${this.props.channelInfo.display_name} (${this.props.channelInfo.name}) 님의 이모티콘과 한글 별칭`} </title>
                    <meta name = "description" content = {`${this.props.channelInfo.display_name}(${this.props.channelInfo.name}) 님의 이모티콘 - ${emoteNameList}`}></meta>
                </Head>
                <div className = 'streamer-info-header'>
                    <div className = 'streamer-info-header-flex  streamer-info-container'>
                        <div className = 'streamer-info-title'>
                            <div className = 'streamer-info-title-flex'>
                                <img className = 'streamer-info-title-logo' src = {this.props.channelInfo.logo}/>
                                <div className = 'streamer-info-title-name-container'>
                                
                                    <div className = 'streamer-info-title-displayname'>
                                        {this.props.channelInfo.display_name}
                                    </div>
                                    <div className = 'streamer-info-title-name'>
                                        {this.props.channelInfo.name}
                                    </div>
                                </div>

                            </div>    
                        </div>

                        <EmoticonSelector 
                            emoticonInfo = {this.props.emoticonInfo}
                            activeEmoticon = {this.state.activeEmoticon} 
                            handleSelectEmoticon = {this.handleSelectEmoticon}/>
                    </div>
                </div>
                <EmoticonList
                    emoticonInfo = {this.props.emoticonInfo}
                    activeEmoticon = {this.state.activeEmoticon} 
                    twitchToken = {this.props.twitchToken}/> 
                
            </div>
        );
    }
}

export default StreamerInfo;