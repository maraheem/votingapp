import React, { Component } from 'react'
import axios from 'axios'
import { Divider, Container } from 'semantic-ui-react'
import './App.css'
import WarningOverlay from './components/overlays/WarningOverlay'
import Header from './components/Header'
import Gallery from './components/Gallery'

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
        signature:  '',        
        posts: [],        
        showWarningOverlay: false,              
    }
    getEntries = () => {
        const entries = store.get('entries');        
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
        //console.log('cachedSignature', cachedSignature);
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
    render() {
        return (
            <div className="App">                
                <Container fluid>
                    <WarningOverlay showWarningOverlay={this.state.showWarningOverlay} />
                    <Header />
                    <Divider horizontal></Divider>
                    <Gallery posts={this.state.posts} pagestate={this.state}/>
                </Container>
            </div>
        );
    }
}
export default App;