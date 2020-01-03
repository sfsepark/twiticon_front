import {Dropdown} from 'react-bootstrap'
import '../../scss/dropdown.scss'
import Router from 'next/router'

export default (props) => {
    return  <div className = 'main-contents-header'>
        <div className = 'flex space-between'>
            <div className = "main-contents-title">
                <div className = 'flex'>
                    {
                        props.isLogin
                        ?<div className = "main-contents-title-state">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {!props.mainPageState ? '방송' : '팔로우'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick = {() => Router.push('/follow')}>팔로우</Dropdown.Item>
                                    <Dropdown.Item onClick = {() => Router.push('/explore')}>방송</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> 
                            <div className = 'main-contents-title-state'>
                                중
                            </div>
                        </div>
                        : <div className = "main-contents-title-state">
                            방송 중
                        </div>
                    }
                    
                    <div className = "main-contents-title-streamer">
                        인 스트리머
                    </div>
                </div>
            </div>
        </div>
    </div>
}