export default (props) => {

    var rightSection = null;

    if(props.fixed){
        rightSection = (
            <div className = 'emoticon-info-view-fixed'>
                <div className = 'emoticon-info-view-fixed-log'>
                    관리자에 의해 별명이 확정되었습니다.
                </div>
                <div className = 'emoticon-info-view-fixed-log emoticon-info-view-fixed-log-mobile'>
                    별명이 고정되었습니다.
                </div>
                <div className = 'emoticon-info-view-fixed-svg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="34.78" height="45.587" viewBox="0 0 34.78 45.587">
                    <g id="lock-padlock-symbol-for-protect_icon-icons.com_56926" transform="matrix(1, -0.017, 0.017, 1, -60.133, 2.143)">
                        <path id="패스_1" dataName="패스 1" d="M88.151,19.25V11a11,11,0,1,0-22,0v8.25a5.5,5.5,0,0,0-5.5,5.5V38.5a5.5,5.5,0,0,0,5.5,5.5h22a5.5,5.5,0,0,0,5.5-5.5V24.75A5.5,5.5,0,0,0,88.151,19.25ZM78.526,32.578v4.547a1.375,1.375,0,0,1-2.75,0V32.578A2.708,2.708,0,0,1,74.4,30.25a2.75,2.75,0,1,1,5.5,0A2.709,2.709,0,0,1,78.526,32.578ZM82.651,19.25h-11V11a5.5,5.5,0,1,1,11,0v8.25Z" fill="#b5b5b5" stroke="#fff" strokeWidth="1"/>
                    </g>
                    </svg>
                </div>
            </div>
        )
    }
    else{
        if(props.edit == false){
            rightSection = (
                <div className = 'emoticon-info-edit-button edit-button'
                    onClick = {() => props.handleClickEditState()}>
                    <div className = 'emoticon-info-edit-txt'>
                        별명 이름 짓기
                    </div>
                </div>
            )
        }
        else{
            rightSection = (
                <div className = 'emoticon-info-editing'>
                    <div className = 'emoticon-submit-button edit-button'>
                        <div className = 'emoticon-info-edit-txt'
                            onClick = {() => props.handleSubmit()}>
                            변경
                        </div>
                    </div>
                    <div className = 'emoticon-cancle-button edit-button'
                        onClick = {() => props.handleClickEditState()}>
                        <div className = 'emoticon-info-edit-txt'>
                            취소
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className = 'emoticon-info-button-pannel'>
            {rightSection}
        </div>
    );
}