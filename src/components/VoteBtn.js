import React, { Component } from 'react'
import axios from 'axios'
import { Button,Icon } from 'semantic-ui-react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class VoteBtn extends Component {        
    state = { 
        vtgSessionId : '', 
        vtgUserId    : '' 
     }
    responseFacebook = (fbresponse) => {              
        if(this.state.vtgSessionId){
            this.sendVoteRequest(); 
        } else {
            //define a constant here to get userInfo from localstorage
            //if present thendirectly sendvote request
            //if not then do the below         
            const lsVtgUserId = localStorage.getItem('VtgUserId');   
            if(lsVtgUserId){
                this.sendVoteRequest();
            }else{
                axios.get(`https://smbaqa08code.votigo.com/users/addSocialUser.json?signature=${this.props.pgstate.signature}&contest_id=${this.props.entrystate.contestId}&social_id=${fbresponse.id}&username=${fbresponse.name}&email=${fbresponse.email}&first_name=NA&last_name=NA&&getuser_before_add=1`)
                .then((response) => {                
                    this.setState({
                        vtgSessionId: response.data.User.session_id,
                        vtgUserId: response.data.User.id
                    }, () => {                    
                        this.sendVoteRequest();                      
                    })              
                    localStorage.setItem('VtgUserId', response.data.User.id);                                                         
                })
                .catch((e) => {
                    console.log(e);
                })                                
            }
        }
    }
    sendVoteRequest = () => {  
        axios.get(`http://smbaqa08code.votigo.com/Votes/addVote.json?signature=${this.props.pgstate.signature}&entry_id=${this.props.entrystate.entryId}&user_id=${this.state.vtgUserId}&vote_type=love_it&session_id=${this.state.vtgSessionId}`)
        .then((response) => {
            console.log(response);
        })
        .catch((e) => {
            console.log(e);
        })             
    }    
    render() {        
        return (
            <FacebookLogin 
                appId="212089622853979"                                     
                callback={this.responseFacebook} 
                fields="name,email,picture"                                   
                render={renderProps => (
                    <Button primary size='large' onClick={renderProps.onClick}>
                        <Icon name='like outline' size='large' />Vote
                    </Button>
                )}
            />
        );
    }
}
export default VoteBtn;