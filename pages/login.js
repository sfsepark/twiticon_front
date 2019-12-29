import client_id from '../data/client_id'
import Router from 'next/router'
import { baseURL } from '../URL'

import React from 'react'

import axios from 'axios'
import cookies from '../methods/cookies'

class login extends React.Component{

    componentDidMount(){
        var access_token = new URLSearchParams( window.location.hash.substr(1)).get('access_token') ;

        if(access_token == null){
            
            window.location.href = "https://id.twitch.tv/oauth2/authorize?client_id=" + client_id +"&redirect_uri="+ baseURL + '/login' + "&response_type=token&scope=user_subscriptions+user_read";
        }
        else{            
            cookies.setCookie('twitchToken',access_token, 7);

            axios.get('https://api.twitch.tv/kraken/user', 
            {
                headers: 
                    {
                        'Accept': 'application/vnd.twitchtv.v5+json',
                        'Client-ID' : client_id,
                        'Authorization' : 'OAuth ' + access_token
                    }
            }
            ).then((data) => {

                var profile = data.data.logo;
                var userId = data.data._id;
                var name = data.data.name;
                cookies.setCookie('profile',profile,7);
                cookies.setCookie('userId',userId, 7);
                cookies.setCookie('name',name, 7);
            }).catch((err) =>{
                console.log(err);
            }).finally(() => {
                var history = cookies.getCookie('history')

                if(history == null)
                    Router.push(baseURL);
                else{
                    cookies.deleteCookie('history')
                    Router.push(history)
                }
            });

        }
    }


    render(){
        return null;
    }
}

export default login;