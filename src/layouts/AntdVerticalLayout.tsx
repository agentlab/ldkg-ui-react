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
import { getSnapshot, types } from 'mobx-state-tree';

import { MstViewKindElement } from '../models/MstViewDescr';
import { FormsDispatchProps, FormsDispatch } from '../Form';
import { rankWith, uiTypeIs, RankedTester } from '../testers';
import { withLayoutProps } from '../util/ContextToProps';

import { renderLayoutElements } from '../util/layout';
import { Idx } from '../util/layout';
import { LayoutComponent } from './LayoutComponent';
import { convertSizeOptionToStyle } from './utils';

export const MstVkeVerticalLayout = types.compose(
  'MstVerticalLayout',
  MstViewKindElement,
  types.model({
    '@type': types.literal('aldkg:VerticalLayout'),
  }),
);

export const AntdVerticalLayoutRenderer: React.FC<LayoutComponent> = ({
  viewKind,
  viewKindElement,
  viewDescr,
  viewDescrElement,
  enabled,
  visible,
  form,
  readOnly,
}) => {
  const style = viewKindElement.options?.style;
  const Render: React.FC<FormsDispatchProps & Idx> = ({ idx, viewKind, viewKindElement, viewDescr, enabled }) => {
    const height = viewKindElement.options?.height;
    const width = viewKindElement.options?.width;
    const grow = viewKindElement.options?.grow;

    const rowStyle = convertSizeOptionToStyle({ height, width });
    return (
      <Row
        style={{
          position: 'relative',
          ...rowStyle,
          flexGrow: grow,
        }}>
        <FormsDispatch
          viewKind={viewKind}
          viewKindElement={viewKindElement}
          viewDescr={viewDescr}
          enabled={enabled}
          form={form}
        />
      </Row>
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {renderLayoutElements({ viewKind, viewKindElement, viewDescr, enabled, Render, readOnly })}
    </div>
  );
};

export const antdVerticalLayoutTester: RankedTester = rankWith(2, uiTypeIs('aldkg:VerticalLayout'));
export const AntdVerticalLayoutWithStore = withLayoutProps(AntdVerticalLayoutRenderer);
