import { S3 } from "aws-sdk"
import type { NextApiRequest, NextApiResponse } from "next"
import { getUserFromCookie } from "system/artsy-next-auth/auth/user"

const s3 = new S3()

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!getUserFromCookie(req)) {
    return res.status(401).json({ error: "Unauthorized. Please login." })
  }

  s3.createPresignedPost(
    {
      Bucket: `${process.env.AWS_S3_FILES_BUCKET}`,
      Fields: {
        key: req.query.key,
        acl: "public-read",
        "Cache-Control": "max-age=31536000",
        "Content-Type": req.query.contentType,
      },
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
