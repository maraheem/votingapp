import React, { Component } from 'react'
import { List, Segment, Modal, Image } from 'semantic-ui-react'
import ShareIcons from './ShareIcons'
import VoteBtn from './VoteBtn'
import Masonry from 'react-masonry-component';

let masonryOptions = {
    transitionDuration: '0.8s',
    gutter: 10,
    fitWidth: true,
    horizontalOrder: false,
    originLeft: true,
    itemSelector: '.grid-item'
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
    handleClose = () => {
        this.setState({
            showOverlay: false
        })
    } 
    render() {
        const shareUrl = 'http://www.votigo.com';
        const title = 'Best Social Media Marketing Company';
        let style = {margin: '0 auto'}
        let childElements = this.props.posts.map((post, i) => {
            return (
                <div  key={i} className="grid-item cont">
                    <Image onClick={() => { this.showEntry(post.Entry) }} src={post.Entry.Photo.square_pic} />
                </div>
            );
        });
        return (
            <div>
                <Masonry
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    style={style}
                >
                    {childElements}
                </Masonry>
                <Modal open={this.state.showModal} onClose={this.handleClose} closeIcon>
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