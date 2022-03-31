import { PresignedPost } from "aws-sdk/clients/s3"

export type UploadFile = {
  file: File
  onFileDone(): void
  onFileError(error: Error): void
  onFileProgress(progress: number): void
  presignedPost: PresignedPost
}

export const uploadFile = async ({
  file,
  onFileDone,
  onFileError,
  onFileProgress,
  presignedPost,
}: UploadFile) => {
  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  Object.entries(presignedPost.fields).forEach(([key, value]) => {
    formData.append(key, value)
  })

  formData.append("file", file)

  xhr.upload.addEventListener("progress", (event) => {
    if (!event.lengthComputable) return
    onFileProgress((event.loaded / event.total) * 100)
  })

  xhr.addEventListener("loadend", () => {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      onFileDone()
      return
    }

    onFileError(new Error("Upload failed"))
  })

  xhr.open("POST", presignedPost.url, true)

  xhr.send(formData)
}
