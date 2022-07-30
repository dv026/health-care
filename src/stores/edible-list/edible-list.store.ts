import { EdibleService } from './../../services/edible/list/index';
import { IEdible } from './../../interfaces/edible';
import { IPageInfo } from './../../interfaces/api-response/page-info/index';
import { makeAutoObservable } from 'mobx';

const initialPageSize = 10
const initialCurrentPage = 1

export class EdibleListStore {
  constructor() {
    makeAutoObservable(this)
  }
  
  pageInfo: IPageInfo = {
    maxPage: 0,
    amountOnPage: initialPageSize,
    page: initialCurrentPage
  }
  edibleList: IEdible[] = []
  searchQuery: string  = ''

  fetchEdibleList(searchQuery: string, pageSize: number, currentPage: number, defaultAmountWeight: number) {
    EdibleService.getAll(
      searchQuery,
      pageSize,
      currentPage,
      defaultAmountWeight
    ).then((response) => {
        this.setEdibleList(response.edibleList)
        this.setPageInfo(response.pageInfo)
    })
  }

  setPageInfo(pageInfo: IPageInfo) {
    this.pageInfo = pageInfo
  }

  setEdibleList(edibleList: IEdible[]) {
    this.edibleList = edibleList
  }
  
  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery
  }

  setCurrentPage(page: number) {
    this.pageInfo.page = page
  }
}