import type { User } from './user'

export interface Program {
  id: number | string,
  imageUrl: string
  programName: string
  date: string
  detailImageUrl?: string,
  albumImageUrl?: { src: string }[]
  detailContent?: string
}
