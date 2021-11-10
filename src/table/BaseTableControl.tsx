/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { has, isEqual, forOwn } from 'lodash-es';
import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { autorun } from 'mobx';
import { JsObject } from '@agentlab/sparql-jsld-client';

import { EditableTable } from './basetable/ReactBaseTable';
import { HeaderCell } from './basetable/TableHeader';
//import { ColumnMenu } from './ColumnsMenu';
import { EditableCell } from './TableCell';

interface JsonSchemaTableProps {
  schema: JsObject;
  onChangeData?: Function;
  onSwap?: Function;
  filteredValue?: string[];
  path: string;
  config?: any;
  [key: string]: any;
}

const createTableData = (data: any) => {
  return data.map((e: any, index: number) => {
    return {
      _id: index,
      ...e,
    };
  });
};

export const BaseTableControl: React.FC<JsonSchemaTableProps> = React.memo(
  ({
    viewKind,
    viewKindElement,
    viewDescr,
    viewDescrElement,
    data = [],
    schema,
    limit,
    uri,
    options = {},
    loadMoreData,
    onSwap = () => {},
    onChangeData = () => {},
    onSelect = () => {},
    onDeleteRows,
    onSort,
    actionsMap,
    loadExpandedData,
    addDataToTarget,
    sortDir,
  }) => {
    const [parsedSchema, setParsedSchema] = useState<JsObject>({});
    const [columns, setColumns] = useState<JsObject[]>([]);
    const [tableMenu] = useState<any>();
    const uiSchemaOptions = options;
    const heightCache = {};
    const [dataSource, setDataSource] = useState<JsObject[]>([]);
    const handleResize =
      (key: any) =>
      (e: any, { size }: any) => {
        const newData = [...columns];
        newData[key].width = size.width;
        setColumns(newData);
      };
    const setColumnVisible = (idxs: any) => {
      const newColumns = [...columns];
      idxs.forEach((e: any) => {
        const newData = Object.assign({}, newColumns[e.idx], { hidden: e.hidden });
        newColumns[e.idx] = newData;
      });
      setColumns(newColumns);
    };
    const JsonSchemaT = (
      <EditableTable
        viewKind={viewKind}
        viewKindElement={viewKindElement}
        viewDescr={viewDescr}
        viewDescrElement={viewDescrElement}
        schema={schema}
        options={options}
        sortDir={sortDir}
        actionsMap={actionsMap}
        target={options?.target?.name}
        addDataToTarget={addDataToTarget}
        limit={limit}
        loadMoreData={loadMoreData}
        bordered={uiSchemaOptions['resizeableHeader']}
        columns={columns}
        setColumnVisible={setColumnVisible}
        dataSource={dataSource}
        loadExpandedData={loadExpandedData}
        tableMenu={tableMenu}
        multiSelect={uiSchemaOptions['multiSelect']}
        isMenu={uiSchemaOptions['columnMenu']}
        parsedSchema={parsedSchema}
        onSelect={onSelect}
        onDeleteRows={onDeleteRows}
        onChangeMenu={setColumns}
        handleResize={handleResize}
        resizeableHeader={uiSchemaOptions['resizeableHeader']}
        pagination={has(uiSchemaOptions, 'pagination') ? uiSchemaOptions['pagination'] : false}
      />
    );

    useEffect(() => {
      const createViewClass = (key: string) => {
        const newViewElement: any = {};
        if (options[key]) {
          newViewElement.options = options[key];
        }
        return newViewElement;
      };

      const setProperty = (schema: JsObject, obj: JsObject, key: string) => {
        has(schema, key) &&
          Object.defineProperty(obj, key, {
            value: schema[key],
            enumerable: true,
          });
      };

      const handleSearch = (selectedKeys: any[], confirm: Function) => {
        confirm();
      };

      const handleReset = (clearFilters: Function) => {
        clearFilters();
      };

      const getColumnFilterProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type='primary'
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size='small'
              style={{ width: 90, marginRight: 8 }}>
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size='small' style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value: string, record: JsObject) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: boolean) => {},
      });

      const createColumnFromSchema = (key: string) => {
        const newColumn: JsObject = {
          title: schema.properties[key]?.title || key,
          key: key,
          dataKey: key,
          editable: false,
          hidden: false,
          disabled: false,
          width: 200,
          resizable: true,
          sort: options[key].sortable,
          cellRenderer: ({ cellData, ...rest }: any) => (
            <EditableCell
              viewKind={viewKind}
              viewKindElement={createViewClass(key)}
              viewDescr={viewDescr}
              viewDescrElement={viewDescrElement}
              schema={schema.properties[key]}
              editable={true}
              heightCache={heightCache}
              dataIndex={key}
              uri={uri}
              title={schema.properties[key]?.title || key}
              enabled={true}
              cellData={cellData}
              {...rest}
            />
          ),
          disabledInColumnMenu: false,
          headerRenderer: (props: any) => <HeaderCell {...props} onSort={onSort} />,
        };
        if (has(schema.properties[key], 'formatters')) {
          newColumn.render = schema.properties[key].formatters.default;
        }
        if (has(uiSchemaOptions, key)) {
          setProperty(uiSchemaOptions[key], newColumn, 'width');
          setProperty(uiSchemaOptions[key], newColumn, 'editable');
          setProperty(uiSchemaOptions[key], newColumn, 'sorter');
          setProperty(uiSchemaOptions[key], newColumn, 'sortDirections');
          setProperty(uiSchemaOptions[key], newColumn, 'disabled');
          setProperty(uiSchemaOptions[key], newColumn, 'disabledInColumnMenu');
          setProperty(uiSchemaOptions[key], newColumn, 'render');

          uiSchemaOptions[key]['ui:searchFilter'] &&
            forOwn(getColumnFilterProps(key), (value: any, key: string) => {
              newColumn[key] = value;
            });
        }

        return newColumn;
      };
      if (schema && schema.properties) {
        const newData: JsObject = {};
        const visibleColumns: JsObject[] = [];
        if (options.order) {
          options.order.forEach((key: any) => {
            newData[key] = createColumnFromSchema(key);
            !newData[key].disabled && visibleColumns.push(newData[key]);
          });
        } else {
          Object.keys(schema.properties).forEach((key) => {
            newData[key] = createColumnFromSchema(key);
            !newData[key].disabled && visibleColumns.push(newData[key]);
          });
        }
        /*if (uiSchemaOptions['ui:columnMenu']) {
         const newMenu = (
          <Dropdown overlay={<ColumnMenu parsedSchema={newData} onChange={setColumns} />} placement='bottomRight'>
            <Button icon='unordered-list' />
          </Dropdown>
        );     
        newData[visibleColumns[0].key].disabledInColumnMenu = true;
        setTableMenu(newMenu);
      }*/
        setParsedSchema(newData);
        setColumns(visibleColumns);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options, schema, uiSchemaOptions]);

    useEffect(
      () =>
        autorun(() => {
          const newData = [...data];
          setDataSource(createTableData(newData));
        }),
      [data],
    );

    return JsonSchemaT;
  },
  (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps),
);
