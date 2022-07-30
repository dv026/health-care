import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { useUpdateEffect } from "react-use"
import { useDebouncedCallback } from "use-debounce"

import { useStore } from "../../stores/root-store"
import { EdibleElement } from "../../components/edible/edible-element"
import { Input } from "../../components/common/input"
import { Pagination } from "../../components/common/pagination"
import { Button } from "../../components/common/button"
import { EdibleService } from "../../services/edible/list"
import { EdibleType } from "../../interfaces/edible"

const EdibleList = observer(() => {
  const { configStore, edibleListStore } = useStore()
  const { push } = useRouter()

  const handleGoToEdible = (id: string) => {
    push("/edible/" + id)
  }

  const fetchEdibleList = () => {
    if (configStore.config.defaultAmountWeight) {
      edibleListStore.fetchEdibleList(
        edibleListStore.searchQuery,
        edibleListStore.pageInfo.amountOnPage,
        edibleListStore.pageInfo.page,
        configStore.config.defaultAmountWeight
      )
    }
  }

  useEffect(() => {
    // condition to prevent reload data
    // when user left this page and then backed
    if (
      !edibleListStore.searchQuery &&
      edibleListStore.edibleList.length === 0
    ) {
      // condition to wait till we get config from api
      // happens when we start our app from this page only
      if (configStore.config.defaultAmountWeight) {
        fetchEdibleList()
      }
    }
  }, [configStore.config.defaultAmountWeight])

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    edibleListStore.setSearchQuery(e.target.value)
  }

  useUpdateEffect(() => {
    getFilteredEdibleList()
  }, [edibleListStore.searchQuery])

  const getFilteredEdibleList = useDebouncedCallback(() => {
    fetchEdibleList()
  }, 250)

  useUpdateEffect(() => {
    fetchEdibleList()
  }, [edibleListStore.pageInfo.page])

  const handleClickOnPage = (selectedItem: { selected: number }) => {
    edibleListStore.setCurrentPage(selectedItem.selected + 1)
  }

  const handleDeleteEdible = (id: string) => {
    EdibleService.deleteEdible(id).then(() => fetchEdibleList())
  }

  const handleEditEdible = (id: string, type: EdibleType) => {
    if (type === EdibleType.Dish) {
      push(`/edible/dish/edit/${id}`)
    } else if (type === EdibleType.Product) {
      push(`/edible/product/edit/${id}`)
    }
  }

  return (
    <StyledEdibleListPage>
      <StyledSearchBar>
        <Input
          value={edibleListStore.searchQuery}
          onChange={handleChangeSearchQuery}
        />
      </StyledSearchBar>
      <StyledEdibleList>
        {edibleListStore.edibleList.map((edible) => {
          return (
            <EdibleElement
              onDelete={() => handleDeleteEdible(edible.id)}
              onEdit={() => handleEditEdible(edible.id, edible.type)}
              onClick={() => handleGoToEdible(edible.id)}
              edible={edible}
              key={edible.id}
            />
          )
        })}
      </StyledEdibleList>
      <Pagination
        total={edibleListStore.pageInfo.maxPage}
        onPageClick={handleClickOnPage}
        current={edibleListStore.pageInfo.page}
      />
    </StyledEdibleListPage>
  )
})

const StyledEdibleListPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const StyledEdibleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 70%;
`

const StyledSearchBar = styled.div`
  width: 300px;
`

export default EdibleList
