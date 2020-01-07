import '../scss/emoticon.scss'


export default (props) => {

    var aliasList = '';

    if(props.info.alias_list && props.info.alias_list.length){
        for(var i = 0 ; i < props.info.alias_list.length ; i ++){
            if(i != 0){
                aliasList += '/';
            }
            aliasList += props.info.alias_list[i];
        }
    }

    return (
        <div className = 'emoticon-container'>
            <img src={props.info.url} className = 'emoticon-img'/>
            {
                props.info.name ? 
                (
                    <div className = 'tw-tooltip--down tw-tooltip--align-center tw-tooltip'>
                        {props.info.name}
                        {aliasList != '' ? 
                        (
                            <br/>
                        ): ''}
                        {aliasList}
                    </div>

                ) : null 
            }
            
        </div>

    )
}