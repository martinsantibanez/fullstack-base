import { createLogger, format, transports } from 'winston'
import * as ENV from '../../ENVIRONMENT'
import moment = require('moment-timezone')

const logger = createLogger({
  level: ENV.IS_DEV ? 'silly' : 'silly',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(({ timestamp, level, message, ...args }) => {
      const ts = moment(timestamp).format('HH:mm:ss')
      return `[${level}: ${ts}] ${message.trim()} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`
    })
  ),
  transports: [new transports.File({ filename: 'error.log', level: 'error' }), new transports.Console()]
})

export function logError(error: any, tag?: string) {
  console.error(getErrorInfo(error, tag))
}

/** Extracts the most human-friendly error info */
export function getErrorInfo(error: any, tag?: string) {
  let message = ''
  try {
    if (error.config?.url) {
      message = message.concat(` url: ${error.config.url}`)
    } else if (error.stack) {
      message = message.concat(
        ` ${JSON.stringify(error.stack)
          .split('\\n')
          .map(s => s.trim())
          .slice(1, 3)
          .join(' ')}`
      )
    }
    if (error.response?.data) {
      message = message.concat(`\r\n data: ${JSON.stringify(error.response.data)}`)
    } else if (error.code) {
      message = message.concat(`\r\n code: ${error.code}`)
    } else if (error) {
      // console.error(error)
      if (typeof error === 'object') {
        message = message.concat(`\r\n ${error}`)
      } else {
        message = message.concat(error)
      }
    }
  } catch (err) {
    message = message.concat(`Cannot stringify error object`)
  } finally {
    return tag ? `${tag}: ${message}` : message
  }
}

export default logger