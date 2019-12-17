import ChatBox from '../component/chatBox'

export default (props) => {

    //console.log(props.)
    return <ChatBox width = {props.width ? props.width : 500} height = {props.height ? props.height : 500}/>;
}