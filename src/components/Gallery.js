import React, { Component } from 'react'
import { Grid, List, Segment, Modal, Image } from 'semantic-ui-react'
import ShareIcons from './ShareIcons'
import VoteBtn from './VoteBtn'

class Gallery extends Component {
    state = { 
        showModal    : false,
        entryId      : '', 
        entryImage   : '', 
        entryName    : '', 
        entryDesc    : '', 
        contestId    : ''
     }
    showEntry = (entry) => {        
        this.setState({
            showModal  : true,
            entryId    : entry.entry_id, 
            entryImage : entry.Photo.large_pic,
            entryName  : entry.entryname,
            entryDesc  : entry.Photo.description,            
            contestId  : entry.contest_id            
        })
    }
    handleClose() {
        this.setState({
            showModal: false
        })
    } 
    render() {
        const shareUrl = 'http://www.votigo.com';
        const title = 'Best Social Media Marketing Company';
        return (
            <div>
                <Grid container columns={4} divided="vertically">
                    <Grid.Row>
                        {
                            this.props.posts.map((post, i) => {
                                return (
                                    <Grid.Column key={i} stretched><Image src={post.Entry.Photo.medium_pic} onClick={() => this.showEntry(post.Entry)} /></Grid.Column>
                                )
                            })
                        }
                    </Grid.Row>
                </Grid>
                <Modal open={this.state.showModal} onClose={this.handleClose.bind(this)} closeIcon>
                    <Modal.Content>
                        <ShareIcons shareUrl={shareUrl} title={title} />
                        <Image src={this.state.entryImage} centered fluid/>
                        <List>
                            <List.Item>{this.state.entryName} </List.Item>
                            <List.Item>{this.state.entryDesc} </List.Item> 
                        </List>  
                        <Segment textAlign='center' basic>
                            <VoteBtn pgstate={this.props.pagestate} entrystate={this.state}/>
                        </Segment>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}
export default Gallery;