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
import React, { useState, useEffect, useContext } from 'react';
import { Transfer, Table, Modal } from 'antd';
import { MstContext } from '../../../../MstContext';
import { ArrayIRI, ArrayLocale } from '../../..';

export const ExtendedTableMenu = ({
  dataSource,
  sortKey,
  leftColumns,
  rightColumns,
  onChange,
  ...restProps
}: any): JSX.Element => {
  const [transferVisible, setTransferVisible] = useState(false);
  const [targetKeys, setTargetKeys] = useState<any>([]);
  const { store } = useContext(MstContext);
  const locale: ArrayLocale = store.getLocaleJs(ArrayIRI);
  const onSave = () => {
    setTransferVisible(false);
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
    setTransferVisible(false);
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
      <span onClick={() => setTransferVisible(true)}>{locale.extSettings}</span>
      <Modal
        title={locale.columnSettings}
        visible={transferVisible}
        onOk={onSave}
        onCancel={onCancel}
        cancelText={locale.btnCancel}
        okText={locale.btnSave}>
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
