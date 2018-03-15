import React, { Component } from 'react'
import axios from 'axios'
import { Button, Segment, Icon, Modal, Divider,Container,Grid, Image } from 'semantic-ui-react'
import './App.css'
import FacebookLogin from 'react-facebook-login';

class App extends Component {
  state = {  
    signature : '',
    displayImage: '',
    posts : [],
    showModal: false
  }
  componentDidMount= () =>{        
    axios.get('https://smbaqa08code.votigo.com/api/signature.json?apiKey=884d685c1071f27c2f555c2366863140')
    .then((response) =>{      
      this.setState({
        signature: response.data.signature
      })
    })
    .then((response) =>{
      axios.get(`https://smbaqa08code.votigo.com/entries/getAllEntries/page:1/sort:random/direction:desc.json?signature=${this.state.signature}&contest_id=20745&random_seed=1937588695&limit=40&extra_entry_fields=%27field1,field2,field3,field4,field5,field6,field7,field8,field9,field10,field11,field12,field13,field14,field15%27&socialdata_unserialize=1`)
      .then((response)=>{                      
          console.log(response.data.Entries);          
          this.setState({
             posts: response.data.Entries
          })                   
      })
      .catch((e) =>{
        console.log(e);
      })        
    })
    .catch((e) =>{
      console.log(e);
    })
  }
  showEntry=(img) =>{        
    this.setState({
      displayImage: img,
      showModal: true
    })    
  }
  handleClose() {
    this.setState({ 
      showModal: false 
    })
  }    
  componentClicked = () =>{
    console.log("component clicked")
  }
  responseFacebook = (response) =>{
    console.log(response)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">          
          <h1 className="App-title">Welcome</h1>
        </header> 
        <Container>
          <Divider horizontal></Divider>
          <Grid container columns={4} divided="vertically">
            <Grid.Row>
              {
                this.state.posts.map((post,i)=>{          
                  return(                               
                    <Grid.Column key={i} stretched><Image src={post.Entry.Photo.medium_pic} onClick={() => this.showEntry(post.Entry.Photo.large_pic)}/></Grid.Column>
                  )
                })
              }       
            </Grid.Row>        
          </Grid>
          <Modal open={this.state.showModal} onClose={this.handleClose.bind(this)} closeIcon>            
            <Modal.Content>
              <Image src={this.state.displayImage} centered />
              <Segment textAlign='center' basic>
                <Button primary size='large'>
                  <Icon name='like outline' size='large'/>Vote
                </Button>         
                <FacebookLogin
                  appId="212089622853979"   
                  size='medium'               
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook} />     
              </Segment>  
            </Modal.Content>
          </Modal>
        </Container>        
      </div>  
    );
  }
}
export default App;