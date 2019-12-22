import Link from 'next/link'

export default (props) => {
    var url = props.url ? props.url : '';
    var as = props.as ? props.as : props.url;
    
    return <Link href ={url} as = {as} >
        <a >
            <div className = {( props.active ? 'header-menu-active' :'header-menu-passive')}>
                <div className = 'header-menu-txt'>
                    {props.menu ? props.menu : ''}
                </div>
            </div>
        </a>
    </Link>;
}