import '../scss/main.scss'

/*
    SSR 해야하는 것 : 최초 
*/

class MainPageContents extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            focusID : -1
        }
    }



    render(){

        //this.props.liveStreams.filter(liveStream => )

        return (
            <div className = "main-contents">
                <div className = 'main-contents-header'>
                    <div className = 'flex space-between'>
                        <div className = "main-contents-title">
                            <div className = 'flex'>
                                <div className = "main-contents-title-state">
                                    방송 중
                                </div>
                                <div className = "main-contents-title-streamer">
                                    인 스트리머
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'main-contents-body'>
                    <div className = 'flex space-between'>

                    </div>
                </div>
            </div>    
        )
    }
}

export default MainPageContents;