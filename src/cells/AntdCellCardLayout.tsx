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
import { Card } from 'antd';
import { get } from 'lodash-es';

import { rankWith, RankedTester, uiTypeIs } from '../testers';

import { TMstViewKindElement } from '../models/MstViewDescr';
import { DispatchCell } from '../DispatchCell';
import './cell.css';

export const AntdCellCardLayout = (props: any): JSX.Element => {
  const { viewKind, viewKindElement, viewDescr, viewDescrElement, schema, data, id } = props;
  const style = viewKindElement?.options?.style || {};
  const createCardChilds = () =>
    viewKindElement.elements
      ? viewKindElement.elements.map((e: TMstViewKindElement, idx: number) => {
          const newSchema = e.scope ? get(schema, 'properties.' + e.scope.replace(/\//, '.properties.')) : schema;
          return (
            <DispatchCell
              id={id + String(idx)}
              key={id + String(idx)}
              viewKind={viewKind}
              viewKindElement={e}
              viewDescr={viewDescr}
              viewDescrElement={viewDescrElement}
              data={data}
              rowData={data}
              schema={newSchema || schema}
            />
          );
        })
      : null;
  return (
    <Card style={style} hoverable>
      {createCardChilds()}
    </Card>
  );
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const antdCellCardLayoutTester: RankedTester = rankWith(2, uiTypeIs('aldkg:CardLayout'));
