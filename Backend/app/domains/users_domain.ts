import User from "#models/user";
import { ModelPaginatorContract } from "@adonisjs/lucid/types/model";


export default class UsersDomain {
    
    getUsers(users: ModelPaginatorContract<User>) {
        return {
            status: 'success',
            message: "Fetched data successfully.",
            data: users
        };
    }
    
    createUsers(user: User) {
        return {
            status: 'success',
            message: "Created a user successfully.",
            data: user
        };
    }
    
    updateEmail(res: User) {
        return {
            status: 'success',
            message: "Updated email successfully.",
            data: res
        };
    }

    deleteUser() {
        return {
            status: 'success',
            message: "Deleted user successfully.",
        };
    }
}