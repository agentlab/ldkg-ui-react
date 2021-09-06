/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import isEqual from 'lodash-es/isEqual';
import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Spin } from 'antd';
import { SettingOutlined, MoreOutlined } from '@ant-design/icons';
import { SortableContainer, SortableHandle } from 'react-sortable-hoc';
import BaseTable, { Column, AutoResizer } from 'react-base-table';
import { Editor } from '@tinymce/tinymce-react';

import { rowProps, SelectionCell } from './TableCellsAndRows';
import { SelectionHeaderCell } from './TableHeader';
import { BaseTableMenu } from './BaseTableMenu';
import { ExtendedTableMenu, MenuItem } from './TableSettingMenu';

import './BaseTable.scss';
import './table.css';

const DraggableContainer = SortableContainer(({ children }: any) => children);
const DraggableHandle = SortableHandle(({ children }: any) => children);

interface EditableTableProps<T> {
  resizeableHeader: boolean;
  tableMenu?: any;
  isMenu: boolean;
  onChangeMenu: Function;
  parsedSchema: any;
  handleResize?: Function;
  filteredValue?: string[];
  schema: any;
  dataSource: T;
  [key: string]: any;
}

const overlayStyle: any = {
  pointerEvents: 'none',
  background: 'rgba(131, 157, 190, 0.17)',
  position: 'absolute',
  bottom: '30px',
  width: '79px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '5px 15px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
};
const TableColumns = [
  {
    dataIndex: 'title',
    title: 'Имя',
  },
];

const getSortProp = (sortBy: string) => {
  if (sortBy.startsWith('DESC(')) {
    return { sortColumn: sortBy.substr(5, sortBy.length - 6), sortOrder: 'DESC' };
  } else {
    if (sortBy.startsWith('ASC(')) {
      return { sortColumn: sortBy.substr(4, sortBy.length - 5), sortOrder: 'ASC' };
    }
    return { sortColumn: sortBy, sortOrder: 'ASC' };
  }
};

