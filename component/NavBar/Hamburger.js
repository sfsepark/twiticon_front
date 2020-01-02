import '../../scss/hamburger.scss'
import UserInfo from './userInfo';

export default (props) => {
    return (
        <div className = {'hamburger-container ' 
            + (props.toggle ? 'hamburger-container-on' : '')}
            onClick = {
                () => {
                    props.onoff();
                }
            }>
            <div className = 'hamburger-menu'>

            </div>
        </div>
    )
}