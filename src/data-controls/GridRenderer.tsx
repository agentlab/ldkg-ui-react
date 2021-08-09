/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useState, useEffect } from 'react';
import { List, Row, Col, Pagination } from 'antd';
import { ViewElement } from '../models/uischema';

import { DispatchCell } from '../DispatchCell';

import './styles.css';

const divStyle: React.CSSProperties = {
  padding: '5px',
};

export const GridRenderer: React.FC<any> = (props) => {
  const { child, onSelect, viewElement, view, schema } = props;
  const grid = viewElement?.options?.grid || { gutter: 16, column: 4 };
  const template = viewElement?.options?.elementTemplate || null;
  const createCell = (data: any, id: string | number) =>
    template ? (
      template.map((e: ViewElement, idx: number) => (
        <DispatchCell
          id={String(id) + String(idx)}
          key={String(id) + String(idx)}
          view={view}
          data={data}
          rowData={data}
          schema={schema}
          viewElement={e}
        />
      ))
    ) : (
      <span key={id}>{data['@id']}</span>
    );
  return (
    <List grid={grid} dataSource={child} renderItem={(item, idx) => <List.Item>{createCell(item, idx)}</List.Item>} />
  );
};
