import axios from 'axios';

const endPoint = 'http://localhost:3002/comments'

class CommentModel {
    static all = () => {
        let request = axios.get(endPoint);
        return request;
    };

    static create = (comment) => {
        let request = axios.post(endPoint, comment.body, comment.rating, comment.postId);
        return request;
    };

    static delete = (comment) => {
        let request = axios.delete(`${endPoint}/${comment._id}`);
        return request;
    };

    static update = (commentId, comment) => {
        let request = axios.put(`${endPoint}/${commentId}`, comment);
        return request;
    };
};

export default CommentModel;