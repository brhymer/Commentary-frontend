import axios from 'axios';

const endPoint = 'http://localhost:3002/posts'

class PostModel {
    static all = () => {
        let request = axios.get(endPoint);
        return request;
    };

    static create = (post, imgFile) => {
        console.log(post)
        // let request = axios.post(endPoint, post.title, post.imgUrl, post.body);
        let request = axios.post(endPoint, post, imgFile);
        return request;
    };

    static delete = (post) => {
        let request = axios.delete(`${endPoint}/${post._id}`);
        return request;
    };

    static update = (postId, post) => {
        let request = axios.put(`${endPoint}/${postId}`, post);
        return request;
    };
};

export default PostModel;