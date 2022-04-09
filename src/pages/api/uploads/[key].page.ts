import { S3 } from "aws-sdk"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import type { UserWithAccessToken } from "system"

const s3 = new S3()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const user = session?.user as UserWithAccessToken

  if (!user) {
    return res.status(401).json({ error: "Unauthorized. Please log in." })
  }

  s3.headObject(
    {
      Bucket: `${process.env.AWS_S3_FILES_BUCKET}`,
      Key: `${req.query.key}`,
    },
    (err, data) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
        return
      }

      res.status(200).json(data)
    }
  )
}

export default handler
