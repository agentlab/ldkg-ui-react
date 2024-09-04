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
