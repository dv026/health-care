import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn()
      // push("/login")
    }
  }, [status])

  if (status === "authenticated") {
    return children
  }

  if (status === "loading") {
    return null
    // return <div>{"loading ..."}</div>
  }

  return null
}
