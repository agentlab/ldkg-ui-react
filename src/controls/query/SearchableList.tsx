/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input, Table } from 'antd';
import { JsObject } from '@agentlab/sparql-jsld-client';

const positionIndependentComp = (lowVal: string) => (a: any, b: any) => {
  if (a === b) {
    return 0;
  }
  const bInd = b.toLowerCase().indexOf(lowVal);
  const aInd = a.toLowerCase().indexOf(lowVal);
  if (bInd === -1 && aInd === -1) {
    return a.localeCompare(b);
  }
  if (bInd === -1) {
    return -1;
  }
  if (aInd === -1) {
    return 1;
  }
  if (aInd < bInd) {
    return -1;
  }
  if (aInd > bInd) {
    return 1;
  }
  return 0;
};

interface SearchableListProps {
  dataSource: { [key: string]: string }[];
  defaultSelectedKey: string;
  onClick?: (val: JsObject, rowIndex?: number) => void;
}

export const SearchableList: React.FC<SearchableListProps> = ({
  dataSource,
  defaultSelectedKey,
  onClick = () => {},
}) => {
  const [optionList, setOptionList] = useState<{ [key: string]: string }[]>(dataSource);
  const [selectedItem, setSelectedItem] = useState<string>(defaultSelectedKey);
  const [previousSearchValue, setPreviousSearchValue] = useState<string | null>(null);

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'key',
      render: (item: string) => {
        return {
          props: {
            style: item === selectedItem ? { background: 'rgba(24, 144, 255, 0.35)' } : {},
          },
          children: <div>{item}</div>,
        };
      },
    },
  ];

  const onInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const lowVal = event.target.value.toLowerCase();
    if (previousSearchValue == null) {
      setPreviousSearchValue(lowVal);
    }

    let sortedOptionList = [];
    if (previousSearchValue && (!lowVal.startsWith(previousSearchValue) || lowVal === previousSearchValue)) {
      sortedOptionList = dataSource;
    } else {
      sortedOptionList = optionList.slice();
    }

    sortedOptionList = sortedOptionList
      .filter((word) => {
        return word.title.toLowerCase().indexOf(lowVal) !== -1;
      })
      .sort((a, b) => positionIndependentComp(lowVal)(a.title, b.title));

    if (sortedOptionList && sortedOptionList.length) {
      setPreviousSearchValue(lowVal);
    }
    setOptionList(sortedOptionList);
  };

  useEffect(() => {
    setOptionList(dataSource);
  }, [dataSource]);

  return (
    <div>
      <Input.Search
        style={{ marginBottom: '20px', marginTop: '20px' }}
        placeholder='Поиск фильтра'
        onChange={onInputSearch}
      />
      <Table
        bordered={false}
        size='small'
        dataSource={optionList}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setSelectedItem(record.item);
              onClick(record, rowIndex);
            },
          };
        }}
        columns={columns}
        style={{ width: '100%' }}
        pagination={false}
        showHeader={false}
        scroll={{ y: 240 }}
      />
    </div>
  );
};
