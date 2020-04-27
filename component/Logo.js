import Router from 'next/router'
import '../scss/logo.scss'

export default (props) => {

    if(props.main === false){
        return (
            <div className = "header-logo">
                <div className = "header-logo-twiti">트위티</div>
                <div className = "header-logo-con">콘</div>
            </div>
        )
    }
    else{
        return (
            <div className = "header-logo" onClick = {() => Router.push('/')}>
                <div className = "header-logo-twiti">트위티</div>
                <div className = "header-logo-con">콘</div>
            </div>
        )
    }
}