import { NextApiHandler } from 'next'
import cookie from 'cookie'
import ApiException from '@/lib/api/exception'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      if (!req.headers.cookie) {
        throw new ApiException('No bearer token found in the request', 401)
      }

      const { token } = cookie.parse(req.headers.cookie)
      if (!token) {
        throw new ApiException('No bearer token found in the request', 401)
      }

      if (token == 'BJXPXtfJGEdBFSPttXwhgQFOwwJBHMhbDsyghhCRocNBoGoGPbkqfvlvYglb') {
        res.status(200).json({
          project: {
            title: 'Animal Kingdom',
            avatar: '/demo/image 14.png',
          },
          limits: {
            concept: 2,
            iterations: 2,
          },
        })
      } else {
        throw new ApiException('Not authorized', 403)
      }
    } catch (error: ApiException | Error | any) {
      if (error?.isApiException) {
        const { message, statusCode, data } = error
        res.status(statusCode || 400).json({
          message,
          error: statusCode,
          data,
        })
      } else {
        console.warn(error)
        res.status(500).json({
          message: 'Internal Server Error',
          error: 500,
        })
      }
    }
  }
}

export default handler
