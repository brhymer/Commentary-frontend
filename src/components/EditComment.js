import React, { Component } from 'react';

class EditComment extends Component {
    state = {
        body: '',
        rating: 0,
    }

    onChange = (event) => {
        this.setState({
            body: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.toggleBodyForm();
        const comment = this.state;
        console.log(comment)
        console.log(this.props.comment._id)
        this.props.editComment(comment, this.props.comment._id)
    };

    componentDidMount() {
        this.setState({
            body: this.props.comment.body
        })
    }

    render() {
        return (
            <div style ={ this.props.style }>
                <form onSubmit={ this.onSubmit }>
                    <label name="Body"/>
                    <p>Comment</p>
                    <textarea
                        onChange={ this.onChange }
                        placeholder={ this.props.body }
                        type= "text"
                        value={ this.state.body || ''}
                    />
                    <button type="submit" className="btn">Save</button>
                </form>
            </div>
        );
    }
}

export default EditComment;
