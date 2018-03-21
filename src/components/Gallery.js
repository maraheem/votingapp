import React, { Component } from 'react'
import { Grid, List, Segment, Modal, Image } from 'semantic-ui-react'
import ShareIcons from './ShareIcons'
import VoteBtn from './VoteBtn'
import Masonry from 'react-masonry-component';

let masonryOptions = {
    transitionDuration: '0.8s',
    gutter: 10,
    fitWidth: true,
    horizontalOrder: true,
    originLeft: false,
};

class Gallery extends Component {
    state = {
        showModal: false,
        entryId: '',
        entryImage: '',
        entryName: '',
        entryDesc: '',
        contestId: ''
    }
    showEntry = (entry) => {
        //e.preventDefault();  
        this.setState({
            showModal: true,
            entryId: entry.entry_id,
            entryImage: entry.Photo.large_pic,
            entryName: entry.entryname,
            entryDesc: entry.Photo.description,
            contestId: entry.contest_id
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
        let style = {margin: '0 auto'}
        let childElements = this.props.posts.map((post, i) => {
            return (
                <Grid.Column key={i} stretched>
                    <div>
                        <div className="cont">
                            <Image onClick={() => { this.showEntry(post.Entry) }} src={post.Entry.Photo.square_pic} />
                        </div>
                        <div className="details-user">
                            <span className="details-ename">{post.Entry.entryname}</span>
                            <span className="details-uname">{post.Entry.User.first_name}</span>
                        </div>
                    </div>
                </Grid.Column>
            );
        });
        return (
            <div>
                <Grid columns="equal">
                    <Grid.Row>
                        <Masonry
                            options={masonryOptions} // default {}
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                            style={style}
                        >
                            {childElements}

                        </Masonry>
                    </Grid.Row>
                </Grid>
                <Modal open={this.state.showModal} onClose={this.handleClose.bind(this)} closeIcon>
                    <Modal.Content>
                        <ShareIcons shareUrl={shareUrl} title={title} />
                        <Image src={this.state.entryImage} centered fluid />
                        <List>
                            <List.Item>{this.state.entryName} </List.Item>
                            <List.Item>{this.state.entryDesc} </List.Item>
                        </List>
                        <Segment textAlign='center' basic>
                            <VoteBtn pgstate={this.props.pagestate} entrystate={this.state} />
                        </Segment>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}
export default Gallery;