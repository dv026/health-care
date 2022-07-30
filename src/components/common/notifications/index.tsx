import { observer } from "mobx-react-lite"
import styled from "styled-components"

import { useStore } from "../../../stores/root-store"
import { Notification } from "../notification"

export const Notifications = observer(() => {
  const { notificationStore } = useStore()

  return (
    <StyledNotifications>
      {notificationStore.notifications.map((notification, index) => (
        <Notification {...notification} key={index} />
      ))}
    </StyledNotifications>
  )
})

const StyledNotifications = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  z-index: 999;
  gap: 15px;
  overflow: scroll;
  max-height: 600px;
`
