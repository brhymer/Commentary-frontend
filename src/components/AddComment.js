import React, { Component } from 'react';

class AddComment extends Component {
    state = {
        body: '',
        rating: 0,
        postId: ''
    }

    onInputChange = (event) => {
        this.setState({
            body: event.target.value,
            postId: this.props.postId
        });
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        let comment = this.state;
        this.props.createComment(comment);
        this.setState({
            body: ''
        })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <textarea 
                        value={this.state.body} 
                        onChange={this.onInputChange} 
                        rows="5" cols="60" 
                        placeholder="Comment on this post" 
                    />
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddComment;
