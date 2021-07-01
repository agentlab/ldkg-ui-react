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
import { Row, Col } from 'antd';

import { DispatchCell } from '../DispatchCell';
import { DispatchCellProps } from '../Form';
import { ViewElement } from '../models/uischema';
import { rankWith, uiTypeIs, RankedTester } from '../testers';
import { get } from 'lodash-es';

import { Idx } from '../util/layout';

export const AntdHorizontalLayoutRenderer: React.FC<DispatchCellProps> = ({
  uischema,
  viewElement,
  view,
  data,
  schema,
}) => {
  //const layout = viewElement as Layout;
  const Render: React.FC<DispatchCellProps & Idx> = ({
    idx,
    schema,
    uischema,
    viewElement,
    view,
    data,
    enabled,
    parent,
    form,
  }) => {
    const options = viewElement.options || {};
    //const style: any = options.style;
    const span = options.contentSize || !viewElement.elements ? undefined : Math.ceil(24 / viewElement.elements.length);
    const newSchema = viewElement.scope
      ? get(schema, 'properties.' + viewElement.scope.replace(/\//, '.properties.'))
      : schema;
    return (
      <Col key={idx} span={span}>
        <DispatchCell
          id={String(idx)}
          data={data}
          viewElement={viewElement}
          view={view}
          rowData={data}
          schema={newSchema || schema}
          uischema={uischema}
          enabled={enabled}
          parent={parent}
          form={form}
        />
      </Col>
    );
  };
  const justify: any = viewElement.options ? viewElement.options.justify : 'center';
  const rowStyle: any = { flexWrap: 'nowrap' };
  if (viewElement.options && viewElement.options.width === 'all-empty-space') rowStyle.width = '100%';
  return (
    <Row justify={justify} style={rowStyle} align={'middle'}>
      {(viewElement.elements || []).map((e: ViewElement, idx: number) => (
        <Render
          viewElement={e}
          schema={schema}
          uischema={uischema}
          idx={idx}
          data={data}
          id={String(idx)}
          view={view}
        />
      ))}
    </Row>
  );
};

export const antdHorizontalLayoutTester: RankedTester = rankWith(2, uiTypeIs('CellHorizontalLayout'));
