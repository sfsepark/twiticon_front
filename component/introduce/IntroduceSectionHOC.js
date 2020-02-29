

export default (className, title, contents, image) => {
    return function(){
        return (
            <div className = {'introduce-section ' + className}>
                <div className = 'introduce-section-title'>
                    {title}
                </div>
                <div className = 'introduce-section-image'>
                    {image}
                </div>
                <div className = 'introduce-section-contents'>
                    {contents}
                </div>
            </div>
        )
    }
}