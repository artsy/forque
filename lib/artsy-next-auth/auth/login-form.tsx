import React from "react"
import { useState, FormEvent } from "react"

export const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (errorMsg) setErrorMsg("")

    const form = e.currentTarget as HTMLFormElement

    const body = {
      username: form.username.value,
      password: form.password.value,
      otp: form.otp.value,
    }

    try {
      const res = await fetch("/api/artsy-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        window.location.href = "/"
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      let message = "unknown error"
      if (error instanceof Error) message = error.message

      console.error("An unexpected error occurred:", error)
      setErrorMsg(message)
    }
  }

  return (
    <form className="artsy-next-auth-form" onSubmit={handleSubmit}>
      <div>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
      </div>
      <div>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
      </div>
      <div>
        <label>
          Authentication code
          <input type="text" name="otp" />
        </label>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>

      {errorMsg && <div className="error">{errorMsg}</div>}
    </form>
  )
}
