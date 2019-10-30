import EmoticonInfoView from './emoticonInfoView.js'

import './scss/emoticonList.scss';

class EmoticonList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        var activeEmoticon = this.props.activeEmoticon;

        var emoticonList = this.props.emoticonInfo.map(info => 
            (
                <div className = {'emoticon-info-view' + (info.id in activeEmoticon ? '-visible' : '-invisible')}>
                    <EmoticonInfoView info = {info}/>
                </div>
            )
        )

        return (
            {emoticonList}
        )
    }
}

export default EmoticonList