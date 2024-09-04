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
import { Menu, Dropdown } from 'antd';
import { SettingOutlined, MoreOutlined } from '@ant-design/icons';
import { SortableHandle } from 'react-sortable-hoc';
import { Column } from 'react-base-table';
import './table.css';

const DraggableHandle = SortableHandle(({ children }: any) => children);

export const getSystemColumn = ({ menuItems }: any) => ({
  key: 'settings',
  dataKey: 'settings',
  width: 20,
  frozen: Column.FrozenDirection.LEFT,
  cellRenderer: ({ cellData }: any) => (
    <DraggableHandle>
      <MoreOutlined className={'handler'} />
    </DraggableHandle>
  ),
  headerRenderer: () => (
    <Dropdown overlay={<Menu>{menuItems}</Menu>}>
      <SettingOutlined />
    </Dropdown>
  ),
});
