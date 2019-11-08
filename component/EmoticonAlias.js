import '../scss/emoticonList.scss';

function EmoticonAlias(props){


    return (
        <div className = 'emoticon-info-alias'>
            <div className = 'emoticon-info-alias-arrow'/>
            <div className = 'emoticon-info-alias-text'>
                {props.alias}
            </div>
        </div>

    )
}

export default EmoticonAlias