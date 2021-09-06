/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import isEqual from 'lodash-es/isEqual';
import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { SortableElement } from 'react-sortable-hoc';

const DraggableElement = SortableElement(({ children }: any) => children);

export const Row = React.memo(
  React.forwardRef(({ key, index, children, ...rest }: any, ref: any) => {
    if (children.length === 2)
      return (
        <DraggableElement key={key} index={index}>
          <div {...rest} ref={ref}>
            {children}
          </div>
        </DraggableElement>
      );
    return (
      <div {...rest} ref={ref}>
        {children}
      </div>
    );
  }),
  (p, n) => isEqual(p.children, n.children),
);

export const rowProps = ({ rowData, ...rest }: any) => ({
  tagName: Row,
  index: rest.rowIndex,
  key: rowData['@id'],
});

export const SelectionCell: React.FC<any> = (props: any) => {
  const { rowData, rowIndex, column } = props;
  const { rowKey, onChange, selectedRowKeys } = column;
  const checked = rowData ? selectedRowKeys.includes(rowData[rowKey]) : false;
  const handleChange = (e: any) => onChange({ selected: e.target.checked, rowData, rowIndex });

  return <Checkbox checked={checked} onChange={handleChange} />;
};

export const Handle = styled.div`
  flex: none;
  width: 7.5px;
  height: 100%;
  &::before {
    content: '';
    border-left: 4px dotted #ccc;
    display: block;
    height: 20px;
  }
  &:hover::before {
    border-color: #888;
  }
`;
