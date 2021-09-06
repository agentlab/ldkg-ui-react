/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import difference from 'lodash-es/difference';
import React, { useState, useEffect } from 'react';
import { Transfer, Table, Modal } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

export const MenuItem: React.FC<any> = ({ title, onClick, colState }) => {
  const [pickOn, setPickOn] = useState(!colState);

  useEffect(() => {
    setPickOn(!colState);
  }, [colState]);
  return (
    <div
      onClick={(e) => {
        setPickOn(!pickOn);
        onClick(pickOn);
      }}>
      {pickOn ? <CheckOutlined /> : <div style={{ display: 'inline-block', width: '14px' }} />}
      <span>{title}</span>
    </div>
  );
};

export const ExtendedTableMenu = ({ dataSource, sortKey, leftColumns, rightColumns, onChange, ...restProps }: any) => {
  const [transferVisisble, setTransferVisisble] = useState(false);
  const [targetKeys, setTargetKeys] = useState<any>([]);
  const onSave = () => {
    setTransferVisisble(false);
    const idxs = dataSource.reduce((res: any, e: any, idx: number) => {
      if (targetKeys.includes(e.key)) {
        res.push({ idx, hidden: true });
      } else {
        res.push({ idx, hidden: false });
      }
      return res;
    }, []);
    onChange(idxs);
  };
  const onCancel = () => {
    setTransferVisisble(false);
    const newData = dataSource.reduce((res: any, e: any) => {
      if (e[sortKey]) {
        res.push(e.key);
      }
      return res;
    }, []);
    setTargetKeys(newData);
  };
  const handleChange = (nextTargetKeys: any) => {
    setTargetKeys(nextTargetKeys);
  };
  useEffect(() => {
    const newData = dataSource.reduce((res: any, e: any) => {
      if (e[sortKey]) {
        res.push(e.key);
      }
      return res;
    }, []);
    setTargetKeys(newData);
  }, [dataSource, sortKey]);
  return (
    <React.Fragment>
      <span onClick={() => setTransferVisisble(true)}>Дополнительно</span>
      <Modal
        title='Настройка колонок'
        visible={transferVisisble}
        onOk={onSave}
        onCancel={onCancel}
        cancelText='Отмена'
        okText='Сохранить'>
        <Transfer dataSource={dataSource} targetKeys={targetKeys} onChange={handleChange} showSelectAll={false}>
          {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
          }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection = {
              getCheckboxProps: (item: any) => ({ disabled: listDisabled || item.disabled }),
              onSelectAll(selected: any, selectedRows: any) {
                const treeSelectedKeys = selectedRows.filter((item: any) => !item.disabled).map(({ key }: any) => key);
                const diffKeys = selected
                  ? difference(treeSelectedKeys, listSelectedKeys)
                  : difference(listSelectedKeys, treeSelectedKeys);
                onItemSelectAll(diffKeys, selected);
              },
              onSelect({ key }: any, selected: any) {
                onItemSelect(key, selected);
              },
              selectedRowKeys: listSelectedKeys,
            };

            return (
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredItems}
                size='small'
                onRow={({ key, disabled: itemDisabled }) => ({
                  onClick: () => {
                    if (itemDisabled || listDisabled) return;
                    onItemSelect(key || '', !listSelectedKeys.includes(key || ''));
                  },
                })}
              />
            );
          }}
        </Transfer>
      </Modal>
    </React.Fragment>
  );
};
