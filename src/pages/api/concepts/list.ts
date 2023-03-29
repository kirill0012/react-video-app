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
        const eta = new Date()
        eta.setTime(eta.getTime() + 12 * 60 * 60 * 1000)
        const current = new Date()
        current.setTime(current.getTime() + 1 * 60 * 60 * 1000)

        const created = new Date()
        created.setTime(created.getTime() - 24 * 60 * 60 * 1000 - 10 * 1000)
        const created2 = new Date()
        created2.setTime(created2.getTime() - 2 * 24 * 60 * 60 * 1000 - 10 * 1000)
        res.status(200).json([
          {
            id: 2,
            generations: [
              {
                id: 2,
                inProgress: false,
                created: created,
                brief:
                  'The video will show a live-action man that his live-action female girlfriend attacking his village successfully. The male is getting angry and try to attack his girlfriend village getting block and loses. The live-action female is doing a victory dance.',
                videos: [
                  {
                    id: 1,
                    src: '/demo/file_example_MP4_640_3MG.mp4',
                    image: '/demo/Rectangle 22.png',
                    name: 'video_name_version_1',
                  },
                  {
                    id: 2,
                    src: '/demo/file_example_MP4_640_3MG.mp4',
                    image: '/demo/Rectangle 22.png',
                    name: 'video_name_version_2',
                  },
                  {
                    id: 3,
                    src: '/demo/file_example_MP4_640_3MG.mp4',
                    image: '/demo/Rectangle 22.png',
                    name: 'video_name_version_2',
                  },
                  {
                    id: 4,
                    src: '/demo/file_example_MP4_640_3MG.mp4',
                    image: '/demo/Rectangle 22.png',
                    name: 'video_name_version_3',
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            generations: [
              {
                id: 3,
                inProgress: false,
                created: created2,
                brief:
                  'The video will show a live-action man that his live-action female girlfriend attacking his village successfully. The male is getting angry and try to attack his girlfriend village getting block and loses. The live-action female is doing a victory dance.',
                videos: [
                  {
                    id: 1,
                    src: '/demo/file_example_MP4_640_3MG.mp4',
                    image: '/demo/Rectangle 22.png',
                    name: 'video_name_version_1',
                  },
                  {
                    id: 2,
                    src: '/demo/file_example_MP4_640_3MG.mp4',
                    image: '/demo/Rectangle 22.png',
                    name: 'video_name_version_2',
                  },
                  {
                    id: 3,
                    src: '/demo/file_example_MP4_640_3MG.mp4',
                    image: '/demo/Rectangle 22.png',
                    name: 'video_name_version_2',
                  },
                  {
                    id: 4,
                    src: '/demo/file_example_MP4_640_3MG.mp4',
                    image: '/demo/Rectangle 22.png',
                    name: 'video_name_version_3',
                  },
                ],
              },
              {
                id: 4,
                inProgress: false,
                created: created2,
                ref: 'video_name_version_3',
                brief: '<Iteration Request Summary>',
                videos: [
                  {
                    id: 5,
                    src: '/demo/file_example_MP4_640_3MG.mp4',
                    image: '/demo/Rectangle 23.png',
                    name: 'video_name_gen_2',
                  },
                ],
              },
              {
                id: 5,
                inProgress: true,
                created: new Date(),
                current: current,
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
              },
            ],
          },
        ])
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
