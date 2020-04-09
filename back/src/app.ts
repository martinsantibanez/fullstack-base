import express, { Express } from 'express'
import * as Database from './service/database'
import { setup } from './expressSetup'
import api from './api'

export const createApp = async (): Promise<Express> => {
  await Database.init()
  const app = express()
  setup(app, api)
  return app
}
