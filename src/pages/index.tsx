import type { NextPage } from "next"
import { useEffect } from "react"
import Link from "next/link"
import { observer } from "mobx-react-lite"
import { useStore } from "../stores/root-store"

const Home: NextPage = observer(() => {
  const { authStore } = useStore()

  return (
    <div>
      <Link href="/login">
        <a>Login</a>
      </Link>
      HOME
      <div>{"username - " + authStore.user?.email}</div>
    </div>
  )
})

export default Home
