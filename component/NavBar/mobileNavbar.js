import '../../scss/mobileNavbar.scss'
import Logo from '../logo'

import { useState } from 'react'

export default (props) => {

    

    return (
        <div className = 'mobile-nav-bar'>
            <div className = 'mobile-nav-bar-search-button'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25.044" height="29.356" viewBox="0 0 25.044 29.356">
                <g id="icon_search" transform="translate(1.5 1.5)">
                    <path id="패스_1551" data-name="패스 1551" d="M0,0,5.554,6.518" transform="translate(16.848 20.366)" fill="none" stroke="#b9b9b9" stroke-width="3"/>
                    <ellipse id="타원_1" data-name="타원 1" cx="10.497" cy="10.799" rx="10.497" ry="10.799" transform="translate(0 0)" fill="none" stroke="#4e4e4e" stroke-miterlimit="10" stroke-width="3"/>
                </g>
            </svg>
            </div>
            <Logo/>
            <div className = 'mobile-nav-bar-menu-button'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="19" viewBox="0 0 32 19">
                <g id="그룹_144" data-name="그룹 144" transform="translate(-498.5 -30)">
                    <line id="선_10" data-name="선 10" x2="32" transform="translate(498.5 31.5)" fill="none" stroke="#707070" stroke-width="3"/>
                    <line id="선_11" data-name="선 11" x2="32" transform="translate(498.5 39.5)" fill="none" stroke="#707070" stroke-width="3"/>
                    <line id="선_12" data-name="선 12" x2="32" transform="translate(498.5 47.5)" fill="none" stroke="#707070" stroke-width="3"/>
                </g>
                </svg>
            </div>
        </div>
    )
}