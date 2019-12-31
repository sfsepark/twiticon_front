import EmoticonInfoView from './emoticonInfoView'

import '../../scss/emoticonList.scss';

class EmoticonList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        var activeEmoticon = this.props.activeEmoticon;

        var emoticonInfoValues = Object.values(this.props.emoticonInfo);

        var emoticonList = [];

        for(var i = 0 ; i < emoticonInfoValues.length ; i ++){
            emoticonList = emoticonList.concat(emoticonInfoValues[i]);
        }

        var twitchToken = this.props.twitchToken;

        var emoticonListComponent = emoticonList.map(info => {
                return (
                    <div className = {'emoticon-info-view' + (activeEmoticon.includes(info.id) ? '-visible' : '-invisible')}>
                        <EmoticonInfoView 
                            info = {info}
                            twitchToken = {twitchToken}/>
                    </div>
                )
            }
        )

        return (
            <div className = 'streamer-info-container'>
                {emoticonListComponent}
            </div>
        )

    }
}

export default EmoticonList