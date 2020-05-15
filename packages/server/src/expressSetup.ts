import createError, { HttpError } from 'http-errors'
import { Express, Router } from 'express'
import bodyParser from 'body-parser'
import * as ENV from '../ENVIRONMENT'
import logger from './service/logger'

// Pre routes
const cors = (req, res, next) => {
  // For google auth
  const ALLOWED_ORIGINS: string[] = []
  if (ENV.IS_TEST) ALLOWED_ORIGINS.push(req.headers.origin)
  if (ALLOWED_ORIGINS.some(allowed => allowed === req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Credentials', 'true')
  } else {
    res.header('Access-Control-Allow-Origin', '*')
  }
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  //intercepts OPTIONS method (preflight requests)
  if ('OPTIONS' === req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
}
const setupInitialMiddlewares = (app: Express) => {
  app.use(bodyParser.json())
  app.use(cors)
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
}

const notFoundHandler = (req, res, next) => {
  next(createError(404))
}

const errorHandler = (err: HttpError, req, res, next) => {
  if (req.app.get('env') === 'development' && err.status !== 404) {
    logger.error(err.stack)
  }
  res.status(err.status || 500)
  res.send(err)
}

const setupErrorHandler = (app: Express) => {
  app.use(notFoundHandler)
  app.use(errorHandler)
}

export const setup = (app: Express, routes: Router) => {
  setupInitialMiddlewares(app)
  app.use(routes)
  setupErrorHandler(app)
}
