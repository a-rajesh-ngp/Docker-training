import Post from "#models/post";


export default class PostsDomain{
    createPost(post: Post) {
        return {
            status: 'success',
            data: post
        };
    }

} 