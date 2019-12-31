import EmoticonAlias from '../../EmoticonAlias';
import EmoticonAliasTextArea from '../../EmoticonAliasTextArea';

export default (props) => {
    var aliasList;

    if(props.edit == false){
        aliasList = props.alias_list.map(alias => <EmoticonAlias alias = {alias} height = {33}/>)
    }
    else{

        const handleChange = props.handleChange;
        const handleDelete = props.handleDelete;

        aliasList = props.alias_list.map((alias,i) => 
        {
            return <EmoticonAliasTextArea 
                alias = {alias}
                key = {props.name + '-' + i}
                index = {i}
                handleChange = {handleChange}
                handleDelete = {handleDelete}
                height = {39}
            />
        })
    }

    return  (
        <div className = 'emoticon-info-view-aliases'>
            {aliasList}
            {props.edit  && props.alias_list.length < 5
            ? <div className = 'emoticon-info-view-add-button'
                onClick = {e => props.handleAdd()}>
                <svg className = 'emoticon-info-view-add-button-svg' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <g id="그룹_141" data-name="그룹 141" transform="translate(-601.5 -920.5)">
                    <line id="선_7" data-name="선 7" x2="20" transform="translate(601.5 930.5)" fill="none" stroke="#fff" strokeWidth="5"/>
                    <line id="선_8" data-name="선 8" y1="20" transform="translate(611.5 920.5)" fill="none" stroke="#fff" strokeWidth="5"/>
                </g>
                </svg>
                </div>
            : null}
        </div>
    )
}