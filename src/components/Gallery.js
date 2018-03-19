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
        //e.preventDefault();  
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
                <Grid container doubling stackable columns={4} divided="vertically">
                    <Grid.Row>
                        {
                            this.props.posts.map((post, i) => {
                                
                                const bgimage = post.Entry.Photo.medium_pic
                                const styles = {
                                    container: {
                                     textAlign: 'center',
                                     backgroundImage: "url("+bgimage+")"
                                    }
                                }
                                  
                                return (
                                    <Grid.Column key={i} stretched>
                                        <div className="galleryEntry item width2 height2 isotope-item" id="" data-height="" data-width="" data-source="iframe" rel="" data-type="photo" data-entryid="" data-post-id="" data-rating="">
                                            <div className="cont">
			                                    <div className="image-thumb" style={styles.container}>
                                                    <a onClick={() => {this.showEntry(post.Entry)}}>
				                                    </a>
			                                    </div>
		                                    </div>
                                            <div className="details-user">
        	                                    <span className="details-ename">{post.Entry.entryname}</span>
		                                        <span className="details-uname">{post.Entry.User.first_name}</span>
		                                    </div>
                                        </div>
                                    </Grid.Column>
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