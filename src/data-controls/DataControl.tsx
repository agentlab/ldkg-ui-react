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

const renderType: any = {
  tree: TreeRenderer,
  table: TableRenderer,
};

export const AntdDataLayout: React.FC<any> = (props) => {
  const {
    viewElement,
    enabled,
    handleChange = () => {},
    dataSource,
    view,
    uischema,
    schema,
    editing,
    getData,
    onDnD,
    onCreateFolder,
    onDeleteFolder,
    onRename,
  } = props;
  const data = treeify(dataSource, '@id', viewElement?.options.treeNodeParentKey || 'parent', 'children', strcmp);

  const onSelect = (selected: { [key: string]: any }) => {
    handleChange(selected);
  };
  const Render = renderType[viewElement?.options.renderType];

  return (
    <Render
      uri={props.uri}
      enabled={enabled}
      onSelect={onSelect}
      child={data}
      editing={editing}
      onDnD={onDnD}
      viewElement={viewElement}
      view={view}
      uischema={uischema}
      onCreateFolder={onCreateFolder}
      onDeleteFolder={onDeleteFolder}
      onRename={onRename}
      schema={schema}
      getData={getData}
      dataSource={dataSource}
    />
  );
};

export const antdDataControlTester: RankedTester = rankWith(2, uiTypeIs('DataControl'));
export const AntdDataControlWithStore = withStoreToDataControlProps(AntdDataLayout);
