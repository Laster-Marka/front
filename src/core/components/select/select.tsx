import { FC } from 'react'

import Select, { GroupTypeBase, OptionTypeBase } from 'react-select'

export interface Props {
  defaultValue: OptionTypeBase | readonly OptionTypeBase[] | null | undefined
  isDisabled: boolean
  isLoading: boolean
  selectName: string
  selectValues: readonly (OptionTypeBase | GroupTypeBase<OptionTypeBase>)[] | undefined
}

export const SingleSelect: FC<Props> = ({
  defaultValue,
  isDisabled,
  isLoading,
  selectName,
  selectValues,
}) => {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      isLoading={isLoading}
      name={selectName}
      options={selectValues}
    />
  )
}
