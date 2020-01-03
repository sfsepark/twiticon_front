export default (props) => {
    return  (
        <div className = {'chatbox-chat-log ' + (props.logToggle ? '' : 'chatbox-chat-log-off')}>
            <div className = 'chatbox-chat-log-txt'>
                {props.logMsg}
            </div>
            <div className = 'chatbox-chat-log-cancle-button'
                onClick= {(e) => props.turnOff()}>
            <svg className = 'chatbox-chat-log-cancle-button-svg' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 13.121 13.121">
            <g id="그룹_143" data-name="그룹 143" transform="translate(-523.439 -907.439)">
            <line id="선_15" data-name="선 15" x2="11" y2="11" transform="translate(524.5 908.5)" fill="none" stroke="#777777" strokeWidth="4"/>
            <line id="선_16" data-name="선 16" y1="11" x2="11" transform="translate(524.5 908.5)" fill="none" stroke="#777777" strokeWidth="4"/>
            </g>
            </svg>
    
            </div>            
        </div>
    )
}