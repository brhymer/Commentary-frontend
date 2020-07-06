import React, { Component } from 'react';

class Comment extends Component {

    delCom = () => this.props.deleteComment(this.props.comment)

    // editCom = () => this.props.editComment(this.props.comment)

    render() {

        return (
            <div>
                {/* <p><b>{this.props.comment.body}</b></p> */}
                <p>Body: {this.props.comment.body}</p>
                <button
                    className="edit"
                    // onClick={this.editCom}
                >
                    Edit
                </button>
                <button
                    className="del"
                    onClick={this.delCom}
                >
                    Delete this comment
                </button>
            </div>
        );
    }
}

export default Comment;