const createSortColumnsObject = (sortBy: string | string[]) => {
  let sortColumns: any = {};
  if (Array.isArray(sortBy)) {
    sortColumns = sortBy.reduce((res: any, e: any) => {
      if (typeof e === 'string') {
        const newColumnSort = getSortProp(e);
        res[newColumnSort.sortColumn] = newColumnSort.sortOrder;
      }
      return res;
    }, {});
  }
  if (typeof sortBy === 'string') {
    const newColumnSort = getSortProp(sortBy);
    sortColumns[newColumnSort.sortColumn] = newColumnSort.sortOrder;
  }
  return sortColumns;
};
export const EditableTable: React.FC<EditableTableProps<any>> = React.memo(
  ({
    columns = [],
    onChangeCell,
    parsedSchema,
    onChangeMenu,
    dataSource,
    limit,
    loadMoreData,
    setColumnVisible,
    loadExpandedData,
    isMenu,
    sortDir,
    schema,
    onDeleteRows,
    target,
    filteredValue,
    handleResize = () => {},
    resizeableHeader = false,
    rowKey = '@id',
    options = {},
    addDataToTarget,
    onSelect,
    ...props
  }) => {
    const [data, setData] = useState<any[]>([]);
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [popupCoords, setPopupCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [popupRecord, setPopupRecord] = useState<any>({});
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const sortColumns = createSortColumnsObject(sortDir);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);
    const [selection, setSelection] = useState<any[]>([]);
    const i18n = { language: 'ru_RU' };
    const systemCol = {
      key: 'settings',
      dataKey: 'Settings',
      width: 20,
      frozen: Column.FrozenDirection.LEFT,
      cellRenderer: ({ cellData }: any) => (
        <DraggableHandle>
          <MoreOutlined className={'handler'} />
        </DraggableHandle>
      ),
      headerRenderer: ({ columns, column, columnIndex, headerIndex, container }: any) => <Test />,
    };

    const handleSelectChange = ({ selected, rowData, rowIndex }: any) => {
      const newSelectedRowKeys = [...selectedRowKeys];
      const key = rowData[rowKey];

      if (selected) {
        if (!newSelectedRowKeys.includes(key)) newSelectedRowKeys.push(key);
      } else {
        const index = newSelectedRowKeys.indexOf(key);
        if (index > -1) {
          newSelectedRowKeys.splice(index, 1);
        }
      }
      setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleSelectHeaderChange = ({ selected }: any) => {
      let newSelectedRowKeys;
      if (selected) {
        newSelectedRowKeys = dataSource.map((e: any) => e[rowKey]);
      } else {
        newSelectedRowKeys = [];
      }
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const selectionColumn = {
      key: '__selection__',
      dataKey: '__selection__',
      rowKey,
      width: 30,
      flexShrink: 0,
      resizable: false,
      frozen: Column.FrozenDirection.LEFT,
      cellRenderer: SelectionCell,
      headerRenderer: SelectionHeaderCell,
      dataSize: dataSource.length,
      selectedRowKeys: selectedRowKeys,
      onChange: handleSelectChange,
      onHeaderChange: handleSelectHeaderChange,
    };

    const initTinyMCE = (
      <div style={{ display: 'none' }}>
        <Editor
          initialValue={''}
          inline
          init={{
            branding: false,
            menubar: false,
            toolbar: false,
            plugins: ['autolink codesample link lists media paste table image quickbars textpattern'],
            quickbars_insert_toolbar: 'paste quicktable image',
            quickbars_selection_toolbar: 'bold italic | h2 h3 | blockquote quicklink',
            contextmenu: 'inserttable | cell row column deletetable | link image imagetools | codesample',

            language_url: `${process.env.PUBLIC_URL}/lang/ru.js`,
            language: i18n.language,
            skin: 'oxide',
            skin_url: `${process.env.PUBLIC_URL}/skins/ui/oxide`,
            content_css: `${process.env.PUBLIC_URL}/skins/ui/oxide/content.min.css`,
            theme: 'silver',
            theme_url: `${process.env.PUBLIC_URL}/themes/silver/theme.min.js`,
          }}
        />
      </div>
    );
    const rowRenderer = ({ rowData, cells, ...rest }: any) => {
      if (rowData === 'test')
        return (
          <div style={{ margin: '0 auto', height: '50px' }}>
            <Spin style={{ marginTop: '15px' }} />
          </div>
        );
      return cells;
    };

    const rowEventHandlers = {
      onContextMenu: ({ rowData, event }: any) => {
        event.preventDefault();
        if (!popupVisible) {
          document.addEventListener(`click`, function onClickOutside() {
            setPopupVisible(false);
            document.removeEventListener(`click`, onClickOutside);
          });
        }
        setPopupVisible(true);
        setPopupRecord(rowData);
        setPopupCoords({ x: event.clientX, y: event.clientY });
      },
      onClick: ({ rowData, event }: any) => {
        const idx = selection.indexOf(rowData);
        let newSelection = [...selection];
        if (idx != -1) {
          newSelection = newSelection.splice(idx, 1);
        } else {
          newSelection.push(rowData);
        }
        setSelection(newSelection);
        onSelect(rowData);
      },
    };

    const menuItems = columns.map((col: any, idx: number) => {
      return (
        <Menu.Item key={idx}>
          <MenuItem
            title={col.title}
            colState={col.hidden}
            onClick={(state: boolean) => setColumnVisible([{ idx, hidden: state }])}
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
          onChange={setColumnVisible}
        />
      </Menu.Item>,
    );
    const menu = <Menu>{menuItems}</Menu>;
    const Test = () => (
      <Dropdown overlay={menu}>
        <SettingOutlined />
      </Dropdown>
    );
    const tableCol = [...columns];
    tableCol.push(systemCol);
    tableCol.push(selectionColumn);

    const table = React.createRef<any>();
    const getContainer = () => {
      return table.current.getDOMNode().querySelector('.BaseTable__table-frozen-left .BaseTable__body');
    };

    const getHelperContainer = () => {
      return table.current.getDOMNode().querySelector('.BaseTable__table-frozen-left');
    };
    const checkChildren = (array: any) => {
      return array.map((e: any) => {
        const d = { ...e };
        if (d.hasChild === true) {
          d.children = ['onLoad'];
        }
        return d;
      });
    };
    const setExpanded = (expanded: boolean, id: string) => {
      const newExpandedRowKeys = [...expandedRowKeys];
      if (expanded) {
        newExpandedRowKeys.push(id);
      } else {
        const idx = newExpandedRowKeys.findIndex((e: string) => e === id);
        newExpandedRowKeys.splice(idx, 1);
      }
      setExpandedRowKeys(newExpandedRowKeys);
    };
    const loadMore = () => {
      if (!limit) {
        setLoadedAll(true);
      } else {
        setLoadingMore(true);
        loadMoreData(data.length).then((d: any) => {
          if (d.length < limit) {
            setLoadedAll(true);
          }
          const newData = [...data, ...d];
          setData(newData);
          setLoadingMore(false);
        });
      }
    };
    const renderOverlay = () => {
      if (loadingMore)
        return (
          <div style={overlayStyle}>
            <Spin style={{ margin: '3px auto' }} />
          </div>
        );
      return null;
    };
    const handleEndReached = (props: any) => {
      if (loadingMore || loadedAll || data.length === 0) return;
      loadMore();
    };
    const handleSortEnd = ({ oldIndex, newIndex }: any) => {
      const newData = [...data];
      const [removed] = newData.splice(oldIndex, 1);
      newData.splice(newIndex, 0, removed);
      setData(newData);
    };
    useEffect(() => {
      const newData = checkChildren(dataSource);
      if (newData.length < limit) {
        setLoadedAll(true);
      } else {
        setLoadedAll(false);
      }
      setData(newData);
    }, [dataSource, limit]);
    return (
      <React.Fragment>
        {initTinyMCE}
        <AutoResizer>
          {({ width, height }: any) => (
            <DraggableContainer
              useDragHandle
              getContainer={getContainer}
              helperContainer={getHelperContainer}
              onSortEnd={handleSortEnd}>
              <BaseTable
                fixed
                useIsScrolling
                rowRenderer={rowRenderer}
                width={width}
                height={height}
                sortColumns={sortColumns}
                ref={table}
                expandColumnKey={options.expandColumnKey || '@id'}
                estimatedRowHeight={50}
                rowKey={'@id'}
                onEndReachedThreshold={20}
                onEndReached={handleEndReached}
                overlayRenderer={renderOverlay}
                columns={tableCol}
                data={data}
                rowEventHandlers={rowEventHandlers}
                rowProps={rowProps}
                expandedRowKeys={expandedRowKeys}
                onRowExpand={async ({ expanded, rowData }: any) => {
                  if (rowData.children[0] === 'onLoad' && expanded) {
                    loadExpandedData(rowData.subject).then((data: any) => {
                      rowData.children = checkChildren(data);
                      setExpanded(expanded, rowData['@id']);
                    });
                  } else {
                    setExpanded(expanded, rowData['@id']);
                  }
                }}
              />
            </DraggableContainer>
          )}
        </AutoResizer>
        <BaseTableMenu
          x={popupCoords.x}
          y={popupCoords.y}
          record={popupRecord}
          selection={selection}
          visible={popupVisible}
          onCreateArtifactBefore={() => {}}
          target={target}
          addDataToTarget={addDataToTarget}
          onCreateArtifactAfter={() => {}}
          onDeleteArtifacts={() => {
            onDeleteRows(selection);
          }}
          onLinkArtifacts={() => {}}
        />
      </React.Fragment>
    );
  },
  (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps),
);
