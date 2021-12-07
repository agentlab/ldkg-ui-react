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
