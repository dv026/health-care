import { coreApi } from '../../../api/core.api';
import { GetEdibleResponse } from './../../../interfaces/api-response/core/edible';
import { EdibleSearchResponse } from '../../../interfaces/api-response/core/edible';
import { IProduct } from '../../../interfaces/product';
import { IDish } from '../../../interfaces/dish';

export class EdibleService {
  // EDIBLE
  static get(id: string, config?: any): Promise<GetEdibleResponse> {
    return coreApi.get<GetEdibleResponse>(`/web/edible/${id}?totalWeight=100`, config)
      .then((response) => response.data)
  }

  static getAll(searchRequest: string, onPage: number, page: number, weight: number): Promise<EdibleSearchResponse> {
    return coreApi.get<EdibleSearchResponse>(`/web/edible/search?searchRequest=${searchRequest}&onPage=${onPage}&page=${page}&weight=${weight}`)
      .then((response) => response.data)
  }

  static deleteEdible(id: string): Promise<any> {
    return coreApi.delete<any>(`web/edible/${id}`)
    .then((response) => response.data)
  }

  // PRODUCT
  static createProduct(product: IProduct): Promise<any> {
    return coreApi.post<any>(`web/product`, product)
      .then((response) => response.data)
  }

  static editProduct(product: IProduct): Promise<any> {
    return coreApi.patch<any>(`web/product${product.id}`, product)
      .then((response) => response.data)
  }

  // DISH
  static createDish(dish: IDish<'short'>): Promise<any> {
    return coreApi.post<any>(`web/dish`, dish)
      .then((response) => response.data)
  }

  static editDish(dish: IDish<'short'>): Promise<any> {
    return coreApi.patch<any>(`web/dish${dish.id}`, dish)
  }

}