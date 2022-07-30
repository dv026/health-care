import { GetServerSideProps, NextPage } from "next"
import nookies from "nookies"

import { DishUpsert } from "../../../../components/edible/dish-upsert"
import { EdibleService } from "../../../../services/edible/list"
import { IEdible } from "../../../../interfaces/edible"

interface EditDishPageProps {
  dish: IEdible
}

export const EditDishPage: NextPage<EditDishPageProps> = ({ dish }) => {
  return <DishUpsert dish={dish} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const cookies = nookies.get(context)

  if (id) {
    try {
      const response = await EdibleService.get(id.toString(), {
        headers: {
          authentication: "Bearer " + cookies.accessToken,
        },
      })
      return {
        props: {
          dish: response,
        },
      }
    } catch (e) {
      return {
        redirect: {
          destination: "/edible/list",
          permanent: false,
        },
      }
    }
  }
  return {
    redirect: {
      destination: "/edible/list",
      permanent: false,
    },
  }
}
export default EditDishPage
