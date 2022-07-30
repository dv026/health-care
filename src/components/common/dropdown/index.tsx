import Select, { ActionMeta, OnChangeValue } from "react-select"

export type Option = any
//  {
//   label: string
//   value: string
// }

interface DropdownProps {
  accentColor?: string
  options: Option[]
  value?: Option
  className?: string
  onChange: (
    newValue: OnChangeValue<Option, false>,
    actionMeta: ActionMeta<Option>
  ) => void
}

export const Dropdown: React.FC<DropdownProps> = ({
  accentColor,
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <Select
      className={className}
      value={value}
      isSearchable
      options={options}
      onChange={onChange}
    />
  )
}
