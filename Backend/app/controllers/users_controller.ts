import type { HttpContext } from '@adonisjs/core/http'
import { GetUsersPayload, getUsersValidator } from '#validators/get_user';
import { CreateUserPayload, createUserValidator } from '#validators/create_user';
import { UpdateEmailPayload, updateEmailValidator } from '#validators/update_email';
import { DeleteUserPayload, deleteUserValidator } from '#validators/delete_user';
import UsersRepository from '../repositories/users_repository.js';


export default class UsersController {
    protected usersRepository = new UsersRepository()
    
    public async getUsers(
        {request} : HttpContext
    ) {
        const validatedData: GetUsersPayload = await request.validateUsing(getUsersValidator);
        return this.usersRepository.getUsers(validatedData.page, validatedData.limit, validatedData.search, validatedData.sort);
    }

    public async createUser(
        {request} : HttpContext
    ) {
        const validatedData: CreateUserPayload = await request.validateUsing(createUserValidator);
        return this.usersRepository.createUser(validatedData);
    }

    public async updateEmail(
        {request, params} : HttpContext
    ) {
        const validatedData: UpdateEmailPayload = await request.validateUsing(updateEmailValidator, params);
        return this.usersRepository.updateEmail(validatedData.params.id, validatedData.email);  
    }

    public async deleteUser(
        {request, params} : HttpContext
    ) {
        const validatedData: DeleteUserPayload = await request.validateUsing(deleteUserValidator, params);
        return this.usersRepository.deleteUser(validatedData.params.id);

    }
}