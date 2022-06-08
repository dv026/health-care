import React, { useEffect, useState } from "react"
import { signIn, useSession, signOut, getCsrfToken } from "next-auth/react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import Link from "next/link"

import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { validateCredentials } from "../../utils/validation"

import styles from "./login.module.scss"
import { ModeChooser } from "../../components/mode-chooser"

interface LoginProps {
  csrfToken: string
}

export type IMode = "signIn" | "signUp"

const Login: NextPage<LoginProps> = ({ csrfToken }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<IMode>("signIn")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCredentials(email, password)) return

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })
  }

  const session = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (session.status === "authenticated") {
      push("/")
    }
  }, [session.status])

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.loginPage}>
        <form onSubmit={handleSubmit}>
          <ModeChooser setMode={setMode} mode={mode} />
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button type="submit">
            {mode === "signIn" ? "Sign In" : "Registration"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
