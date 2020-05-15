import fs from 'fs'
import * as dotenv from 'dotenv'

export const IS_DEV = process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'
export const IS_TEST = process.env.NODE_ENV == 'test'
console.info(`DEMO: ${IS_DEV}`) // We can't use logger here!
dotenv.config()
let path: string
if (IS_DEV) {
  path = `${__dirname}/.env.development`
}
dotenv.config({ path })

// SQL
export const SERVER_PORT = process.env.SERVER_PORT || '3020'
export const MYSQL_USER = process.env.MYSQL_USER || 'root'
export const MYSQL_ROOT_PASSWORD = process.env.MYSQL_ROOT_PASSWORD || ''
export const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost'
export const MYSQL_DB = process.env.MYSQL_DB || 'blog'
export const ENTITIES_PATH = ['src/entity/**/*.ts']
export const LOG_SQL = false

