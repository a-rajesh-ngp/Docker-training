import User from "#models/user";
import { ModelPaginatorContract, ModelQueryBuilderContract } from "@adonisjs/lucid/types/model";
import UsersDomain from "../domains/users_domain.js";


export default class UsersRepository {
    protected usersDomain = new UsersDomain();

    async getUsers(page: number, limit: number, search: string | undefined, sort: { column: "username" | "email" | "created_at"; direction: "asc" | "desc"; }) {
        
        const query: ModelQueryBuilderContract<typeof User, User> = User.query();

        query.if(search, (query) => {
            query.where((builder)=> {
                if(!isNaN(Number(search))) {
                    builder.where('id', Number(search))
                }
                builder.orWhereILike('username', `%${search}%`)
            })
        })
       
        query.orderBy(sort?.column ?? 'username', sort?.direction ?? 'asc')
        query.preload('posts');
        const users: ModelPaginatorContract<User> = await query.paginate(page, limit)
        return this.usersDomain.getUsers(users);
    }
    
    async createUser(validatedData: { username: string; email: string; password: string; }) {
        const user: User = await User.create(validatedData);
        return this.usersDomain.createUsers(user)
    }

    async updateEmail(id: number, email: string) {
        const user: User = await User.findOrFail(id);    
        user.merge({email: email});
        const res: User = await user.save();
        return this.usersDomain.updateEmail(res);
    }

    async deleteUser(id: number) {
        const user: User = await User.findOrFail(id);
        await user.delete();
        return this.usersDomain.deleteUser();
    }
}