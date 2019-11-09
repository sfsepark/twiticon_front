import '../scss/emoticonList.scss';

function EmoticonAlias(props){


    return (
        <div className = 'emoticon-info-alias-wrapper'>

            <div className = 'emoticon-info-alias-arrow-wrapper'>
                <div className = 'emoticon-info-alias-arrow'/>
            </div>
            <div className = 'emoticon-info-alias'>  
                <div className = 'emoticon-info-alias-text'>
                    {props.alias}
                </div>
            </div>
        </div>
    )
}

export default EmoticonAlias