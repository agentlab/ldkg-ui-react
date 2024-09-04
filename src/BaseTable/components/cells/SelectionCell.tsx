/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
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
