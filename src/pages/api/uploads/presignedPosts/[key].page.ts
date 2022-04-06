import { S3 } from "aws-sdk"
import type { NextApiRequest, NextApiResponse } from "next"
import { extname } from "path"
import { getUserFromCookie } from "system/artsy-next-auth"

const s3 = new S3()
const BUCKET = `${process.env.AWS_S3_FILES_BUCKET}`

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!getUserFromCookie(req)) {
    return res.status(401).json({ error: "Unauthorized. Please login." })
  }

  s3.headObject({ Bucket: BUCKET, Key: `${req.query.key}` }, (err, data) => {
    // Avoids overwriting existing objects
    const _key = `${req.query.key}`
    const suffix = data ? "-" + Date.now() : ""
    const ext = extname(_key)
    const key = _key.split(ext)[0] + suffix + ext

    s3.createPresignedPost(
      {
        Bucket: BUCKET,
        Fields: {
          key: key,
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
  })
}

export default handler
