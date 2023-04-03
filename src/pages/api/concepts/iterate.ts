import { NextApiHandler } from 'next'
import cookie from 'cookie'
import ApiException from '@/lib/api/exception'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (!req.headers.cookie) {
        throw new ApiException('No bearer token found in the request', 401)
      }

      const { token } = cookie.parse(req.headers.cookie)
      if (!token) {
        throw new ApiException('No bearer token found in the request', 401)
      }

      if (token == 'BJXPXtfJGEdBFSPttXwhgQFOwwJBHMhbDsyghhCRocNBoGoGPbkqfvlvYglb') {
        const { subject, transcript, remove } = req.body

        console.log({ subject, transcript, remove })

        const created = new Date()
        created.setTime(created.getTime() - 1 * 60 * 60 * 1000 - 10 * 1000)
        const eta = new Date()
        eta.setTime(eta.getTime() + 2 * 60 * 60 * 1000)

        res.status(200).json({
          id: 5,
          inProgress: true,
          created: created,
          eta: eta,
          ref: 'video_name_version_4',
          brief: '<Iteration Request Summary>',
          videos: [
            {
              id: 6,
              image: '/demo/Rectangle 23.png',
              name: 'video_name_gen_3',
            },
          ],
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
