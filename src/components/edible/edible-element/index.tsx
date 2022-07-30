import React from "react"
import styled from "styled-components"
import { IEdible } from "../../../interfaces/edible"

interface EdibleProps {
  edible: IEdible
  onClick: () => void
  onDelete?: () => void
  onEdit?: () => void
}

export const EdibleElement: React.FC<EdibleProps> = ({
  edible,
  onClick,
  onDelete,
  onEdit,
}) => {
  const handleEdit = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.stopPropagation()
    onEdit && onEdit()
  }

  const handleDelete = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.stopPropagation()
    onDelete && onDelete()
  }

  return (
    <EdibleStyled onClick={onClick}>
      <div>{edible.name}</div>
      <div>{edible.type}</div>
      {onEdit && (
        <StyledLabel
          onClick={(e: React.MouseEvent<HTMLLabelElement>) => handleEdit(e)}
        >
          edit
        </StyledLabel>
      )}
      {onDelete && (
        <StyledLabel
          onClick={(e: React.MouseEvent<HTMLLabelElement>) => handleDelete(e)}
        >
          delete
        </StyledLabel>
      )}
    </EdibleStyled>
  )
}

const EdibleStyled = styled.div`
  display: flex;
  height: 30px;

  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 1px 0 black;
  }
`

const StyledLabel = styled.label`
  cursor: pointer;

  &:hover {
    color: red;
  }
`
