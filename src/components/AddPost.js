import React, { Component } from 'react';

class AddPost extends Component {
    state = {
        title: '',
        body: '',
        comments: 0,
        rating: 0,
        // imgUrl: '',
        // imgPublicUrl: ''
    }

    onInputChange = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    // onInputChange2 = (event) => {
    //     const imgFile = event.target.files[0];
    //     this.setState({
    //         imgUrl: event.target.value,
    //     });
    // };

    onInputChange3 = (event) => {
        this.setState({
            body: event.target.value,
        });
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state.imgUrl)
        // const imgFile = ''
        let post = this.state;
        this.props.createPost(post);
        this.setState({
            title: '', body: '', imgUrl: ''
        })
    };


    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit} encType="multipart/form-data" method="POST">
                    <input 
                        onChange={this.onInputChange} 
                        value={this.state.title} 
                        placeholder="Add a Post - Title" 
                    />
                    <br/>
                    {/* <input 
                        name="imgFile" id="imgFile"
                        type="file" accept="image/*" 
                        onChange={this.onInputChange2} 
                        value={this.state.imgUrl} 
                        placeholder="Add image to this post" 
                    /> */}
                    <br/>
                    <textarea 
                        onChange={this.onInputChange3} 
                        value={this.state.body} 
                        rows="5" cols="60" 
                        placeholder="Body goes here" 
                    />
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddPost;
