import {FC} from 'react';

import Select, {GroupTypeBase, OptionTypeBase} from 'react-select';


export interface Props {
  defaultValue: OptionTypeBase | readonly OptionTypeBase[] | null | undefined,
  isDisabled: boolean,
  isLoading: boolean,
  selectName: string,
  selectValues: readonly (OptionTypeBase | GroupTypeBase<OptionTypeBase>)[] | undefined,
}

export const SingleSelect : FC<Props> = ({defaultValue, isDisabled, isLoading , selectName, selectValues}) => {

  // function toggleDisabled = () =>
  //   this.setState(state => ({ isDisabled: !state.isDisabled }));
  // toggleLoading = () =>
  //   this.setState(state => ({ isLoading: !state.isLoading }));
    return (
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={defaultValue}
          isDisabled={isDisabled}
          isLoading={isLoading}
          name={selectName}
          options={selectValues}
        />)
        {/*<Note Tag="label">*/}
        {/*  <Checkbox*/}
        {/*    checked={isClearable}*/}
        {/*    onChange={this.toggleClearable}*/}
        {/*    id="cypress-single__clearable-checkbox"*/}
        {/*  />*/}
        {/*  Clearable*/}
        {/*</Note>*/}
        {/*<Note Tag="label" style={{ marginLeft: '1em' }}>*/}
        {/*  <Checkbox*/}
        {/*    checked={isSearchable}*/}
        {/*    onChange={this.toggleSearchable}*/}
        {/*    id="cypress-single__searchable-checkbox"*/}
        {/*  />*/}
        {/*  Searchable*/}
        {/*</Note>*/}
        {/*<Note Tag="label" style={{ marginLeft: '1em' }}>*/}
        {/*  <Checkbox*/}
        {/*    checked={isDisabled}*/}
        {/*    onChange={this.toggleDisabled}*/}
        {/*    id="cypress-single__disabled-checkbox"*/}
        {/*  />*/}
        {/*  Disabled*/}
        {/*</Note>*/}
        {/*<Note Tag="label" style={{ marginLeft: '1em' }}>*/}
        {/*  <Checkbox*/}
        {/*    checked={isLoading}*/}
        {/*    onChange={this.toggleLoading}*/}
        {/*    id="cypress-single__loading-checkbox"*/}
        {/*  />*/}
        {/*  Loading*/}
        {/*</Note>*/}
        {/*<Note Tag="label" style={{ marginLeft: '1em' }}>*/}
        {/*  <Checkbox*/}
        {/*    type="checkbox"*/}
        {/*    checked={isRtl}*/}
        {/*    onChange={this.toggleRtl}*/}
        {/*    id="cypress-single__rtl-checkbox"*/}
        {/*  />*/}
        {/*  RTL*/}
        {/*</Note>*/}
}
