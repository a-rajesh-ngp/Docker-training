import vine from '@vinejs/vine'
import { username } from './rules/username.js';
import { Infer } from '@vinejs/vine/types';


export const createUserValidator = vine.compile(
    vine.object({
        
        // username: vine.string().trim().toLowerCase().regex(/^[a-z0-9_]+$/),
        username: username(),
        email: vine.string().email()
            .unique({table:'users', column:'email'}),
        password: vine.string().minLength(6)
    })
);

export type CreateUserPayload = Infer<typeof createUserValidator>