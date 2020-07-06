import React, { Component } from 'react';

class AddPost extends Component {
    state = {
        title: '',
        body: '',
        comments: 0,
        rating: 0
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        let post = this.state;
        this.props.createPost(post);
        this.setState({
            title: '', body: ''
        })
    };


    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit} >
                    <input onChange={this.onInputChange} value={this.state.title} placeholder="Add a Post - Title" />
                    <br/>
                    <textarea onChange={this.onInputChange2} value={this.state.body} rows="5" cols="60" placeholder="Body goes here" />
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddPost;
