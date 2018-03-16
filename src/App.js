import React, { Component } from 'react'
import axios from 'axios'
import { List, Button, Segment, Icon, Modal, Divider, Container, Grid, Image } from 'semantic-ui-react'
import './App.css'
import FacebookLogin from 'react-facebook-login';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon } from 'react-share';
import WarningOverlay from './components/overlays/WarningOverlay'

var store = require('store')
var expirePlugin = require('store/plugins/expire')
store.addPlugin(expirePlugin)

const url = require("url");



class App extends Component {
    constructor(props) {
        super(props);
        this.expiration = new Date().getTime() + 50000
        this.hostname = url.parse(window.location.href)['hostname']
    }
    state = {
        signature: '',
        displayImage: '',
        entryName: '',
        posts: [],
        showModal: false,
        showWarningOverlay: false
    }
    getEntries = () => {
        const entries = store.get('entries');
        console.log('entries', entries);
        if ( entries ) {
            console.log('cached found');
            console.log(entries);
            this.setState({
                posts: entries
            })
        } else {
            console.log('entries not found in cache');
            axios.get(`https://smbaqa08code.votigo.com/entries/getAllEntries/page:1/sort:random/direction:desc.json?signature=${this.state.signature}&contest_id=20745&random_seed=1937588695&limit=40&extra_entry_fields=%27field1,field2,field3,field4,field5,field6,field7,field8,field9,field10,field11,field12,field13,field14,field15%27&socialdata_unserialize=1`)
            .then((response) => {
                console.log(response.data.Entries);
                store.set('entries', response.data.Entries, this.expiration)
                this.setState({
                    posts: response.data.Entries
                })
            })
            .catch((e) => {
                console.log(e);
            })
        }

    }
    componentDidMount = () => {
        if (this.hostname.indexOf('votigo.com') === -1) {
            console.log('votigo not found');
            this.setState({
                showWarningOverlay: true
            })
        }
        /*
         * we should declare a variable to hold cachedSignature 
         * if its not null, we should just read from it 
         * if its null then send a request to server
         */
        const cachedSignature = store.get('signature');
        console.log('cachedSignature', cachedSignature);
        if ( cachedSignature ) {
            console.log('cached found');
            console.log(cachedSignature);
            this.setState({
                signature: cachedSignature
            }, () => {
                this.getEntries();
            })
            
        } else {
            console.log('nothing in cache');
            axios.get('https://smbaqa08code.votigo.com/api/signature.json?apiKey=884d685c1071f27c2f555c2366863140')
                .then((response) => {
                    store.set('signature', response.data.signature, this.expiration)
                    this.setState({
                        signature: response.data.signature
                    }, () => {
                        this.getEntries();
                    })
                })
                .catch((e) => {
                    console.log(e);
                })
        }

    }
    showEntry = (img,ename) => {
        this.setState({
            displayImage: img,
            entryName:ename,
            showModal: true
        })
    }
    handleClose() {
        this.setState({
            showModal: false
        })
    }
    handleVoteButton = () =>{
        console.log('inside handleVotebutton Click');
    }
    componentClicked = () => {        
        console.log("component clicked")
    }
    responseFacebook = (response) => {
        console.log(response)
    }
    render() {
        const shareUrl = 'http://www.votigo.com';
        const title = 'Best Social Media Marketing Company';
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome</h1>
                </header>
                <Container>
                    <WarningOverlay showWarningOverlay={this.state.showWarningOverlay} />
                    <Divider horizontal></Divider>
                    <Grid container columns={4} divided="vertically">
                        <Grid.Row>
                            {
                                this.state.posts.map((post, i) => {
                                    return (
                                        <Grid.Column key={i} stretched><Image src={post.Entry.Photo.medium_pic} onClick={() => this.showEntry(post.Entry.Photo.large_pic, post.Entry.entryname)} /></Grid.Column>
                                    )
                                })
                            }
                        </Grid.Row>
                    </Grid>
                    <Modal open={this.state.showModal} onClose={this.handleClose.bind(this)} closeIcon>
                        <Modal.Content>
                            <List horizontal floated='right'>
                                <List.Item>             
                                    <FacebookShareButton url={shareUrl} quote={title}>
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>                                    
                                </List.Item>
                                <List.Item>             
                                    <TwitterShareButton url={shareUrl} title={title}>
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>  
                                </List.Item>
                            </List>                             
                            <Image src={this.state.displayImage} centered fluid/>
                            <List><List.Item>{this.state.entryName} </List.Item> </List>  
                            <Segment textAlign='center' basic>
                                <Button primary size='large' onClick={this.handleVoteButton}>
                                    <Icon name='like outline' size='large' />Vote
                                </Button>
                                <FacebookLogin
                                    appId="212089622853979"
                                    size='medium'
                                    fields="name,email,picture"
                                    onClick={this.componentClicked}
                                    callback={this.responseFacebook} 
                                />
                            </Segment>
                        </Modal.Content>
                    </Modal>
                </Container>
            </div>
        );
    }
}
export default App;