/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';

import { rankWith, RankedTester, uiTypeIs } from '../testers';
import { withStoreToDataControlProps, treeify, strcmp } from '../util/ContextToProps';
import { TableRenderer } from './TableRenderer';
import { TreeRenderer } from './TreeRenderer';
import { GridRenderer } from './GridRenderer';

const renderType: any = {
  tree: TreeRenderer,
  table: TableRenderer,
  grid: GridRenderer,
};

export const AntdDataLayout: React.FC<any> = React.memo(
  (props) => {
    const {
      viewKind,
      viewKindElement,
      viewDescr,
      viewDescrElement,
      enabled,
      handleChange = () => {},
      dataSource,
      schema,
      editing,
      getData,
      onDnD,
      onCreateFolder,
      onDeleteFolder,
      onRename,
    } = props;
    const data = treeify(dataSource, '@id', viewKindElement?.options.treeNodeParentKey || 'parent', 'children', strcmp);
    const onSelect = (selected: { [key: string]: any }) => {
      handleChange(selected);
    };
    const Render = renderType[viewKindElement?.options.renderType];

    return (
      <Render
        uri={props.uri}
        enabled={enabled}
        onSelect={onSelect}
        child={data}
        editing={editing}
        onDnD={onDnD}
        viewKind={viewKind}
        viewKindElement={viewKindElement}
        viewDescr={viewDescr}
        viewDescrElement={viewDescrElement}
        onCreateFolder={onCreateFolder}
        onDeleteFolder={onDeleteFolder}
        onRename={onRename}
        schema={schema}
        getData={getData}
        dataSource={dataSource}
      />
    );
  },
  (prev, next) => {
    console.log('PREV', prev, 'NEXT', next, prev === next);
    return true;
  },
);

export const antdDataControlTester: RankedTester = rankWith(2, uiTypeIs('aldkg:DataControl'));
export const AntdDataControlWithStore = withStoreToDataControlProps(AntdDataLayout);
