import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { useStore } from "../stores/root-store"
import { useSession } from "./session"
import { AuthService } from "../services/auth.service"

export const AuthGuard = ({ children }: any) => {
  const { authStore } = useStore()
  const { push } = useRouter()
  const session = useSession()

  const [auth, setAuth] = useState<Boolean | null>(null)

  useEffect(() => {
    if (session) {
      setAuth(true)
      authStore.setUser(session.user)
    } else {
      AuthService.refresh()
        .then((response) => {
          if (response) {
            setAuth(true)
            authStore.setUser(response.data.user)
          } else {
            push("/login")
          }
        })
        .catch(() => {
          push('/login')
        })
    }
  }, [])

  if (!auth) return null ///<LoadingScreen />

  return children
}
