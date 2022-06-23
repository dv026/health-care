import React, { useState } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { validateCredentials } from "../../utils/validation"
import { ModeChooser } from "../../components/mode-chooser"
import { AuthService } from "../../services/auth.service"
import { useStore } from "../../stores/root-store"
import { getSessionServer } from "../../utils/session"

import styled from "styled-components"
import { backgroundColor } from "../../common/colors"

export type IMode = "signIn" | "signUp"

const Login: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<IMode>("signIn")
  const [errors, setErrors] = useState<string[]>([])
  const { push } = useRouter()
  const { authStore } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCredentials(email, password)) return

    try {
      const user = await AuthService.login({
        username: email,
        password: password,
      })
      authStore.setUser(user)
      push("/")
    } catch (e: any) {
      setErrors((prev) => [...prev, e.message])
    }
  }

  return (
    <LoginWrapper>
      <StyledLogin>
        <ModeChooser setMode={setMode} mode={mode} />
        <StyledForm onSubmit={handleSubmit}>
          {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
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
          <StyledButton type="submit">
            {mode === "signIn" ? "Sign In" : "Registration"}
          </StyledButton>
        </StyledForm>
      </StyledLogin>
    </LoginWrapper>
  )
}

const LoginWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background-color:${backgroundColor};

    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledLogin = styled.div`
  width: 500px;
  height: 300px;
  box-sizing: border-box;

  background-color: white;
  border-radius: 20px;

  padding: 30px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
    &Item {
      &Label {
        margin-bottom: 10px;
      }
  }
`

const StyledButton = styled(Button)`
  align-self: center;
`

export default Login

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSessionServer(context)

  if (!session) {
    try {
      const user = await AuthService.refresh(context.req.headers.cookie)
      if (!user) {
        return {
          props: {},
        }
      }
    } catch (e) {
      return {
        props: {},
      }
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  }
}
