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
