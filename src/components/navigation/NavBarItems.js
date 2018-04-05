import React, { Component } from 'react';
import { Segment, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Login from '../Login'
import Signup from '../Signup'

class NavBarItems extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeItem: '/',
            showLoginOverlay: false,
            showRegisterOverlay:false
         };
    }   
    handleItemClick = (e, data) => {
        this.setState({
            activeItem: data.name,
            showLoginOverlay: false,
            showRegisterOverlay:false    
        })
    }
    showLogin = () => {             
        this.setState({
            showRegisterOverlay: false,
            showLoginOverlay: true
        })
    }
    showRegister = () => {        
        this.setState({
            showLoginOverlay: false,
            showRegisterOverlay: true            
        })
    }
    render() {
        const { activeItem } = this.state
        return (
            <Menu.Menu> 
                <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home' || activeItem === '/'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to='/gallery' name='Gallery' active={activeItem === 'Gallery'} onClick={this.handleItemClick} />
                <Menu.Item onClick={this.showRegister}>Enter Now</Menu.Item>          
                <Menu.Menu position='right'>
                    <Menu.Item onClick={this.showLogin}>Login</Menu.Item>
                </Menu.Menu>  
                <Login showSgnInOverlay={this.state.showLoginOverlay} {...this.props} />
                <Signup showSgnUpOverlay={this.state.showRegisterOverlay} {...this.props}/>                   
            </Menu.Menu> 
        );
    }
}
export default NavBarItems;