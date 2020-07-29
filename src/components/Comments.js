import React, { Component } from 'react';
import Comment from './Comment';

class Comments extends Component {
    render() {
        const comList = this.props.comments.filter((e, index) => {
            return e.postId === this.props.postId
        }).map((comment, index) => {
            return (
                <Comment
                    key={`${index}c`} 
                    comment={comment}
                    fetchComments={this.props.fetchComments}
                    deleteComment={this.props.deleteComment}
                />
            )

        })

        return (
            <div className="commentarea">
                { comList }
                {/* <Comment/>
                <Comment/> */}
            </div>
        );
    }
}

export default Comments;
