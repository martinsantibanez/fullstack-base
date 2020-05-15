import express from 'express'
import { IPost } from '@/types/Post'
import { getAllPosts, createPost } from '../controller/post'
import logger from '../service/logger'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const posts = await getAllPosts()
    res.send(posts)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // TODO: Find scalable solution for field validation
    const response = await createPost(req.body)
    logger.silly(response)
    res.send(response)
  } catch (err) {
    next(err)
  }
})

export default router
