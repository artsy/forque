import { S3 } from "aws-sdk"
import type { NextApiRequest, NextApiResponse } from "next"
import { extname } from "path"
import { getSession } from "next-auth/react"
import type { UserWithAccessToken } from "system"
import { withSentry } from "@sentry/nextjs"

const s3 = new S3()
const BUCKET = `${process.env.AWS_S3_FILES_BUCKET}`

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const user = session?.user as UserWithAccessToken

  if (!user) {
    return res.status(401).json({ error: "Unauthorized. Please log in." })
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

export default withSentry(handler)
