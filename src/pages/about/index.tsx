import axios from "axios"
import type { NextPage } from "next"
import { useEffect } from "react"
import { AuthService } from "../../services/auth"

const About: NextPage = () => {
  useEffect(() => {
    axios.get("api/auth/check-auth").then(() => {
      console.log("finish")
    })
    // AuthService.checkAuth().then((r) => console.log(r))
  })
  return (
    <div>
      {document.cookie}
      <button onClick={() => fetch("/api/getCookie")}>Cookie</button>
    </div>
  )
}

export default About
