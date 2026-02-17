import Post from "#models/post";
import PostsDomain from "../domains/posts_domain.js";


export default class PostsRepository {
    protected postsDomain = new PostsDomain()
    async createPost(validatedData: { 
        // userId: number; 
        content: string; title: string; }) {
        const post = await Post.create(validatedData);
        return this.postsDomain.createPost(post);   
    }
}