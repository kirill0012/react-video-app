import { NextApiHandler } from 'next'
import cookie from 'cookie'
import ApiException from '@/lib/api/exception'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body

      if (email == 'test@test.com' && password == 'admin') {
        res
          .setHeader('Set-Cookie', [
            cookie.serialize(
              'token',
              'BJXPXtfJGEdBFSPttXwhgQFOwwJBHMhbDsyghhCRocNBoGoGPbkqfvlvYglb',
              {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'strict',
                path: '/',
              }
            ),
          ])
          .json({
            id: 1,
            name: 'John Doe',
            avatar: '/demo/Image.png',
          })
      } else {
        throw new ApiException('Invalid username or password', 403)
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
