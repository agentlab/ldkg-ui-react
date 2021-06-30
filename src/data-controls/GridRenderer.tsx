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
import { Row, Col, Pagination } from 'antd';
import { ViewElement } from '../models/uischema';

import { DispatchCell } from '../DispatchCell';

import './styles.css';

const divStyle: React.CSSProperties = {
  padding: '5px',
};

export const GridRenderer: React.FC<any> = (props) => {
  const { child, onSelect, viewElement, uischema, view, schema } = props;
  const template = viewElement?.options?.elementTemplate || null;
  const createCell = (data: any, id: string | number) =>
    template ? (
      template.map((e: ViewElement, idx: number) => (
        <DispatchCell
          id={String(id) + String(idx)}
          key={String(id) + String(idx)}
          view={view}
          data={data}
          schema={schema}
          viewElement={e}
          uischema={uischema}
        />
      ))
    ) : (
      <span key={id}>{data['@id']}</span>
    );
  const createCol = (data: any, idx: number) => (
    <Col span={6} style={{ height: '100%' }} key={idx}>
      {createCell(data, idx)}
    </Col>
  );
  const createGrid = () =>
    child.reduce((acc: any, e: any, idx: number) => {
      if ((idx !== 0 && (idx + 4) % 4 === 0) || idx === child.length - 1) {
        const newColl = createCol(e, idx);
        const colls = acc.splice(idx % 4 === 0 ? -3 : 1 - (idx % 4));
        colls.push(newColl);
        acc.push(
          <Row style={{ height: '100px' }} key={idx / 4} gutter={[10, 10]}>
            {colls}
          </Row>,
        );
      } else {
        acc.push(createCol(e, idx));
      }
      return acc;
    }, []);
  return (
    <React.Fragment>
      {createGrid()}
      <Pagination />
    </React.Fragment>
  );
};
