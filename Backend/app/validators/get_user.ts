
import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types';

export const getUsersValidator = vine.compile(
    vine.object({
        page: vine.number().parse((p)=>  p??1),
        limit: vine.number().parse((l)=> l??10),
        search: vine.string().trim().minLength(1).optional(),
        sort: vine.object({
            column: vine.enum(['username', 'email', 'created_at']),
            direction: vine.enum(['asc', 'desc'])
        })
    })
);

export type GetUsersPayload = Infer<typeof getUsersValidator>