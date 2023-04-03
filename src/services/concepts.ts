import endpoints from '@/constants/endpoints'
import request from '@/lib/api/request'
import { IdeaItem } from './ideas'

export type Generation = {
  id: number
  ref: string
  brief: string
  inProgress: boolean
  created: Date | string
  eta?: Date | string
  // current?: Date | string
  videos: Array<VideoItem>
}

export type VideoItem = {
  id: number
  src: string
  image: string
  name: string
}

export type ConceptItem = {
  id: number
  generations: Array<Generation>
}

export const ConceptsAPI = {
  generateConcept: async (idea: IdeaItem): Promise<ConceptItem> => {
    const response = await request
      .request<ConceptItem>({
        url: endpoints.conceptGenerateEndpoint,
        method: 'POST',
        data: {
          ideaId: idea?.id,
        },
      })
      .catch(() => {
        return Promise.reject(null)
      })

    return Promise.resolve(response.data)
  },
  cancelGeneration: async (id: number): Promise<boolean> => {
    await request
      .request<ConceptItem>({
        url: endpoints.conceptCancelGenerationEndpoint,
        method: 'POST',
        data: {
          generation: id,
        },
      })
      .catch(() => {
        return Promise.reject(false)
      })

    return Promise.resolve(true)
  },
  listConcepts: async (): Promise<ConceptItem[]> => {
    const response = await request
      .request<ConceptItem[]>({
        url: endpoints.conceptsListEndpoint,
        method: 'GET',
      })
      .catch(() => {
        return Promise.reject(null)
      })

    return Promise.resolve(response.data)
  },
  iterateConcept: async (
    videoId: number,
    subject: Array<number>,
    transcript: string,
    remove: Array<number>
  ): Promise<Generation> => {
    const response = await request
      .request<Generation>({
        url: endpoints.conceptIterateEndpoint,
        method: 'POST',
        data: {
          videoId: videoId,
          subject: subject,
          transcript: transcript,
          remove: remove,
        },
      })
      .catch(() => {
        return Promise.reject(false)
      })

    return Promise.resolve(response.data)
  },
}
