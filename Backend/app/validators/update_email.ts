import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types';

export const updateEmailValidator = vine.compile(
    vine.object({
        email: vine.string().email()
            .unique({table:'users', column:'email'}),

        params: vine.object({
            id: vine.number()
        })
    }),
);


export type UpdateEmailPayload = Infer<typeof updateEmailValidator>