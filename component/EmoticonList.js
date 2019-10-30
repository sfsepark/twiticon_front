class EmoticonList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        this.props.emoticonInfo.map(info => <EmoticonCompont info = {info}/>)

        return (
            
        )
    }
}

export default EmoticonList