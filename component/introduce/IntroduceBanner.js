import '../../scss/IntroduceBanner.scss'

export default () => {



    return (
        <div className = 'introduce-banner-bg'>
            <div className = 'introduce-banner-image-bg'>
                <div className = 'introduce-banner-magenta'/>
                <div className = 'introduce-banner-contents-container'>
                    <div className = 'introduce-banner-contents'>
                        <div className = 'introduce-banner-contents-1'>
                            여러분들의 이모티콘을
                        </div>
                        <div className = 'introduce-banner-contents-2'>
                            번역해드립니다
                        </div>
                    </div>
                    <a href = 'https://chrome.google.com/webstore/detail/hiiacklliopliehdgadldnhhpghlahla' target = '_blank'>
                        <img className = 'introduce-download-button' src = 'https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_496x150.png'/>
                    </a>
                </div>
            </div>
        </div>
    )
}