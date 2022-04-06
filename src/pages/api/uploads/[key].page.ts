import { S3 } from "aws-sdk"
import type { NextApiRequest, NextApiResponse } from "next"
import { getUserFromCookie } from "system/artsy-next-auth"

const s3 = new S3()

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!getUserFromCookie(req)) {
    return res.status(401).json({ error: "Unauthorized. Please login." })
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
