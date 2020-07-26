import React, { Component } from 'react';
import EditPost from './EditPost';
import Comments from './Comments';
import AddComment from './AddComment';
import CommentModel from '../models/Comment';
import ImageUpload from "./ImageUpload"
// import { post } from 'request';

class Post extends Component {
    state = {
        comments: [],
        rating: 0,
        formStyle: {display: 'none'},
        bodyStyle: {display: 'none'},
        titleStyle: {display: 'block'},
        img: ''
    }

    toggleBodyForm = () => {
        (this.state.formStyle.display === 'block')
        ? this.setState({ formStyle: {display: 'none'}, bodyStyle: {display: 'block'} })
        : this.setState({ formStyle: {display: 'block'}, bodyStyle: {display: 'none'} })
    };

    reveal = () => {
        this.setState({ titleStyle: {display: 'none'}, bodyStyle: {display: 'block'} })
    }

    hide = () => {
        this.setState({ titleStyle: {display: 'block'}, bodyStyle: {display: 'none'} })
    }

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

    upvote = () => {
        let rating = this.state.rating
        rating+=1
        this.setState ({
            rating: rating
        })
    }

    downvote = () => {
        let rating = this.state.rating
        rating-=1
        this.setState ({
            rating: rating
        })
    }

    delPost = () => this.props.deletePost(this.props.post)

    deleteComment = (comment) => {
        CommentModel.delete(comment).then((res) => {
            this.fetchComments();
        });
    };

    render() {

        return (
            <div className="post">
                <div style={this.state.titleStyle}>
                    <p onClick={this.reveal} style={{cursor: 'pointer'}}>Post: <b>{this.props.post.title}</b></p>
                </div>
                <div style={this.state.bodyStyle} >
                    <p onClick={this.hide} style={{cursor: 'pointer'}}><b>{this.props.post.title}</b></p>
                    {/* {(this.state.img) ? <img src={this.state.img}/> : ''}  */}
                    {/* {(this.props.post.imgUrl) ? <img src={this.props.post.imgUrl}/> : ''}  */}
                    <ImageUpload id={this.props.post._id}/>
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
                    <p>Comments: {this.state.comments.filter(e => {
                        return e.postId === this.props.post._id
                        }).length}</p>
                    <p>Rating: {this.state.rating} &nbsp;
                    <button onClick={this.upvote}>agree</button>
                    <button onClick={this.downvote}>disagree</button></p>
                </div>
                <EditPost
                    post={this.props.post}
                    editPost={this.props.editPost}
                    style={this.state.formStyle}
                    toggleBodyForm={this.toggleBodyForm} 
                />
                <div style={this.state.bodyStyle}> 
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
            </div>
        );
    }
}

export default Post;
