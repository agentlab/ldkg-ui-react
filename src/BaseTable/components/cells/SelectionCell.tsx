import React from 'react';
import { Checkbox, Radio } from 'antd';
import { observer } from 'mobx-react-lite';

export const SelectionCell: React.FC<any> = observer(({ id, selection, multiselect, onSelect }) => {
  const checked = selection.selection.get(id)?.selected;
  const handleChange = () => {
    if (multiselect) {
      selection.toggleItem(id);
    } else {
      selection.deselectAll();
      selection.selectItem(id);
    }
    onSelect(selection.getSelectedItems());
  };

  return multiselect ? (
    <Checkbox checked={checked} onChange={handleChange} />
  ) : (
    <Radio checked={checked} onChange={handleChange} />
  );
});
