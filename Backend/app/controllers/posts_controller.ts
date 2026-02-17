
import { createPostValidator } from '#validators/create_post'
import type { HttpContext } from '@adonisjs/core/http'
import PostsRepository from '../repositories/posts_repository.js';

export default class PostsController {
    protected postsRepository = new PostsRepository();
    
    public async createPost({request}: HttpContext) {
        const validatedData = await request.validateUsing(createPostValidator);
        return this.postsRepository.createPost(validatedData);
    }
}