import endpoints from '@/constants/endpoints'
import request from '@/lib/api/request'

export type ConceptIdea = {
  id: number
  title: string
  description: string
} | null

export const ConceptsAPI = {
  generateIdea: async (): Promise<ConceptIdea> => {
    const response = await request
      .request<ConceptIdea>({
        url: endpoints.ideaGenerateEndpoint,
        method: 'GET',
      })
      .catch(() => {
        return Promise.reject(null)
      })

    return Promise.resolve(response.data)
  },
  generateConcept: async (idea: ConceptIdea): Promise<unknown> => {
    const response = await request
      .request<ConceptIdea>({
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
}
