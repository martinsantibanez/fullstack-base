import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { IPost } from '@/types/Post'

@Entity('post')
export class Post implements IPost {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  title: string
}
