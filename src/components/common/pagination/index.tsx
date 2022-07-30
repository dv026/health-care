import ReactPaginate from "react-paginate"

interface PaginationProps {
  total: number
  current: number
  onPageClick: (selectedItem: { selected: number }) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  onPageClick,
  total,
  current,
}) => {
  return (
    <ReactPaginate
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      pageCount={total}
      onPageChange={onPageClick}
      forcePage={current - 1}
    />
  )
}
