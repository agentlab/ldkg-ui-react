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

import './TableHeader.css';

export const SelectionHeaderCell: React.FC<any> = (props: any) => {
  const { column, container } = props;
  const { dataSize, onHeaderChange, selection, multiSelect } = column;
  const checked = selection.length === dataSize && dataSize !== 0;
  const handleChange = (e: any) => onHeaderChange({ selected: e.target.checked, data: container._data });

  return multiSelect ? <Checkbox checked={checked} onChange={handleChange} /> : null;
};

export const HeaderCell = ({ column, onSort, container }: any) => {
  const { sortColumns } = container.props;
  const sortDir: any = column.key in sortColumns ? sortColumns[column.key] : 'noSort';
  const onSortClick = () => {
    onSort(column.key, sortSwap[sortDir]);
  };
  const className = sortDir === 'noSort' && column.sort ? 'no-sort' : '';
  return (
    <React.Fragment>
      <div className={className} style={{ display: 'flex' }} onClick={onSortClick}>
        <span>{column.title}</span>
        {column.sort ? <SortIcon state={sortDir} /> : null}
      </div>
    </React.Fragment>
  );
};

export const SortIcon = ({ state }: any) => {
  const value = state === 'DESC' ? '↓' : state === 'ASC' ? '↑' : '';
  return <span style={{ display: 'block', marginLeft: '5px' }}>{value}</span>;
};

const sortSwap: any = {
  ASC: 'DESC',
  DESC: 'noSort',
  noSort: 'ASC',
};
