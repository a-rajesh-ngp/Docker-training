import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'


export const createLogValidator = vine.compile(
    vine.object({
        log: vine.string().minLength(1)
    })
)

export type CreateLogPayload = Infer<typeof createLogValidator>