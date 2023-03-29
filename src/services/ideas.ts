import endpoints from '@/constants/endpoints'
import request from '@/lib/api/request'

export type IdeaItem = {
  id: number
  title: string
  description: string
} | null

export const IdeasAPI = {
  generateIdea: async (): Promise<IdeaItem> => {
    const response = await request
      .request<IdeaItem>({
        url: endpoints.ideaGenerateEndpoint,
        method: 'GET',
      })
      .catch(() => {
        return Promise.reject(null)
      })

    return Promise.resolve(response.data)
  },
}
