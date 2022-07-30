import { GetServerSideProps, NextPage } from "next"
import React from "react"
import nookies from "nookies"

import { ProductUpsert } from "../../../../components/edible/product-upsert"
import { IProduct } from "../../../../interfaces/product"
import { EdibleService } from "../../../../services/edible/list"

interface EditProductPageProps {
  product: IProduct
}

const EditProductPage: NextPage<EditProductPageProps> = ({ product }) => {
  return <ProductUpsert product={product} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const cookies = nookies.get(context)

  if (id) {
    try {
      const response = await EdibleService.get(id.toString(), {
        headers: {
          authentication: "Bearer " + cookies["accessToken"],
        },
      })
      return {
        props: {
          product: response,
        },
      }
    } catch (e) {}
    return {
      redirect: {
        destination: "/edible/list",
        permanent: false,
      },
    }
  }
  return {
    redirect: {
      destination: "/edible/list",
      permanent: false,
    },
  }
}
export default EditProductPage
