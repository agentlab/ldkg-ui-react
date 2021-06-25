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

export const AntdVerticalLayoutRenderer: React.FC<LayoutComponent> = ({
  uischema,
  viewElement,
  view,
  enabled,
  visible,
  parent,
  form,
}) => {
  const Render: React.FC<FormsDispatchProps & Idx> = ({ idx, uischema, viewElement, view, enabled, parent }) => {
    const options = viewElement.options || {};
    const style: any = options.style;
    return (
      <Row
        style={{
          width: '100%',
          flex: viewElement.options && viewElement.options.height === 'all-empty-space' ? '1 1 auto' : '',
        }}>
        <Col style={style} span={24}>
          <FormsDispatch
            viewElement={viewElement}
            view={view}
            uischema={uischema}
            enabled={enabled}
            parent={parent}
            form={form}
          />
        </Col>
      </Row>
    );
  };
  return (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {renderLayoutElements({ uischema, viewElement, view, enabled, Render, parent })}
      </div>
    </React.Fragment>
  );
};

export const antdVerticalLayoutTester: RankedTester = rankWith(2, uiTypeIs('VerticalLayout'));
export const AntdVerticalLayoutWithStore = withLayoutProps(AntdVerticalLayoutRenderer);
