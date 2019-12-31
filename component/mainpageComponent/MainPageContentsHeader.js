export default (props) => {
    return  <div className = 'main-contents-header'>
        <div className = 'flex space-between'>
            <div className = "main-contents-title">
                <div className = 'flex'>
                    <div className = "main-contents-title-state">
                        {props.mainPageState == 1 ? '팔로우' : '방송'} 중
                    </div>
                    <div className = "main-contents-title-streamer">
                        인 스트리머
                    </div>
                </div>
            </div>
        </div>
    </div>
}