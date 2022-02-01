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

import { FormsDispatchProps, FormsDispatch } from '../Form';
import { rankWith, uiTypeIs, RankedTester } from '../testers';
import { withLayoutProps } from '../util/ContextToProps';

import { renderLayoutElements } from '../util/layout';
import { Idx } from '../util/layout';
import { LayoutComponent } from './LayoutComponent';

export const AntdHorizontalLayoutRenderer: React.FC<LayoutComponent> = ({
  viewKind,
  viewKindElement,
  viewDescr,
  viewDescrElement,
  enabled,
  visible,
  form,
}) => {
  //const layout = viewKindElement as Layout;
  const parentViewKindElement = viewKindElement;
  const Render: React.FC<FormsDispatchProps & Idx> = ({ idx, viewKind, viewKindElement, viewDescr, enabled }) => {
    const options = viewKindElement.options || {};
    const width = viewKindElement.options?.width;
    const height = viewKindElement.options?.height;

    const style: React.CSSProperties = {};

    if (width === 'all-empty-space') {
      style.flexGrow = 1;
    } else {
      style.width = width;
    }
    if (height === 'all-empty-space') {
      style.alignSelf = 'stretch';
    } else {
      style.height = height;
    }
    return (
      <div key={idx} style={style}>
        <FormsDispatch
          viewKind={viewKind}
          viewKindElement={viewKindElement}
          viewDescr={viewDescr}
          enabled={enabled}
          form={form}
        />
      </div>
    );
  };
  const justify: any = viewKindElement.options?.justify || 'space-between';
  const align: any = viewKindElement.options?.align || 'middle';
  const rowStyle: any = { flexWrap: 'nowrap' };
  if (viewKindElement.options && viewKindElement.options.width === 'all-empty-space') rowStyle.width = '100%';
  return renderLayoutElements({ viewKind, viewKindElement, viewDescr, enabled, Render });
};

export const antdHorizontalLayoutTester: RankedTester = rankWith(2, uiTypeIs('aldkg:HorizontalLayout'));
export const AntdHorizontalLayoutWithStore = withLayoutProps(AntdHorizontalLayoutRenderer);
