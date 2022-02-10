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
import React, { useMemo, useState } from 'react';
import { Tree, Input } from 'antd';
import { SaveReqDialoglWithStore } from '../../util/OnSaveDialog';
import { NodeRenderer } from './components/TreeNode';
import { ContextMenu } from '../../components';
import { usePopupState } from '../../hooks/usePopupState';
import { useSearch, useTree } from './hooks';
import { Key } from 'rc-tree/lib/interface';
import { onDrop, onSortChildren } from './utils';
import { TreeItem } from './types';

import './styles.css';

const divStyle: React.CSSProperties = {
  height: '100%',
  padding: '5px',
  overflow: 'auto',
};

type Props<T> = {
  child: T[];
  [key: string]: any;
};

export function TreeRenderer<T extends TreeItem<T>>(props: Props<T>) {
  const { child, onSelect, viewKindElement, editing, onDnD, onCreateFolder, onDeleteFolder, onRename, actionsMap } =
    props;

  const contextMenu = usePopupState(false);
  const saveReqDialog = usePopupState(false);
  const titlePropName = useMemo(() => viewKindElement?.options?.treeNodeTitleKey || 'title', [viewKindElement]);

  const {
    treeData,
    setTreeData,
    selection,
    expandedKeys,
    setExpandedKeys,
    baseExpandedKeys,
    autoExpandParent,
    onExpand,
    onContextMenu,
    onChange,
    onCreateDirectory,
    onDeleteDirectory,
  } = useTree<T>({
    dataSource: child,
    contextMenu,
    saveReqDialog,
    editing,
    titlePropName,
    viewKindElement,
    onCreateFolder,
    onDeleteFolder,
    onSelect,
  });

  const { searchValue, onSearch, formattedData, setSearchValue } = useSearch({
    dataSource: treeData,
    titlePropName,
    baseExpandedKeys,
    setExpandedKeys,
  });

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
        selectedKeys={[selection?.key || '']}
        draggable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        titleRender={(props) => (
          <NodeRenderer
            onRename={onRename}
            onSort={(key: Key, order: string) =>
              onSortChildren(key, order, child, treeData, titlePropName, setTreeData, sortBy)
            }
            onContextMenu={onContextMenu}
            {...props}
          />
        )}
        height={600}
        onDrop={(info) => onDrop(info, treeData, setTreeData, onDnD)}
        onSelect={onChange}
        treeData={formattedData}
      />
      <SaveReqDialoglWithStore
        visible={saveReqDialog.isPopupVisible}
        onOk={saveReqDialog.close}
        schemaUri={viewKindElement.resultsScope}
        onCancel={saveReqDialog.close}
      />
      <ContextMenu
        x={contextMenu.popupCoords.x}
        y={contextMenu.popupCoords.y}
        selection={
          selection
            ? [
                {
                  ...selection,
                  parentKey: viewKindElement?.options.treeNodeParentKey || 'parent',
                  titlePropName,
                },
              ]
            : []
        }
        visible={contextMenu.isPopupVisible}
        actionsMap={actionsMap}
        onClick={() => null}
      />
    </div>
  );
}
