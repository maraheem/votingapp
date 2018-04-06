import React, { Component } from 'react'
import axios from 'axios'
import { Modal, Button, Form, Message, Segment,Transition } from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            showSuccessMessage: false,
            showErrorMessage:false,
            showLogOutMessage:false,
            showOverlay: this.props.showSgnInOverlay,
            errorMessage:'',
            userName:'',
            userId:'',
            userSessionId:'',
            logOutMessage:''

        };
    } 
    handleClose = () => {
        this.setState({
            showOverlay: false,
            errorMessage:'',
            logOutMessage:'',
            showSuccessMessage:false,
            showErrorMessage:false,
            showLogOutMessage:false
        })
    } 
    componentDidUpdate = (prevProps, prevState) => {
        if ( prevState.showOverlay !== this.props.showSgnInOverlay) {
            this.setState({
                showOverlay: this.props.showSgnInOverlay
            })
        }
    }
    sendLogoutRequest = () => {        
        if(this.state.userSessionId) {
            axios.get(`https://smbaqa08code.votigo.com/users/logout.json?signature=${this.props.signature}&user_id=${this.state.userId}&session_id=${this.state.userSessionId}`)
            .then((response) => {                
                this.setState({
                    showLogOutMessage:true,
                    showSuccessMessage:false,
                    showErrorMessage:false,
                    errorMessage:'',
                    userName:'',
                    userId:'',
                    userSessionId:'',
                    logOutMessage:response.data.message
                })                
            })
            .catch((error) => {
                console.log(error);
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
                if(typeof(response.data.error) !== "undefined" && response.data.error){                    
                    this.setState({
                        showErrorMessage:true,
                        showSuccessMessage: false,
                        showLogOutMessage:false,
                        errorMessage:response.data.error,
                        userName:'',
                        userId:'',
                        userSessionId:'',
                        logOutMessage:''
                    })
                }  else {          
                    //console.log(response);                         
                    this.setState({                        
                        showSuccessMessage: true,
                        showErrorMessage:false,
                        showLogOutMessage:false,
                        errorMessage:'',
                        userName:response.data.User.first_name,
                        userId:response.data.User.id,
                        userSessionId:response.data.User.session_id,
                        logOutMessage:''
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
                    this.state.showErrorMessage &&
                    <Message error>
                        <h1>Login failed</h1>      
                        {this.state.errorMessage}                  
                    </Message>                     
                }
                {
                    this.state.showLogOutMessage &&    
                    <Message success>
                        {this.state.logOutMessage}
                    </Message>                                                               
                }  
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
                    <div>
                        <Message success>
                            <h1>Login successful</h1>
                        </Message>                   
                        <Segment basic floated='left'>
                            Welcome {this.state.userName}
                        </Segment>
                        <Segment floated='right'>
                            <Button basic onClick={this.sendLogoutRequest}>Logout</Button>
                        </Segment>  
                   </div>
                }                
                </Modal.Content>    
            </Modal>
        );
    }
}
export default Login;