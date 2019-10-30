/*
    상단 이모티콘 검색기에서 이모티콘을 검색하면
    하단에서 실시간으로 반영될 수 있도록 state설정을 해야한다. 
    component에 wrapper class를 만들고, 
    이 className에 display:none; style이 포함되어있는 class를 state의 속성에 따라서 넣었다 뺄수있는 것을 만들면된다.
*/

import '../scss/streamerInfo.scss';
import EmoticonSelector from './EmoticonSelector'
import EmoticonList from './EmoticonList'

class StreamerInfo extends React.Component{

    handleSelectEmoticon(ids){
 
        var emoticonInfo = JSON.parse(JSON.stringify(this.props.emoticonInfo));

        var curState = JSON.parse(JSON.stringify(this.state));
        var filteredEmoticonInfo = {};

        for(var i = 0 ; i < ids.length ; i ++){
            let id = ids[i];

            if(emoticonInfo[id] != undefined){
                filteredEmoticonInfo[id] = emoticonInfo[id];
            }
        }

        curState.emoticonInfo = filteredEmoticonInfo;

        this.setState(curState);
        
    }

    constructor(props){
        super(props);

        var emoticonInfo = JSON.parse(JSON.stringify(this.props.emoticonInfo));

        this.state = {
            emoticonInfo : emoticonInfo
        }

        this.handleSelectEmoticon = this.handleSelectEmoticon.bind(this);

        
    }

    render(){
        
        console.log(this.props.emoticonInfo);

        return (
            <div className = 'streamer-info'>
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
                            handleSelectEmoticon = {this.handleSelectEmoticon}/>
                    </div>
                </div>
                <EmoticonList
                    emoticonInfo = {this.props.emoticonInfo}
                    activeEmoticon = {this.state.emoticonInfo} /> 
                
            </div>
        );
    }
}

export default StreamerInfo;