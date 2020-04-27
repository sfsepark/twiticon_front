

export default (className, title, image, contents) => {
    return function(){
        return (
            <div className = {'introduce-section-container introduce-section ' + className}>
                <div className = 'introduce-section-title'>
                    {title}
                </div>
                <div className = 'introduce-section-contents'>
                    {contents}
                </div>
                <div className = 'introduce-section-image'>
                    {image}
                </div>
            </div>
        )
    }
}