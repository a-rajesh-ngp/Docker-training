import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'


export const createPostValidator = vine.compile(
    vine.object({
        // userId: vine.number().exists({table: 'users', column: 'id'}),
        content: vine.string().trim().minLength(10),
        title: vine.string().trim().minLength(3)
    })
)

export type CreatePostPayload = Infer<typeof createPostValidator>