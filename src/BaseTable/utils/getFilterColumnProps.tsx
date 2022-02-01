import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { JsObject } from '@agentlab/sparql-jsld-client';

export const getColumnFilterProps = (dataIndex: string) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type='primary'
        onClick={() => confirm()}
        icon={<SearchOutlined />}
        size='small'
        style={{ width: 90, marginRight: 8 }}>
        Search
      </Button>
      <Button onClick={() => clearFilters()} size='small' style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  ),
  filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value: string, record: JsObject) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible: boolean) => {},
});
