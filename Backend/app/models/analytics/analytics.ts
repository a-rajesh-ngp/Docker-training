import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Analytics extends BaseModel {
  public static connection = 'analytics'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare log: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}