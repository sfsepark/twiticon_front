export default (props) => {
    return <div className = 'emoticon-info-view-edit-textarea-container'>
            <textarea className = 'emoticon-info-view-edit-textarea' value = {props.alias} 
                onChange = {(e) => props.handleChange(e,props.index)}></textarea>
        </div>
};