import React from 'react';
import { Checkbox } from 'antd';
import { observer } from 'mobx-react-lite';

export const SelectionHeaderCell: React.FC<any> = observer(({ selection, multiselect, onSelect }) => {
  const checked = selection.isAllSelected;
  const handleChange = () => {
    checked ? selection.deselectAll() : selection.selectAll();
    onSelect(selection.getSelectedItems());
  };

  return multiselect ? <Checkbox onChange={handleChange} checked={checked} /> : null;
});
