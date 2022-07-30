import type { NextPage } from "next"
import { useEffect } from "react"
import Link from "next/link"
import { observer } from "mobx-react-lite"
import { useStore } from "../stores/root-store"
import { NotificationType } from "../interfaces/notification"
import { AuthService } from "../services/auth"
import { Button } from "../components/common/button"

const Home: NextPage = observer(() => {
  const { notificationStore } = useStore()

  const handle = () => {
    // AuthService.checkAuth()
    //   .then(() => console.log("yes"))
    //   .catch(() => console.log("nope"))
  }

  return (
    <div>
      <div>
        <Button
          onClick={() =>
            notificationStore.showNotification({
              type: NotificationType.Success,
            })
          }
        >
          show success
        </Button>
      </div>
      <br />
      <div>
        <Button
          onClick={() =>
            notificationStore.showNotification({ type: NotificationType.Error })
          }
        >
          show error
        </Button>
      </div>
    </div>
  )
})

export default Home
