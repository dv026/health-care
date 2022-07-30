import React from "react"
import ReactDOM from "react-dom"

interface PortalProps {
  element?: string
  className?: string
}

export const Portal: React.FC<React.PropsWithChildren<PortalProps>> = ({
  children,
  className = "root-portal",
  element = "div",
}) => {
  const [container, setContainer] = React.useState<any>()

  React.useEffect(() => {
    if (container) {
      const el = document.createElement(element)
      el.classList.add(className)
      setContainer(el)
      document.body.appendChild(container)
    }
    return () => {
      if (container) {
        document.body.removeChild(container)
      }
    }
  }, [])

  return container ? ReactDOM.createPortal(children, container) : null
}