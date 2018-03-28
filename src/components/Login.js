import React, { Component } from 'react'
import axios from 'axios'
import { Modal, Button, Form,Message } from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            showSuccessMessage: false,
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
            .then((response) => {
               if(response.status === 200){
                    this.setState({
                        showSuccessMessage: true
                    })
               }  else {
                    this.setState({
                        showSuccessMessage: false
                    })                   
               }            
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
                {
                    !this.state.showSuccessMessage &&
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
                }
                {
                    this.state.showSuccessMessage &&
                    <Message success>
                        <h1>Login successful</h1>
                        Welcome | <a href='javascript:void(0)'>Logout</a>
                    </Message>                     
                }
                </Modal.Content>    
            </Modal>
        );
    }
}
export default Login;