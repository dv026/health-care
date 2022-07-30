import { NextPage } from "next"
import React, { useState } from "react"
import styled from "styled-components"
import { textEllipsis } from "../../../common/mixins"
import { v4 as uuidv4 } from "uuid"

import { Button } from "../../common/button"
import { Dropdown, Option } from "../../common/dropdown"
import { Input } from "../../common/input"
import { EdibleService } from "../../../services/edible/list"
import { IDish } from "../../../interfaces/dish"
import { IEdible, IEdibleShort } from "../../../interfaces/edible"

const data = [
  {
    id: "98bac808-332f-477c-bd18-f11e8e80252d",
    name: "apple",
  },
  {
    id: "2",
    name: "plum",
  },
]

const convertDataToOptions = (data: any): Ingredient[] => {
  return data.map((elem: any) => ({
    label: elem.name,
    value: elem.id,
    weight: 100,
  }))
}

interface DishUpsertProps {
  dish?: IEdible
}

interface Ingredient extends Option {
  weight: number | null
  id: string
}

export const DishUpsert: React.FC<DishUpsertProps> = ({ dish }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    dish?.ingridients.map((e) => ({
      value: e.id,
      label: e.name,
      id: uuidv4(),
      weight: e.totalWeight,
    })) || []
  )
  const [name, setName] = useState(dish?.name || "")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload: IEdibleShort[] = ingredients
      .filter((ingredient) => Boolean(ingredient.value))
      .map((ingredient) => {
        return {
          id: ingredient.value,
          weight: ingredient.weight || 100,
        }
      })
    if (dish?.id) {
      EdibleService.editDish({
        id: dish.id,
        name,
        ingridients: payload,
      }).then((response) => console.log(response))
    } else {
      EdibleService.createDish({
        name,
        ingridients: payload,
      }).then((response) => console.log(response))
    }
  }

  const handleAddNewProduct = () => {
    setIngredients((prev) => {
      const emptyIngredient: Ingredient = {
        weight: null,
        value: "",
        label: "",
        id: uuidv4(),
      }
      return [...prev, emptyIngredient]
    })
  }

  const handleRemoveProduct = (id: string) => {
    setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id))
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
        {ingredients.map((ingredient, index) => {
          return (
            <FormElement key={ingredient.id}>
              <Label>Product - {index}</Label>
              <StyledDropdown
                value={ingredient}
                onChange={(option) =>
                  setIngredients((prev) =>
                    prev.map((e) => {
                      if (e.id === ingredient.id) {
                        return {
                          ...e,
                          value: option.value,
                          label: option.label,
                        }
                      }
                      return e
                    })
                  )
                }
                options={convertDataToOptions(data)}
              />
              <div>Weight</div>
              <Input
                value={ingredient.weight?.toString()}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setIngredients((prev) =>
                    prev.map((e) => {
                      if (e.id === ingredient.id) {
                        return {
                          ...e,
                          weight: parseInt(event.target.value),
                        }
                      }
                      return e
                    })
                  )
                }
              />
              <LabelDelete onClick={() => handleRemoveProduct(ingredient.id)}>
                Delete
              </LabelDelete>
            </FormElement>
          )
        })}
        <Button type="button" onClick={handleAddNewProduct}>
          Add new product
        </Button>
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

const LabelDelete = styled.div`
  flex: 4;
  ${textEllipsis}
  cursor: pointer;
  text-align: right;

  &:hover {
    color: red;
  }
`

const StyledInput = styled(Input)`
  flex: 8;
`

const StyledDropdown = styled(Dropdown)`
  width: 150px;
`
