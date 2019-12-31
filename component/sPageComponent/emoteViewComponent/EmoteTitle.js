export default (props) => {
    return (
        <div className = 'emoticon-info-view-title'>
            <div className = 'emoticon-info-view-flex'>
                <img 
                    src = {props.url}
                    className = 'emoticon-info-view-icon'/>
                <div className = 'emoticon-info-view-name'>
                    {props.name}
                </div>
            </div>
        </div>
    )
}
