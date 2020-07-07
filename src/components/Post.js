import React, { Component } from 'react';
import EditPost from './EditPost';
import Comments from './Comments';
import AddComment from './AddComment';
import CommentModel from '../models/Comment';
// import { post } from 'request';

class Post extends Component {
    state = {
        comments: [],
        formStyle: {display: 'none'},
        bodyStyle: {display: 'block'},
    }

    toggleBodyForm = () => {
        (this.state.formStyle.display === 'block')
        ? this.setState({ formStyle: {display: 'none'}, bodyStyle: {display: 'block'} })
        : this.setState({ formStyle: {display: 'block'}, bodyStyle: {display: 'none'} })
    };

    componentDidMount() {
        this.fetchComments();  
      };

    fetchComments = async () => {
        await CommentModel.all().then((res) => {
            this.setState ({
            comments: res.data.comments
            });
        })
    }

    createComment = (body, postId) => {
        let newComment = {
          body: body,
          postId: postId
        };
        CommentModel.create(newComment).then((res) => {
          let comments = this.state.comments;
          comments.push(res.data);
          this.fetchComments();
        })
    };

    delPost = () => this.props.deletePost(this.props.post)

    deleteComment = (comment) => {
        CommentModel.delete(comment).then((res) => {
            this.fetchComments();
        });
    };

    render() {
        return (
            <div className="post">
                <div style={this.state.bodyStyle} >
                    <p><b>{this.props.post.title}</b></p>
                    <p>Body: {this.props.post.body}</p>
                    <button
                        className="edit"
                        onClick={this.toggleBodyForm}
                    >Edit
                    </button>
                    <button
                        className="del"
                        onClick={this.delPost}>Remove this post
                    </button>
                </div>
                <EditPost
                    post={this.props.post}
                    editPost={this.props.editPost}
                    style={this.state.formStyle}
                    toggleBodyForm={this.toggleBodyForm} 
                />
                <Comments
                    comments={this.state.comments}
                    postId={this.props.post._id}
                    deleteComment={this.deleteComment}
                    fetchComments={this.fetchComments}
                />
                <AddComment 
                    postId={this.props.post._id}
                    createComment={this.createComment}
                />
            </div>
        );
    }
}

export default Post;
