import PcNavbar from './pcNavbar'
import React from 'react'
import MobileNavbar from './mobileNavbar'

export default (props) => {
    return (
        <React.Fragment>
            <PcNavbar {...props}/>
            <MobileNavbar {...props}/>
        </React.Fragment>
    )
}