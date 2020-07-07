import React, { Component } from 'react';
import CommentModel from '../models/Comment';
import EditComment from './EditComment';

class Comment extends Component {
    state = {
        formStyle: {display: 'none'},
        bodyStyle: {display: 'block'},
    }

    toggleBodyForm = () => {
        (this.state.formStyle.display === 'block')
        ? this.setState({ formStyle: {display: 'none'}, bodyStyle: {display: 'block'} })
        : this.setState({ formStyle: {display: 'block'}, bodyStyle: {display: 'none'} })
    };

    delCom = () => this.props.deleteComment(this.props.comment)

    editComment = (commentObj, commentId) => {
        // const isUpdatedComment = c => {
        //   return c._id === commentId;
        // };
    
        CommentModel.update(commentId, commentObj)
        .then((res) => {
        //   let comments = this.state.comments;
        //   comments.find(isUpdatedComment)._id = commentObj._id;
          this.props.fetchComments();
        });
      };

    render() {

        return (
            <div>
               <div style={this.state.bodyStyle} >
                    <p><b>{this.props.comment.body}</b></p>
                    <button
                        className="edit"
                        onClick={this.toggleBodyForm}
                    >Edit
                    </button>
                    <button
                        className="del"
                        onClick={this.delPost}>Remove this comment
                    </button>
                </div>
                <EditComment
                    comment={this.props.comment}
                    editComment={this.editComment}
                    style={this.state.formStyle}
                    toggleBodyForm={this.toggleBodyForm} 
                />
            </div>
        );
    }
}

export default Comment;
