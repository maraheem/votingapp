import React, { Component } from 'react'
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon } from 'react-share';       
import { List} from 'semantic-ui-react'

class ShareIcons extends Component {
    state = {  }
    render() {
        return (
            <List horizontal floated='right'>
                <List.Item>             
                    <FacebookShareButton url={this.props.shareUrl} quote={this.props.title}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>                                    
                </List.Item>
                <List.Item>             
                    <TwitterShareButton url={this.props.shareUrl} title={this.props.title}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>  
                </List.Item>
            </List>    
        );
    }
}
export default ShareIcons;                            