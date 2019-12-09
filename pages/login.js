import client_id from '../data/client_id'
import Router from 'next/router'

class login extends React.Component{

    componentDidMount(){
        var access_token = new URLSearchParams( window.location.hash.substr(1)).get('access_token') ;

        if(access_token == null){
            Router.push("https://id.twitch.tv/oauth2/authorize?client_id=" + client_id +"&redirect_uri="+ baseURL + "&response_type=token&scope=user_subscriptions+user_read");
        }
        else{
            
        }
    }


    render(){
        return null;
    }
}