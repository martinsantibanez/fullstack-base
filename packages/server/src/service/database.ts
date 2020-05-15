import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import * as ENV from '../../ENVIRONMENT'
import logger from './logger'

let connection: Connection

export async function init(): Promise<Connection> {
  if (!connection) {
    logger.info(`initializing db connection to ${ENV.MYSQL_DB}`)
    connection = await createConnection({
      type: 'mysql',
      host: ENV.MYSQL_HOST,
      port: 3306,
      database: ENV.MYSQL_DB,
      username: ENV.MYSQL_USER,
      password: ENV.MYSQL_ROOT_PASSWORD,
      entities: ENV.ENTITIES_PATH,
      logging: ENV.LOG_SQL,
    })
  }

  if (ENV.IS_DEV) {
    await connection.synchronize()
  }
  return connection
}
