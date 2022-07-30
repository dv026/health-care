import { IEdibleShort, IEdible } from "./edible"


// short - use for requests to create/edit dish
// normal - use for editing page
export interface IDish<T = 'normal'> {
  name: string
  ingridients: T extends 'short' ? IEdibleShort[] : IEdible[]
  id?: string
}