import '../scss/introducePortal.scss'
import IntroduceBanner from '../component/introduce/IntroduceBanner'
import IntroduceContents from '../component/introduce/IntroduceContents'

export default (props) => {
    return (
        <div className = 'introduce-portal-container'>
            <IntroduceBanner/>
            <IntroduceContents cookie = {props.cookie}/>
        </div>
    );
}