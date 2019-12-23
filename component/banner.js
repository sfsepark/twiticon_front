import '../scss/banner.scss'

import React from 'react'

import SearchBar from '../component/searchBar.js';

export default class Banner extends React.Component{

    componentDidMount(){
        console.log('test_banner');
    }

    render(){
        return (
            <div className = "banner-background">
                <div className = "banner-title">여러분들이 직접 이모티콘의 별명을 지어주세요</div>
                <SearchBar type='main'/>
            </div>
        )
    }
}