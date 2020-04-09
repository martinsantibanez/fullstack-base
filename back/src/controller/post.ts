import { getManager } from 'typeorm'
import { Post } from '../entity/post'
import { logError } from '../service/logger'
import { IPost } from '@/types/Post'

export async function getAllPosts() {
  try {
    return await getManager().find(Post)
  } catch (err) {
    logError(err)
    return []
  }
}

export async function createPost(input: IPost) {
  try {
    let post = new Post()
    Object.assign(post, input)
    post = await getManager().save(post)
    return post
  } catch(e) {
    logError(e)
  }
}