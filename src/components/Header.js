import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeItem: '/'
         };
    }
    handleItemClick = (e, data) => {
        this.setState({
            activeItem: data.name
        })
    }
    render() {
        const { activeItem } = this.state
        return (
            <Menu borderless color='blue' inverted size='large'>
                <Menu.Item name='logo' active={activeItem === 'logo'} onClick={this.handleItemClick}>
                    <Image src='//dcveehzef7grj.cloudfront.net/img/smb/votigo.png' size='small' />
                </Menu.Item>
                <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home' || activeItem === '/'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to='/gallery' name='Gallery' active={activeItem === 'Gallery'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to='/enter' name='Enter' active={activeItem === 'Enter'} onClick={this.handleItemClick} />
                <Menu.Menu position='right'>
                    <Menu.Item as={Link} to='/login' name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick}>Login</Menu.Item>
                    <Menu.Item as={Link} to='/signup' name='Signup' active={activeItem === 'Signup'} onClick={this.handleItemClick}>Signup</Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Header;