/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { sortBy } from 'lodash-es';
import React, { useState, useEffect } from 'react';
import { Tree, Input } from 'antd';

import { SaveReqDialoglWithStore } from '../util/OnSaveDialog';
import { NodeRenderer } from './NodeRenderer';
import { TreeContextMenu } from './TreeContextMenu';
import { ContextMenu } from '../components';

import './styles.css';

const divStyle: React.CSSProperties = {
  height: '100%',
  padding: '5px',
  overflow: 'auto',
};

export const TreeRenderer: React.FC<any> = (props) => {
  const {
    enabled,
    child,
    onSelect,
    viewKindElement,
    dataSource,
    viewKind,
    editing,
    onDnD,
    onCreateFolder,
    onDeleteFolder,
    onRename,
    actionsMap,
  } = props;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>(child[0]);
  const [treeData, setTreeData] = useState<any[]>(child);
  const [selectedKey, setSelectedKey] = useState(child.length !== 0 ? [child[0].key] : undefined);
  const [popupCoords, setPopupCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupRecord, setPopupRecord] = useState<any>();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [beforeSearchExpand, setBeforeSearchExpand] = useState([]);

  useEffect(() => {
    setTreeData(child);
  }, [child]);

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  /*const generateList = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      dataList.push({ key, title: node.title });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(child);*/
  const getParentKey = (key: string, tree: any): string => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item: any) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const onChange = (keys: any, ev: any) => {
    if (!editing) {
      const newData = ev.node;
      setSelected(newData);
      setSearchValue('');
      setBeforeSearchExpand(expandedKeys);
      setSelectedKey(keys);
    } else {
      setVisible(true);
    }
  };
  const onContextMenu = ({ event, node }: any) => {
    event.preventDefault();
    //event.target.trigger('dblclick');
    if (!popupVisible) {
      document.addEventListener(`click`, function onClickOutside() {
        setPopupVisible(false);
        document.removeEventListener(`click`, onClickOutside);
      });
    }
    setPopupVisible(true);
    setPopupRecord(node);
    setPopupCoords({ x: event.clientX, y: event.clientY });
  };

  const loop = (data: any, key: any, callback: any, node?: any) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return callback(data[i], i, data, node);
      }
      if (data[i].children) {
        loop(data[i].children, key, callback, data[i]);
      }
    }
  };

  const onExpand = (expandedKeys: any) => {
    setExpandedKeys(expandedKeys);
    setBeforeSearchExpand(expandedKeys);
    setAutoExpandParent(false);
  };

  const titlePropName = viewKindElement?.options?.treeNodeTitleKey || 'title';

  const searchEdit = (data: any) =>
    data.map((item: any) => {
      const title = item[titlePropName];
      const index = title.indexOf(searchValue);
      const beforeStr = title.substr(0, index);
      const afterStr = title.substr(index + (searchValue as any).length);
      const foundTitle =
        index > -1 && searchValue !== '' ? (
          <span>
            {beforeStr}
            <span className='site-tree-search-value'>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          title
        );
      if (item.children) {
        return { ...item, ...{ editedTitle: foundTitle, children: searchEdit(item.children) } };
      }

      return {
        ...item,
        ...{ editedTitle: foundTitle },
      };
    });

  const onSearch = (e: any) => {
    setSearchValue(e.target.value);
    const { value } = e.target;
    if (value !== '') {
      const expandedKeys = dataSource
        .map((item: any) => {
          if (item[titlePropName].indexOf(value) > -1) {
            return getParentKey(item.key, treeData);
          }
          return null;
        })
        .filter((item: any, i: number, self: any) => item && self.indexOf(item) === i);
      setExpandedKeys(expandedKeys);
    } else {
      setExpandedKeys(beforeSearchExpand);
    }
  };

  const onDrop = (info: any) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const data = [...treeData];
    let parent = info.node['@id'];

    let dragObj: any;
    loop(data, dragKey, (item: any, index: any, arr: any) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item: any) => {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    } else if ((info.node.props.children || []).length > 0 && info.node.props.expanded && dropPosition === 1) {
      loop(data, dropKey, (item: any) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: any;
      let i: any;
      loop(data, dropKey, (item: any, index: any, arr: any, node: any) => {
        ar = arr;
        i = index;
        parent = node['@id'];
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    onDnD({ childId: info.dragNode['@id'], parentId: parent });
    setTreeData(data);
  };

  const onSortChildren = (key: string, order: string) => {
    const data = [...treeData];
    loop(data, key, (item: any) => {
      item.children.reverse();
      if (order === 'noSort') {
        loop(child, key, (i: any) => {
          item.children = i.children;
        });
      } else if (order === 'ASC') {
        item.children = sortBy(item.children, [
          function (o) {
            return o[titlePropName];
          },
        ]);
      } else {
        item.children = sortBy(item.children, [
          function (o) {
            return o[titlePropName];
          },
        ]).reverse();
      }
    });
    setTreeData(data);
  };

  const onCreateDirectory = (parentId: string) => {
    onCreateFolder({ [titlePropName]: 'new', [viewKindElement?.options.treeNodeParentKey || 'parent']: parentId });
  };
  const onDeleteDirectory = (id: string) => {
    onDeleteFolder(id).then((e: any) => {
      const data = [...treeData];
      loop(data, id, (item: any, index: any, arr: any) => {
        arr.splice(index, 1);
      });
      setTreeData(data);
    });
  };
  return (
    <div style={divStyle}>
      <Input.Search
        size='small'
        placeholder='Search'
        style={{ marginBottom: 8 }}
        value={searchValue}
        onChange={onSearch}
      />
      <Tree
        selectedKeys={selectedKey}
        draggable={{ icon: false }}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        titleRender={(props) => (
          <NodeRenderer onRename={onRename} onSort={onSortChildren} onContextMenu={onContextMenu} {...props} />
        )}
        height={600}
        onDrop={onDrop}
        onSelect={onChange}
        treeData={searchEdit(treeData)}
      />
      <SaveReqDialoglWithStore
        visible={visible}
        onOk={() => setVisible(false)}
        schemaUri={viewKindElement.resultsScope}
        onCancel={() => setVisible(false)}
      />
      <ContextMenu
        x={popupCoords.x}
        y={popupCoords.y}
        record={popupRecord as any}
        selection={
          popupRecord?.otherProps
            ? [
                {
                  ...popupRecord.otherProps,
                  parentKey: viewKindElement?.options.treeNodeParentKey || 'parent',
                  titlePropName,
                },
              ]
            : []
        }
        visible={popupVisible}
        actionsMap={actionsMap}
        onClick={() => null}
      />
    </div>
  );
};
