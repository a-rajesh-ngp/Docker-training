import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'


console.log('config.db called');
const dbConfig = defineConfig({
  
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },

    analytics: {
      client: 'pg',
      connection: {
        host: env.get('ANALYTICS_DB_HOST'),
        port: env.get('ANALYTICS_DB_PORT'),
        user: env.get('ANALYTICS_DB_USER'),
        password: env.get('ANALYTICS_DB_PASSWORD'),
        database: env.get('ANALYTICS_DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations/analytics'],
      },
    },
  },
})

export default dbConfig