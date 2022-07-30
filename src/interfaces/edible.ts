export interface IEdible {
  id: string
  name: string
  type: EdibleType
  totalWeight: number,
  proteinsWeight: number,
  fatsWeight: number,
  carbohydratesWeight: number,
  ingridients: IEdible[]
}

export interface IEdibleShort {
  id: string
  weight: number
}

export enum EdibleType {
  Product = 'PRODUCT',
  Dish = 'DISH'
}