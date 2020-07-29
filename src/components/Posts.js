import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {

    render() {
        let postList = this.props.posts.map((post, index) => {
            return (
                <Post
                    key={`${index}p`}
                    post={post}
                    editPost={this.props.editPost}
                    deletePost={this.props.deletePost}
                />

            );
        })

        return (
            <div >
                { postList }
            </div>
        );
    }
}

export default Posts;
