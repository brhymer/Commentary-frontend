import React, { Component } from 'react';
import Posts from './components/Posts';
import PostModel from './models/Post';
import AddPost from './components/AddPost';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.fetchPosts();
  };

  fetchPosts = async () => {
    await PostModel.all().then((res) => {
      this.setState ({
        posts: res.data.posts
      });
    })
  }

  createPost = (post, imgFile) => {
    // let newPost = {
    //   title: title,
      // imgUrl: imgUrl,
      // body: body
    // };
    PostModel.create(post, imgFile).then((res) => {
      let posts = this.state.posts;
      posts.push(res.data);
      this.fetchPosts();
    })
  };

  editPost = (postObj, postId) => {
    // const isUpdatedPost = p => {
    //   return p._id === postId;
    // };

    PostModel.update(postId, postObj)
    .then((res) => {
      // let posts = this.state.posts;
      // posts.find(isUpdatedPost)._id = postObj._id;
      this.fetchPosts();
    });
  };

  deletePost = (post) => {
    PostModel.delete(post).then((res) => {
      this.fetchPosts();
    });
  };



  render() {
    return (
      <div>
        <h1>Hello there</h1>
        <h2>How do you feel about <span className="giant">TEXT</span>?</h2>
        <AddPost 
          createPost={this.createPost}/>
        <Posts 
          posts={this.state.posts}
          editPost={this.editPost}
          deletePost={this.deletePost}
        /> 
      </div>
    );
  }
}

export default App;
