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
import { Menu } from 'antd';
import { ExtendedTableMenu } from './ExtendedTableMenu';
import { MenuItem } from './MenuItem';

const TableColumns = [
  {
    dataIndex: 'title',
    title: 'Имя',
  },
];

export const getConfigMenuItems = ({ columns, setColumnsVisible }: any) => {
  const menuItems = columns.map((col: any, idx: number) => {
    return (
      <Menu.Item key={idx}>
        <MenuItem
          title={col.title}
          colState={col.hidden}
          onClick={(state: boolean) => setColumnsVisible([{ idx, hidden: state }])}
        />
      </Menu.Item>
    );
  });
  menuItems.push(
    <Menu.Item key={'additional'}>
      <ExtendedTableMenu
        dataSource={columns}
        sortKey={'hidden'}
        rightColumns={TableColumns}
        leftColumns={TableColumns}
        onChange={setColumnsVisible}
      />
    </Menu.Item>,
  );

  return menuItems;
};
