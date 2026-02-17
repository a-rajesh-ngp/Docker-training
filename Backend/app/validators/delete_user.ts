import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types';

export const deleteUserValidator = vine.compile(
    vine.object({
            params: vine.object({
                id: vine.number()
            })
    })
);

export type DeleteUserPayload = Infer<typeof deleteUserValidator>