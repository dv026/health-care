import styled from "styled-components"
import { GrClose } from "react-icons/gr"
import {
  errorBorderColor,
  errorColor,
  opacity09,
  successBorderColor,
  successColor,
  warningBorderColor,
  warningColor,
} from "../../../common/colors"
import {
  INotification,
  NotificationType,
} from "../../../interfaces/notification"
import { useStore } from "../../../stores/root-store"

export const Notification: React.FC<INotification> = ({
  type,
  message,
  id,
}) => {
  const { notificationStore } = useStore()

  return (
    <StyledNotification message={message} type={type}>
      <StyledHeader>{type}</StyledHeader>
      <StyledMessage>{message}</StyledMessage>
      <StyledClose
        onClick={() => id && notificationStore.closeNotification(id)}
      />
    </StyledNotification>
  )
}

const StyledNotification = styled.div<Pick<INotification, "message" | "type">>`
  width: 250px;
  flex-shrink: 0;
  padding: 10px;
  height: ${(props) => (props.message ? "80px" : "50px")};
  justify-content: ${(props) => !props.message && "center"};
  background-color: ${(props) => {
    switch (props.type) {
      case NotificationType.Success: {
        return successColor + opacity09
      }
      case NotificationType.Error: {
        return errorColor + opacity09
      }
      case NotificationType.Warning: {
        return warningColor + opacity09
      }
      default:
        return errorColor
    }
  }};
  border: 1px solid
    ${(props) => {
      switch (props.type) {
        case NotificationType.Success: {
          return successBorderColor
        }
        case NotificationType.Error: {
          return errorBorderColor
        }
        case NotificationType.Warning: {
          return warningBorderColor
        }
        default:
          return errorBorderColor
      }
    }};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  color: white;
  position: relative;
  box-sizing: border-box;
`

const StyledHeader = styled.div`
  font-size: 24px;
  &::first-letter {
    text-transform: uppercase;
  }
`

const StyledMessage = styled.div``

const StyledClose = styled(GrClose)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) hue-rotate(16deg)
    contrast(104%);

  &:hover {
    // disabled color
    filter: brightness(0) saturate(100%) invert(66%) sepia(14%)
      hue-rotate(201deg) contrast(91%);
  }
`
