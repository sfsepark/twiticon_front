import '../scss/emoticonList.scss';

function EmoticonAlias(props){

    var height = props.height;

    return (
        <div className = 'emoticon-info-alias-wrapper'
            style = {{height : height}}>
            <div className = 'emoticon-info-alias-arrow-wrapper'>
                <div className = 'emoticon-info-alias-arrow'
                    style = {{
                        margin: (height/39) * 5,
                        width : (height/39) * 11,
                        height: (height/39) * 11
                    }}/>
            </div>
            <div className = 'emoticon-info-alias'
                style = {{
                    marginLeft: (height/39) * 10
                }}>  
                <div className = 'emoticon-info-alias-text'
                    style = {{
                        fontSize : (height/39)*23 ,
                        marginLeft: (height/39) * 10
                    }}>
                    {props.alias}
                </div>
            </div>
        </div>
    )
}

export default EmoticonAlias