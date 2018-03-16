import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class WarningOverlay extends Component {
    state = {
        showOverlay: this.props.showWarningOverlay
    }
    componentDidUpdate = (prevProps, prevState) => {
        if ( prevProps.showWarningOverlay !== this.props.showWarningOverlay ) {
            this.setState({
                showOverlay: this.props.showWarningOverlay
            })
        }
    }
    handleClose = () => {
        console.log('handleClose called');
        this.setState({
            showOverlay: false
        })
    }
    render() {
        return (
            <Modal open={this.state.showOverlay}>
                <Modal.Header>Cross site Alert</Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    <Header>Dear Developer</Header>
                    <p>Remember to always check this on a votigo.com domain as we will be making some ajax requests</p>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose}>
                        <Icon name='checkmark' /> I Understand
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default WarningOverlay;