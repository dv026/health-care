import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { IEdible } from "../../interfaces/edible"
import { EdibleService } from "../../services/edible/list"

const EdiblePage: NextPage = () => {
  const [edible, setEdible] = useState<IEdible>()
  const router = useRouter()

  useEffect(() => {
    if (router.query?.id) {
      EdibleService.get(router.query.id[0]).then((edible) => setEdible(edible))
    }
  }, [router])

  if (!edible) {
    return <div>loading...</div>
  }

  return <div>{edible.name}</div>
}

export default EdiblePage
