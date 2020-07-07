import React, { Component } from 'react';

class EditPost extends Component {
    state = {
        title: '',
        body: '',
        rating: 0,
        comments: 0
    }

    onInputChange = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    onInputChange2 = (event) => {
        this.setState({
            body: event.target.value,
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.toggleBodyForm();
        const post = this.state;
        console.log(post)
        console.log(this.props.post._id)
        this.props.editPost(post, this.props.post._id)
    };

    componentDidMount() {
        this.setState({
            title: this.props.post.title, 
            body: this.props.post.body
        })
    }

    render() {
        return (
            <div style ={ this.props.style }>
                <form onSubmit={ this.onSubmit }>
                    <label name="Title"/>
                    <p>Post title</p>
                    <input
                        onChange={ this.onInputChange }
                        placeholder={ this.props.title }
                        type= "text"
                        value={ this.state.title }
                    />
                    <p>Post body</p>
                    <textarea
                        onChange={ this.onInputChange2 }
                        placeholder={ this.props.body }
                        type= "text"
                        value={ this.state.body }
                    />
                    <button type="submit" className="btn">Save</button>
                </form>
            </div>
        );
    }
}

export default EditPost;
