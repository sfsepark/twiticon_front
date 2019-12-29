import cookies from '../methods/cookies'
import React from 'react'
import Router from 'next/router'
import { baseURL } from '../URL'


class logout extends React.Component{

    componentDidMount(){
        cookies.deleteCookie('twitchToken');
        cookies.deleteCookie('userId');
        cookies.deleteCookie('profile');
        cookies.deleteCookie('name');

        var history = cookies.getCookie('history')

        if(history == null)
            window.location.href = baseURL;
        else{
            cookies.deleteCookie('history')
            window.location.href = history
        }
    }

    render(){
        return null;
    }
}

export default logout;