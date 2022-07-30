import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { useStore } from "../stores/root-store"
import { useSession } from "./session"
import { AuthService } from "../services/auth"
import axios from "axios"
import { ConfigService } from "../services/config"

export const AuthGuard = ({ children }: any) => {
  const { authStore, configStore } = useStore()
  const { push } = useRouter()
  const session = useSession()

  const [auth, setAuth] = useState<Boolean | null>(null)

  useEffect(() => {
    if (session) {
      ConfigService.get().then((config) => {
        if (config) {
          configStore.setConfig(config)
        }
      })
      setAuth(true)
      authStore.setUser(session.user)
    } else {
      axios
        .get("/api/auth/refresh")
        .then((response) => {
          if (response) {
            setAuth(true)
            authStore.setUser(response.data.user)
          } else {
            push("/login")
          }
        })
        .catch(() => {
          push("/login")
        })
    }
  }, [])

  if (!auth) return null ///<LoadingScreen />

  return children
}
