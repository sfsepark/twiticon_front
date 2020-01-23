

export default (title, contents, image) => {
    return function(){
        return (
            <div className = 'introduce-section'>
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