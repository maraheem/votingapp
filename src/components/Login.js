import React, { Component } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            showOverlay: this.props.showSgnInOverlay
        };
    } 
    handleClose = () => {
        this.setState({
            showOverlay: false
        })
    } 
    componentDidUpdate = (prevProps, prevState) => {
        if ( prevState.showOverlay !== this.props.showSgnInOverlay) {
            this.setState({
                showOverlay: this.props.showSgnInOverlay
            })
        }
    }
    sendLoginRequest = (e) =>{
        e.preventDefault();        
        const lgnEmail = e.target.UserEmail.value;
        const lgnPass = e.target.UserPswd.value;              
        if(lgnEmail && lgnPass) {                         
            axios.get(`http://smbaqa08code.votigo.com/users/loginVotigoContestUser.json?signature=${this.props.signature}&campaignId=20745&campaignType=contest&email=${lgnEmail}&password=${lgnPass}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });   
        }
    }
    render() {
        return (
            <Modal size="small" open={this.state.showOverlay} onClose={this.handleClose} closeIcon>                
                <Modal.Header>Login</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.sendLoginRequest}>
                        <Form.Field required>
                            <label>Email Address</label>
                            <input type="email" placeholder='Email Address' name="data[User][email]" id="UserEmail" />
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <input type="password" placeholder='Password' name="data[User][pswd]" id="UserPswd"/>
                        </Form.Field>
                        <Button type='submit' color='blue'>Login</Button>
                    </Form>
                </Modal.Content>    
            </Modal>
        );
    }
}
export default Login;