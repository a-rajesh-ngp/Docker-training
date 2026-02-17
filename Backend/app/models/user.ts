import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { hasMany } from '@adonisjs/lucid/orm'
import Post from '#models/post'
import type { HasMany } from '@adonisjs/lucid/types/relations'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare username: String
  
  @column()
  declare email: String
  
  @column({serializeAs: null})
  declare password: String
  
  @column()
  declare age:Number
  
  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

