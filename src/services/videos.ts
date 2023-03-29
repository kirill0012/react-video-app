import endpoints from '@/constants/endpoints'
import request from '@/lib/api/request'

export const VideosAPI = {
  rate: async (videoId: number, rating: number): Promise<boolean> => {
    await request
      .request({
        url: endpoints.videosRateEndpoint,
        method: 'POST',
        data: {
          videoId: videoId,
          rating: rating,
        },
      })
      .catch(() => {
        return Promise.reject(false)
      })

    return Promise.resolve(true)
  },
}
