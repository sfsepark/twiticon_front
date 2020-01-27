import '../scss/introducePortal.scss'
import IntroduceBanner from '../component/introduce/IntroduceBanner'
import IntroduceContents from '../component/introduce/IntroduceContents'

export default () => {
    return (
        <div className = 'introduce-portal-container'>
            <IntroduceBanner/>
            <IntroduceContents/>
        </div>
    );
}