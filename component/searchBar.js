import '../scss/searchBar.scss'

class SearchBar extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            value : this.props.value ? this.props.value : ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event){
        window.location.href = 'search?query=' + this.state.value;

        event.preventDefault();
    }

    componentDidMount(){
        var searchTextareas = document.getElementsByClassName('searchbar-textarea');

        for(var i = 0 ; i < searchTextareas.length ;i ++){
            (function(searchTextarea){
                searchTextarea.addEventListener('keypress', function(e){

                    if(e.keyCode == 13){
                        window.location.href = '/search?query=' + searchTextarea.value;
                    }
                });
            })(searchTextareas[i]);
            
        }
    }

    render(){

        var banner_search_bar_class = "searchbar";
        if(this.props.type == 'main') banner_search_bar_class += ' searchbar-banner'
        else banner_search_bar_class += ' searchbar-header';

        return (
            <div className = {banner_search_bar_class}>
                <div className = 'search-bar-wrapper'>
                    <textarea className = "searchbar-textarea"  value={this.state.value} maxLength="77" onChange={this.handleChange} placeholder="스트리머, 이모티콘 이름"></textarea>
                    <div className = "searchbar-search-button" onClick={this.handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={this.props.type == 'main' ? 40 : 20} height={this.props.type == 'main' ? 48 : 24} viewBox="0 0 42.642 50.473">
                        <g id="icon_search" transform="translate(1.5 1.5)">
                            <path id="패스_1551" data-name="패스 1551" d="M0,0,9.917,11.637" transform="translate(30.083 36.363)" fill="none" stroke="#b9b9b9" strokeWidth="3"/>
                            <ellipse id="타원_1" data-name="타원 1" cx="18.743" cy="19.281" rx="18.743" ry="19.281" transform="translate(0 0)" fill="none" stroke="#e5e5e5" strokeMiterlimit="10" strokeWidth="3"/>
                        </g>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;