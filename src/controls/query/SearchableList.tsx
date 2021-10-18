import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input, Table } from 'antd';
import { JsObject } from '@agentlab/sparql-jsld-client';

const positionIndependentComp = (lowval: string) => (a: any, b: any) => {
  if (a === b) {
    return 0;
  }
  const bind = b.toLowerCase().indexOf(lowval);
  const aind = a.toLowerCase().indexOf(lowval);
  if (bind === -1 && aind === -1) {
    return a.localeCompare(b);
  }
  if (bind === -1) {
    return -1;
  }
  if (aind === -1) {
    return 1;
  }
  if (aind < bind) {
    return -1;
  }
  if (aind > bind) {
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
  const [previousSreachValue, setPreviousSreachValue] = useState<string | null>(null);

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
    const lowval = event.target.value.toLowerCase();
    if (previousSreachValue == null) {
      setPreviousSreachValue(lowval);
    }

    let sortedOptionList = [];
    if (previousSreachValue && (!lowval.startsWith(previousSreachValue) || lowval === previousSreachValue)) {
      sortedOptionList = dataSource;
    } else {
      sortedOptionList = optionList.slice();
    }

    sortedOptionList = sortedOptionList
      .filter((word) => {
        return word.title.toLowerCase().indexOf(lowval) !== -1;
      })
      .sort((a, b) => positionIndependentComp(lowval)(a.title, b.title));

    if (sortedOptionList && sortedOptionList.length) {
      setPreviousSreachValue(lowval);
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
