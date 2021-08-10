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

export const AntdHorizontalLayoutRenderer: React.FC<LayoutComponent> = ({ viewElement, view, enabled, visible }) => {
  //const layout = viewElement as Layout;
  const Render: React.FC<FormsDispatchProps & Idx> = ({ idx, viewElement, view, enabled, form }) => {
    const options = viewElement.options || {};
    const style: any = options.style;
    const span = options.contentSize || !viewElement.elements ? undefined : Math.ceil(24 / viewElement.elements.length);
    return (
      <Col key={idx} style={style} span={span}>
        <FormsDispatch viewElement={viewElement} view={view} enabled={enabled} form={form} />
      </Col>
    );
  };
  const justify: any = viewElement.options ? viewElement.options.justify : 'center';
  const rowStyle: any = { flexWrap: 'nowrap' };
  if (viewElement.options && viewElement.options.width === 'all-empty-space') rowStyle.width = '100%';
  return (
    <Row justify={justify} style={rowStyle} align={'middle'}>
      {renderLayoutElements({ viewElement, view, enabled, Render })}
    </Row>
  );
};

export const antdHorizontalLayoutTester: RankedTester = rankWith(2, uiTypeIs('HorizontalLayout'));
export const AntdHorizontalLayoutWithStore = withLayoutProps(AntdHorizontalLayoutRenderer);
