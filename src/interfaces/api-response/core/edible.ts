import { IEdible } from './../../edible';
import { IPageInfo } from './../../page-info';

export interface EdibleSearchResponse {
  edibleList: IEdible[]
  pageInfo: IPageInfo
}

export type GetEdibleResponse = IEdible