import React, { Component } from 'react';
import { Responsive } from 'semantic-ui-react'
import NavBarDesktop from './navigation/NavBarDesktop'
import NavBarMobile from './navigation/NavBarMobile'
class Header extends Component {
    render() {
        return (
            <div>                
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <NavBarDesktop {...this.props}/>   
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <NavBarMobile {...this.props}/>      
                </Responsive>
           </div>   
        );
    }
}
export default Header;