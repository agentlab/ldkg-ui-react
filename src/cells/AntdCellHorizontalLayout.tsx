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
import { IViewKindElement } from '../models/uischema';
import { rankWith, uiTypeIs, RankedTester } from '../testers';
import { get } from 'lodash-es';

import { Idx } from '../util/layout';

export const AntdCellHorizontalLayoutRenderer: React.FC<DispatchCellProps> = ({
  viewKindElement,
  viewKind,
  data,
  schema,
}) => {
  //const layout = viewKindElement as Layout;
  const Render: React.FC<DispatchCellProps & Idx> = ({
    idx,
    schema,
    viewKindElement,
    viewKind,
    data,
    enabled,
    form,
  }) => {
    const options = viewKindElement.options || {};
    //const style: any = options.style;
    const span =
      options.contentSize || !viewKindElement.elements ? undefined : Math.ceil(24 / viewKindElement.elements.length);
    const newSchema = viewKindElement.scope
      ? get(schema, 'properties.' + viewKindElement.scope.replace(/\//, '.properties.'))
      : schema;
    return (
      <Col key={idx} span={span}>
        <DispatchCell
          id={String(idx)}
          data={data}
          viewKindElement={viewKindElement}
          viewKind={viewKind}
          rowData={data}
          schema={newSchema || schema}
          enabled={enabled}
          form={form}
        />
      </Col>
    );
  };
  const justify: any = viewKindElement.options ? viewKindElement.options.justify : 'center';
  const rowStyle: any = { flexWrap: 'nowrap' };
  if (viewKindElement.options && viewKindElement.options.width === 'all-empty-space') rowStyle.width = '100%';
  return (
    <Row justify={justify} style={rowStyle} align={'middle'}>
      {(viewKindElement.elements || []).map((e: IViewKindElement, idx: number) => (
        <Render viewKindElement={e} schema={schema} idx={idx} data={data} id={String(idx)} viewKind={viewKind} />
      ))}
    </Row>
  );
};

export const antdCellHorizontalLayoutTester: RankedTester = rankWith(2, uiTypeIs('aldkg:CellHorizontalLayout'));
