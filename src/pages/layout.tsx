import { useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "../components/button"

const Layout = ({ children }: { children: JSX.Element }) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log("we are inside layout")
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status])

  return (
    <div>
      <div>
        HEADER
        <Link href="/about">
          <a>About</a>
        </Link>
        {/* redirect false to ne reload the page */}
        <Button onClick={() => signOut({ redirect: false })}>sign out</Button>
      </div>
      {children}
      FOOTER
    </div>
  )
}

export default Layout
