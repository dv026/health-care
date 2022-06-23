import Select from "react-select"

type Option = {
  label: string
  onClick: () => void
}

interface LineDropdownProps {
  accentColor: string
  options: Option[]
  label: string
}

export const LineDropdown: React.FC<LineDropdownProps> = ({
  accentColor,
  options,
  label,
}) => {
  return (
    <Select
      styles={{
        container: (props) => ({
          ...props,
          display: "flex",
          height: "100%",
          cursor: "pointer",
        }),
        control: () => ({
          display: "flex",
          color: "white",
          "&:hover": {
            color: accentColor,
          },
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: "inherit",
        }),
        singleValue: (base) => ({
          ...base,
          transition: "color 150ms",
          color: "inherit",
          // cursor: "inherit",
        }),
        option: () => ({
          padding: "10px",
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }),
        menuList: (base) => ({
          ...base,
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
        }),
        menu: (base) => ({
          ...base,
          width: "100px",
          right: "8px",
        }),
      }}
      components={{
        IndicatorSeparator: () => null,
      }}
      value={{ label }}
      isSearchable={false}
      options={options as Option[]}
      onChange={(option) => (option as Option)?.onClick()}
    />
  )
}
