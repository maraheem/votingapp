import React, { Component } from 'react';
import { Popup, Menu, Image,Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Login from '../Login'
import Signup from '../Signup'

class NavBarMobile extends Component {
    constructor(props) {
        super(props);        
        this.state = { 
            activeItem:'/',
            showLoginOverlay:false,
            showRegisterOverlay:false,          
            isPopUpOpen:false
        };
    }   
    handleItemClick = (e, data) => {
        this.setState({
            activeItem:data.name,
            showLoginOverlay:false,
            showRegisterOverlay:false,
            isPopUpOpen:false
        })
    }

    showLogin = () => {                
        this.setState({
            showRegisterOverlay:false,
            showLoginOverlay:true,
            isPopUpOpen:false
        })
    }
    showRegister = () => {        
        this.setState({
            showLoginOverlay:false,
            showRegisterOverlay:true,
            isPopUpOpen:false
        })
    }
    onToggle = () => {
        this.setState({                       
            showLoginOverlay:false,
            showRegisterOverlay:false,
            isPopUpOpen:!this.state.isPopUpOpen
        })
    }
    render() {       
        const { activeItem } = this.state         
        return (
            <div>             
                <Menu size='large' color='blue' borderless inverted style={{marginBottom:0,borderRadius:0}}>
                    <Menu.Item><Image src='//dcveehzef7grj.cloudfront.net/img/smb/votigo.png' size='small' /></Menu.Item>                    
                    <Menu.Item onClick={this.onToggle} position="right"><Icon name="sidebar" /></Menu.Item>
                </Menu>        
                <Popup basic flowing className='mbllinks'
                    open={this.state.isPopUpOpen}
                    onOpen={() => this.setState({ isPopUpOpen: true })}
                    onClose={() => this.setState({ isPopUpOpen: false })}>
                    <Menu color='blue' borderless inverted stackable style={{marginTop:0,borderRadius:0}}> 
                        <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home' || activeItem === '/'} onClick={this.handleItemClick} />
                        <Menu.Item as={Link} to='/gallery' name='Gallery' active={activeItem === 'Gallery'} onClick={this.handleItemClick} />
                        <Menu.Item onClick={this.showRegister}>Enter Now</Menu.Item>          
                        <Menu.Menu position='right'>
                            <Menu.Item onClick={this.showLogin}>Login</Menu.Item>
                        </Menu.Menu>                 
                    </Menu>   
                </Popup>                                            
                <Login showSgnInOverlay={this.state.showLoginOverlay} {...this.props} />
                <Signup showSgnUpOverlay={this.state.showRegisterOverlay} {...this.props}/>   
            </div>
        );
    }
}
export default NavBarMobile;