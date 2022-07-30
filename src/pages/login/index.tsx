import React, { useState } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import { Input } from "../../components/common/input"
import { Button } from "../../components/common/button"
import { validateCredentials } from "../../utils/validation"
import { ModeChooser } from "../../components/auth/mode-chooser"
import { useStore } from "../../stores/root-store"
import { getSessionServer } from "../../utils/session"

import styled from "styled-components"
import { backgroundColor } from "../../common/colors"
import { Loader } from "../../components/common/loader"
import axios from "axios"

export enum AuthMode {
  SignIn = "signIn",
  Registration = "registration",
}

const Login: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<AuthMode>(AuthMode.SignIn)
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setLoading] = useState(false)
  const { push } = useRouter()
  const { authStore } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    if (!validateCredentials(email, password)) return

    let authPromise: any //Nullable<Promise<LoginResponse>> = null
    // if (mode === AuthMode.SignIn) {

    // }
    if (mode === AuthMode.SignIn) {
      authPromise = axios.post(
        "/api/auth/login",
        {
          username: email,
          password: password,
        },
        { withCredentials: true }
      )
    } else if (mode === AuthMode.Registration) {
      authPromise = axios.post(
        "/api/auth/registration",
        {
          username: email,
          password: password,
        },
        { withCredentials: true }
      )
    }
    try {
      setLoading(true)
      const user = await authPromise
      if (user) {
        authStore.setUser(user)
        push("/")
      } else {
        throw new Error("CLIENT: user in null")
      }
    } catch (e: any) {
      console.log(e)
      setErrors((prev) => [...prev, e.response.data.message])
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginWrapper>
      <StyledLogin>
        {errors.map((e, index) => {
          return <div key={index}>{e}</div>
        })}
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
          <StyledButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader />
            ) : mode === "signIn" ? (
              "Sign In"
            ) : (
              "Registration"
            )}
          </StyledButton>
        </StyledForm>
      </StyledLogin>
    </LoginWrapper>
  )
}

const LoginWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${backgroundColor};

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
      const user = await axios.get("/api/auth/refresh")
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
