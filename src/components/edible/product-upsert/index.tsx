import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { textEllipsis } from "../../../common/mixins"
import { IEdible } from "../../../interfaces/edible"
import { IProduct } from "../../../interfaces/product"
import { EdibleService } from "../../../services/edible/list"
import { validateNumber } from "../../../utils/validation"
import { Button } from "../../common/button"
import { Input } from "../../common/input"

interface ProductUpsertProps {
  product?: IProduct
}

export const ProductUpsert: React.FC<ProductUpsertProps> = ({ product }) => {
  const [name, setName] = useState(product?.name || "")
  const [productWeight, setProductWeight] = useState(
    product?.productWeight?.toString() || ""
  )
  const [proteinsWeight, setProteinsWeight] = useState(
    product?.proteinsWeight?.toString() || ""
  )
  const [fatsWeight, setFatsWeight] = useState(
    product?.fatsWeight?.toString() || ""
  )
  const [carbohydratesWeight, setCarbohydratesWeight] = useState(
    product?.carbohydratesWeight?.toString() || ""
  )
  const { push } = useRouter()

  // useEffect(() => {
  //   if (id) {
  //     EdibleService.get(id).then((response) => {
  //       if (!response) {
  //         push("/edible/list")
  //       }
  //       setName(response.name)
  //       setProductWeight(response.totalWeight.toString())
  //       setProteinsWeight(response.proteinsWeight.toString())
  //       setFatsWeight(response.fatsWeight.toString())
  //       setCarbohydratesWeight(response.carbohydratesWeight.toString())
  //     })
  //   }
  // }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = {
      // id,
      name,
      productWeight: parseInt(productWeight),
      proteinsWeight: parseInt(proteinsWeight),
      fatsWeight: parseInt(fatsWeight),
      carbohydratesWeight: parseInt(carbohydratesWeight),
    }

    if (true) {
      EdibleService.editProduct(payload).then(() => push("/edible/list"))
    } else {
      EdibleService.createProduct(payload).then(() => push("/edible/list"))
    }
  }

  return (
    <StyledEditPage>
      <Form onSubmit={handleSubmit}>
        <FormElement>
          <Label>Name</Label>
          <StyledInput
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </FormElement>
        <FormElement>
          <Label>Product weight</Label>
          <StyledInput
            value={productWeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value
              if (validateNumber(value)) {
                setProductWeight(e.target.value)
              }
            }}
          />
        </FormElement>
        <FormElement>
          <Label>Proteins weight</Label>
          <StyledInput
            value={proteinsWeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value
              if (validateNumber(value)) {
                setProteinsWeight(e.target.value)
              }
            }}
          />
        </FormElement>
        <FormElement>
          <Label>Carbohydrates weight</Label>
          <StyledInput
            value={carbohydratesWeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value
              if (validateNumber(value)) {
                setCarbohydratesWeight(e.target.value)
              }
            }}
          />
        </FormElement>
        <FormElement>
          <Label>Fats weight</Label>
          <StyledInput
            value={fatsWeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value
              if (validateNumber(value)) {
                setFatsWeight(e.target.value)
              }
            }}
          />
        </FormElement>
        <Button type="submit">Save</Button>
      </Form>
    </StyledEditPage>
  )
}

const StyledEditPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;
  align-items: center;
`

const FormElement = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`

const Label = styled.div`
  flex: 4;
  ${textEllipsis}
`

const StyledInput = styled(Input)`
  flex: 8;
`
