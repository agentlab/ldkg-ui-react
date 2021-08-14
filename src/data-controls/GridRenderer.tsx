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
import { List } from 'antd';
import { IViewKindElement } from '../models/uischema';

import { DispatchCell } from '../DispatchCell';

import './styles.css';

export const GridRenderer: React.FC<any> = (props) => {
  const { child, viewKindElement, viewKind, schema } = props;
  const grid = viewKindElement?.options?.grid || { gutter: 16, column: 4 };
  const template = viewKindElement?.options?.elementTemplate || null;
  const createCell = (data: any, id: string | number) =>
    template ? (
      template.map((e: IViewKindElement, idx: number) => (
        <DispatchCell
          id={String(id) + String(idx)}
          key={String(id) + String(idx)}
          viewKindElement={e}
          viewKind={viewKind}
          schema={schema}
          data={data}
          rowData={data}
        />
      ))
    ) : (
      <span key={id}>{data['@id']}</span>
    );
  return (
    <List grid={grid} dataSource={child} renderItem={(item, idx) => <List.Item>{createCell(item, idx)}</List.Item>} />
  );
};
