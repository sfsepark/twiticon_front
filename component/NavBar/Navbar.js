import PcNavbar from './PcNavbar'
import React from 'react'
import MobileNavbar from './MobileNavbar'

export default (props) => {

    var active = '';

    var profile = props.cookie.profile;

    
    if(props.url.pathname == '/' || props.url.pathname == '/index'){
        if(profile && props.cookie['last-visited'] == 'follow')
            active = 'follow'
        else
            active = 'explore'
    }
    else if(props.url.pathname == '/explore'){
        active = 'explore'
    }
    else if(props.url.pathname == '/follow'){
        active = 'follow'
    }
    else if(props.url.pathname == '/portal'){
        active = 'portal'
    }
    else if(props.url.pathname == '/notice'){
        active = 'notice'
    }
    else if(props.url.pathname == '/basic'){
        active = 'basic'
    }

    return (
        <React.Fragment>
            <PcNavbar active = {active} {...props}/>
            <MobileNavbar active = {active} {...props}/>
        </React.Fragment>
    )
}