import React, { Component } from 'react'
import { Modal, Form, Checkbox, Button,} from 'semantic-ui-react'
import DateofBirth from './DateofBirth'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            showOverlay: this.props.showSgnUpOverlay
        };
    } 
    handleClose = () => {
        this.setState({
            showOverlay: false
        })
    } 
    componentDidUpdate = (prevProps, prevState) => {
        if ( prevState.showOverlay !== this.props.showSgnUpOverlay) {
            this.setState({
                showOverlay: this.props.showSgnUpOverlay
            })
        }
    }
    sendRegisterRequest = (e) =>{
        e.preventDefault();                
    }
    render() {
        return (
            <Modal size="small" open={this.state.showOverlay} onClose={this.handleClose} closeIcon>    
                <Modal.Header>Sign Up</Modal.Header>
                <Modal.Content>                
                    <Form onSubmit={this.sendRegisterRequest}>                        
                        <Form.Field required>
                            <label>Email Address</label>
                            <input type="email" placeholder='Email Address' />
                        </Form.Field>
                        <Form.Field required>
                            <label>First Name</label>
                            <input type="text" placeholder='First Name' />
                        </Form.Field>
                        <Form.Field required>
                            <label>Last Name</label>
                            <input type="text" placeholder='Last Name' />
                        </Form.Field>
                        <Form.Field required>
                            <label>Date of Birth</label>                            
                            <DateofBirth />		        	
                        </Form.Field>                        
                        <Form.Field required>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit' color='blue'>Sign Up</Button>
                    </Form>
                </Modal.Content>    
            </Modal>
        );
    }
}
export default Signup;